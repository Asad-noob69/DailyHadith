// functions/fetchHadith.js

const axios = require('axios');

exports.handler = async function(event, context) {
  try {
    // Fetch data from a reliable API
    const response = await axios.get('https://api.sunnah.com/v1/hadiths/random', {
      headers: {
        'X-API-Key': process.env.SUNNAH_API_KEY
      }
    });

    const hadithData = response.data.data;

    // Extract the relevant information
    const result = {
      arabic: hadithData.hadith[0].body,
      english: hadithData.translations[0].text,
      chapter: hadithData.chapter[0].title,
      book: hadithData.book[0].name
    };

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch hadith' })
    };
  }
};