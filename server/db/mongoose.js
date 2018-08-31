var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://mongo-test:mongo-test1@ds237832.mlab.com:37832/mongo-todo-test');
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {
  mongoose: mongoose
};
