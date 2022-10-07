const Courses = require('../model/courses');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class LoginController {
    index(req, res, next) {
        Courses.find({}, function(err, courses){
            if(!err) res.json(courses);
            res.status(400).json({error: 'ERROR!!!'})
            
        });
    }
}

module.exports = new LoginController();
