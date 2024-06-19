module.exports =  function getStock(stocks) {
    let sum = 0, count = 0;
    if(!stocks) return 0;
    stocks.map((value) => {
        if(value > 0) {
            sum += value;
            count ++;
        }
    });
    return sum / count;
}
