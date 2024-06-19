module.exports =  function getRankAndBuyBoxTrends(ranks) {
    let prevRank = 0, status = "consistency";
    if(!ranks) return status;
    ranks.map((value, index) => {
        if(value > 0 && index % 2) {
            if(!prevRank) prevRank = value;
            else if(prevRank != value) {
                prevRank = value;
                status = "fluctuation";
            }
        }
    });
    return status;
}