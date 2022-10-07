const { default: mongoose } = require("mongoose");
// const slug = require('mongoose-slug-generator')

// mongoose.plugin(slug)

const schema = mongoose.Schema

const Courses = new schema({
    user: {type: String, required: true},
    pass: {type: String, required: true},
    
},{
    timestamps: true,
})

module.exports = mongoose.model('Courses', Courses);