const axios = require('axios');

/**
 * Makes a GET request to the specified URL.
 * @param {string} url The URL to make the GET request to.
 * @param {object} headers Optional headers for the request.
 * @returns {Promise<any>} The response data.
 */
async function makeGetRequest(url, headers = {}) {
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error making GET request to ${url}:`, error);
    throw error; // Rethrow to handle it in the calling function
  }
}

/**
 * Fetches a random joke from an external joke API.
 * @returns {Promise<string>} A random joke.
 */
async function fetchRandomJoke() {
  // URL of the joke API (example)
  const url = 'https://icanhazdadjoke.com/';
  const headers = { Accept: 'application/json' };

  const data = await makeGetRequest(url, headers);
  return data.joke;
}

module.exports = {
  makeGetRequest,
  fetchRandomJoke,
};
