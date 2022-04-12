require('dotenv').config()
const express = require('express');
const cors = require('cors');

const app = express();

// consfig json response
app.use(express.json());

// Solve cors
app.use(cors({ 
    credentials: true, 
    origin: `${process.env.DATABASE_URL}`
    }
));

// Public folder for images
app.use(express.static('src/public'));

app.listen(8081, () => {
    console.log(`Running app`)
})
