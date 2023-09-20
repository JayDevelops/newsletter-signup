//  Require the modules you'll use here
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

// Create a new app with express, use body-parser with the app, and local port number
const app = express();
const localPort = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

//  Make sure express knows there are public files
app.use(express.static("public"));

//  TODO: Send the signup html to user at the home route
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/signup.html`);
});

//  TODO: Grab the data when the user posts data into the forms
app.post("/", (req, res) => {
  //  Get the text from the fields in the signup html
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  //  Parse the data as a javascript object below, then to a JSON object
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us20.api.mailchimp.com/3.0/lists/073477c504";

  const options = {
    method: "POST",
    auth: "jaydevelops:e2cd65cd405e52cb0e919b779eabdcf2-us20",
  };

  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.listen(localPort, () => {
  console.log(`App is running on http://localhost:${localPort}`);
});

// Mailchimp API key Below
// e2cd65cd405e52cb0e919b779eabdcf2-us20

//  Mailchimp API list id below
//  073477c504
