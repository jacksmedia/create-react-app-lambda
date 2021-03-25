// example of async handler using async-await
// https://github.com/netlify/netlify-lambda/issues/43#issuecomment-444618311

import axios from "axios"
export async function handler(event, context) {
  try {
    const response = await axios.get("https://api.nomics.com/v1/currencies/ticker?key=643698f1108812b938fe8a2d81983059&status=active&per-page=100&page=1", { headers: { Accept: "application/json" } })
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
