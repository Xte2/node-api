var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mogo-test:mogo-test1@ds237832.mlab.com:37832/mongo-todo-test');

module.exports = {
  mongoose: mongoose
};
