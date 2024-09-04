const axios = require('axios');

exports.handler = async function(event, context) {
  try {
    const response = await axios.get('https://api.sunnah.com/v1/hadiths/random', {
      headers: {
        'X-API-Key': process.env.SUNNAH_API_KEY
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch hadith' })
    };
  }
}