module.exports = function getAVGBuyBoxPrice(product, days) {
    let relevantData = product.stats;
    let price = [];
    if(days == 30) price = relevantData.avg30;
    else if(days == 90) price = relevantData.avg90;
    else if(days == 180) price = relevantData.avg180;

    if(!price) {
      return 0.00;
    }

    let sum = 0, count = 0;
    for(let i = 0; i < price.length; i ++) {
      if(price[i] > 1) {
        sum += price[i];
        count ++;
      }
    }
    return (sum / count);
}