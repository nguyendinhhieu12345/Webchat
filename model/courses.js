const { default: mongoose } = require("mongoose");
const slug = require('mongoose-slug-generator')

mongoose.plugin(slug)

const schema = mongoose.Schema

const Courses = new schema({
    name: {type: String, required: true},
    img: {type: String, required: true},
    price: {type: String, required: true},
    slug: {type: String, slug: 'name'},
},{
    timestamps: true,
})

module.exports = mongoose.model('Courses', Courses);