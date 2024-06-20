module.exports =  async function generateSummary(stockInfo, salesRankInfo, buyBoxInfo) {
    const prompt = `  Using the information provided, generate a summary.\\n\\n  
    Stock Information: ${stockInfo} Sales Rank Information: ${salesRankInfo} Buy Box Information: ${buyBoxInfo}`;
    try {
      const response = await fetch(
        'https://api.openai.com/v1/completions',
        {
            method: 'POST',
            body: JSON.stringify({
                prompt: prompt,
                model: "davinci-002",
                max_tokens: 150,
                n: 1,
                stop: null,
                temperature: 0.7,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ process.env.AI_KEY }`,
            }            
        }
      );
  
        const result = await response.json();
        if(!result) return '';
        const summary = result.choices[0].text;
        return summary;
    } catch (error) {
      console.error('Error generating summary:', error);
      return null;
    }
}