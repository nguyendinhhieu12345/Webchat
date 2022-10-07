const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/trangchu2');
        console.log('success')
    } catch (error) {}
}

module.exports = { connect };
