const mongoose = require('mongoose');

async function main(){
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Mongodb => ok')
}

main().catch(err => console.log(err));

module.exports = mongoose;