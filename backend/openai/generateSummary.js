module.exports =  async function generateSummary(stockInfo, salesRankInfo, buyBoxInfo) {
    const prompt = `  
    Stock Information: ${stockInfo} Sales Rank Information: ${salesRankInfo} Buy Box Information: ${buyBoxInfo}`;
    try {
      const response = await fetch(
        'https://api.openai.com/v1/completions',
        {
            method: 'POST',
            body: JSON.stringify({
                prompt: prompt,
                model: "gpt-3.5-turbo-instruct",
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