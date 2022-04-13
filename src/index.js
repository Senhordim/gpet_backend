require('dotenv').config()
const express = require('express');
const cors = require('cors');


const app = express();

// consfig json response
app.use(express.json());

// Solve cors
app.use(
    cors({ 
            credentials: true, 
            origin:  process.env.CORS_URL
        })
    );

// Public folder for images
app.use(express.static('src/public'));

const UserRoutes = require('./routes/user/UserRoutes')

app.use('/users', UserRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Running app`)
})
