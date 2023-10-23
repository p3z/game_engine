const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());



app.get('your-route', async (req, res) => {
    
  let data = {};

  res.send(data);
});

// Listen for requests
app.listen(3000, function() {
	console.log('Server is listening on port 3000');
});




////