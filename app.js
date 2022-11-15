//created a dictionary app that takes a word and returns the definitions
const https = require('https'); //import https module

// print the data
function getDefinition(word){
  // using try and catch to handle errors
  try{
    // request data from website
    // https.get(url, callback). Interpolation is used to insert the word into the url
    const request = https.get(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=056538d7-46b8-4c9c-afeb-ff2bd4ee35a1`,
     (response) => {
      //created a variable to store strings (definitions)
      let body = "";
      // Read the data
      response.on("data", (data) => {
        body += data.toString(); // convert data to string using toString() method, then add to body
      });
      response.on("end", () => {
        // Parse the data
        const definition = JSON.parse(body); // parse the data using JSON.parse() method
        // Print the data
        console.log(definition[0].shortdef); // shortdef is the value that contains the definitions
      }
    );
  });
  request.on("error", (error) => {
    console.error(error.message) // throw error if there is one
  });
  } catch(error){
    console.log(error.message); // throws an error mainly if the URL is not correct
  }
}

const query = process.argv.slice(2); // get the word from the command line
query.forEach(getDefinition);   // call the function for each word
