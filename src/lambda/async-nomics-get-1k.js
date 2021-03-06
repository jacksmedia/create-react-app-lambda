// example of async handler using async-await
// https://github.com/netlify/netlify-lambda/issues/43#issuecomment-444618311

import axios from 'axios'

const rootURL = 'https://api.nomics.com/v1/currencies/ticker?key='
const currentAPIkey = process.env.nomicsAPIk3y;
const myDesiredParams = '&status=active&per-page=33&page=1'

export async function handler(event, context) {
  try {
    const response = await axios.get(`${rootURL}${currentAPIkey}${myDesiredParams}, { headers: { Accept: "application/json" } }`)
    const data = response.data
    return {
      statusCode: 200,
      body: JSON.stringify({ data: data })
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ data: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}
