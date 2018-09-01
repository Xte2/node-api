var env = process.env.NODE_ENV || 'development';

console.log('env *****', env);

if (env === 'development'){
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test'){
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
} else if (env === 'production'){
  process.env.MONGODB_URI = 'mongodb://mongo-test:mongo-test1@ds237832.mlab.com:37832/mongo-todo-test';
}
