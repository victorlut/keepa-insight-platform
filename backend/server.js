const express = require('express');
const { z } = require('zod');
const cors = require('cors');
const { createClient } = require('redis');

const getRankAndBuyBoxTrends = require('./helper/getRankAndBuyBoxTrends');
const getStock = require('./helper/getStock');
const generateSummary = require('./openai/generateSummary');


require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Redis client config
let client;
(async () => {
    client = createClient();
    
    await client.connect();

    client.on("connect", () => console.log("Connected!!!"));
    client.on("error", (error) => console.error(`Error : ${error}`));
})();

app.get('/', (req, res) => {
    res.json({success: true});
})

app.get('/products/:id', async(req, res) => {
    const asin = req.params.id;
    try{
       const data = await client.get(asin);
       if(data) {
            console.log('Data is cached in Redis');
            const p = JSON.parse(data);
            res.json({
                ...p,
                success: true,
                isCache: true
            });
       }
       else {
            console.log('Data is not cached in Redis!');
            if(!asin) {
                return res.json({
                    success: false,
                    msg: "Please input the code"
                });
            }
            // Validate the product ID
            const productSchema = z.object({
                asin: z.string().regex(/^[A-Z0-9]{10}$/), // validate ASIN
            });
            const validateID = await productSchema.safeParse({ asin });
            if(!validateID.success) {
                return res.json({
                    success: false,
                    msg: "Invalid code"
                });
            }

            // Send request to Keepa
            const response = await fetch("https://api.keepa.com/product?key=" + process.env.KEEPA_API_KEY + "&domain=" + process.env.DOMAIN + "&asin=" + asin + "&stats=180&buybox=1&stock=1");
            const product = await response.json();

            const { products } = product;
            if (!products[0].title) {
                return res.json({
                    success: false,
                    msg: "There's no product."
                });
            }
            // Get the sales rank array
            const p = products[0];
            const sales_ref = p.salesRankReference;
            let sales_rank = [];
            for(const [key, value] of Object.entries(p.salesRanks)) {
                if(key == sales_ref)
                    sales_rank = value;
            }
            const stockInfo = `Amazon has been in stock for this product ${getStock(products[0].stats.outOfStockPercentageInInterval).toFixed(2)}% of the time over the past 90 days.`;
            const salesRankInfo = `The sales rank has shown a ${getRankAndBuyBoxTrends(sales_rank)} pattern, maintaining a relatively low and stable position.`;
            const buyBoxInfo = `The buy box price has ${getRankAndBuyBoxTrends(products[0].stats.avg90)} moderately over the last 90 days, with noticeable variations between the FBA, FBM, and Amazon prices.`;

            const summary = await generateSummary(stockInfo, salesRankInfo, buyBoxInfo);
            client.set(asin, JSON.stringify({
                product: products[0],
                sales_rank,
                summary
            }), { EX: process.env.EXPIRATION_TIME });
            
            res.json({
                success: true,
                product: products[0],
                sales_rank,
                summary
            });
        }
    } catch(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(process.env.PORT, async () => {
    console.log(`Server is running in port ${process.env.PORT}`);
})