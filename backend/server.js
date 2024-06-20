const express = require('express');
const { z } = require('zod');
const cors = require('cors');

const getRankAndBuyBoxTrends = require('./helper/getRankAndBuyBoxTrends');
const getStock = require('./helper/getStock');
const generateSummary = require('./openai/generateSummary');
const createRedisClient = require('./redis/redis-client');

require('dotenv').config();

const ASINSchema = z.string().regex(/^[A-Z0-9]{10}$/);
const EAN_UPC_Schema = z.string().regex(/^\d{12,13}$/);


const app = express();
app.use(express.json());
app.use(cors());

let client = createRedisClient();

app.get('/', (req, res) => {
    res.json({success: true});
})

app.get('/products/:type/:id', async(req, res) => {
    const type = req.params.type;
    const code = req.params.id;
    console.log(type + ' ' + code);
    try{
       const data = await client.get(code);
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
            if(!code) {
                return res.json({
                    success: false,
                    msg: "Please input the code"
                });
            }
            // Validate the product ID
            
            let validateID, keepa_url = "https://api.keepa.com/product?key=" + process.env.KEEPA_API_KEY + "&domain=" + process.env.DOMAIN;
            if (type.includes('ASIN')) {
                validateID = await ASINSchema.safeParse(code);
                keepa_url += "&asin=" + code + "&stats=180&buybox=1&stock=1";
            } 
            else {
                validateID = await EAN_UPC_Schema.safeParse(code);
                keepa_url += "&code=" + code + "&stats=180&buybox=1&stock=1";
            }
            if(!validateID.success) {
                return res.json({
                    success: false,
                    msg: "Invalid code"
                });
            }

            // Send request to Keepa
            const response = await fetch(keepa_url);
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
            client.set(code, JSON.stringify({
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