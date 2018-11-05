// Library imports
let express = require('express');

// Local imports


// Express config
var app = express();
let port = 3000;


// Start express -> start server
app.listen(port, () => {
    console.log('Started on port', port);
});
