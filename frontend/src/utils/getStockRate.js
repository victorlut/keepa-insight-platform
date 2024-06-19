module.exports = function getStockRate(product, days) {
    let relevantData = product.stats;
    let stock = [];
    if(days == 30) stock = relevantData.outOfStockPercentage30;
    else if(days == 90) stock = relevantData.outOfStockPercentage90;
    else if(days == 180) stock = relevantData.outOfStockPercentage180;

    if(!stock) {
      return 0.00;
    }

    let sum = 0, count = 0;
    for(let i = 0; i < stock.length; i ++) {
      if(stock[i] > 0) {
        sum += stock[i];
        count ++;
      }
    }
    return (sum / count);
}