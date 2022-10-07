module.exports = {
    mutipleMongooseToObject: function(mongoose)
    {
        return mongoose.map(course => course.toObject())
    },
    mongooseToObject: function(mongoose){
        return mongoose ? mongoose.toObject() : mongoose 
    }
    // mongooseOnly: function(mongoose,only){
    //     return mongoose.find(course => course.toObject().name == only)
    // }
}