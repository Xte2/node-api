const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

var todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
},
{
  _id: new ObjectID(),
  text: 'Second test todo'
}];


beforeEach((done)=> {
  Todo.remove({}).then(()=>{
    Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {

    var text = "Test todo text";

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) =>{
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err){
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        })
        .catch( (e) => {
          done();
        });

      });
  });

  it('should not create a new todo', (done) => {

    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err){
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch( (e) => done(e));

      });
  });
});

//
describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});


describe('GET /todos:id', () => {
    it('should return a todo doc', (done) => {
      request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
          //USING THE EXPECT liBRARY
          expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it('should return 404 if todo not found', (done) => {
      //make sure tou get a 404 back
      // id does not exist
      var id = "5b87f23d875ed207bc273d75";
      request(app)
        .get(`/todos/${id}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 for non-object ids', (done) => {
      // /todos/123

      var id = "123";
      request(app)
        .get(`/todos/${id}`)
        .expect(404)
        .end(done);
    });

});


describe('DELETE /todos:id', () => {
    it('should delete a todo doc', (done) => {
      request(app)
        .delete(`/todos/${todos[1]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
          //USING THE EXPECT liBRARY
          expect(res.body.todo._id).toBe(todos[1]._id.toHexString());
        })
        .end((err,res) => {
          if (err){
            return done(err);
          }

          Todo.findById({_id: todos[1]._id.toHexString()}).then((todo) => {
            expect(todo).toNotExist();
            done();
          })
          .catch( (e) => {
            done();
          });

          //query databse using findById toNotExist
          //expect (null).toNotExist()
        });
    });

    it('should return 404 if todo not found when deleting', (done) => {
      //make sure tou get a 404 back
      // id does not exist
      var id = new ObjectID().toHexString();
      request(app)
        .delete(`/todos/${id}`)
        .expect(404)
        .end(done);
    });
    //
    it('should return 404 for non-object ids when deleting', (done) => {
      // /todos/123
      var id = "123";
      request(app)
        .delete(`/todos/${id}`)
        .expect(404)
        .end(done);
    });

});


describe('PATCH /todos:id', () => {
    it('shoud update the todo doc', (done) => {

      var text = "Update the todo doc";
      var completed = true;

      request(app)
        .patch(`/todos/${todos[1]._id.toHexString()}`)
        .send({text,completed})
        .expect(200)
        .expect((res) => {
          //USING THE EXPECT liBRARY
          expect(res.body.todo.text).toBe(text);
          expect(res.body.todo.completed).toBe(true);
          expect(typeof res.body.todo.completedAt).toBe('number');
        })
        .end(done);
    });
    //
     it('should clear completedAt when todo is not completed', (done) => {
    //   // /Grab id of second todo item
    //   //update text, set completed to false
    //   //200
    //   //text is changed, completed false, completedAt is null .toNotExist

    var text = "Update the todo doc2";
    var completed = false;

    request(app)
      .patch(`/todos/${todos[1]._id.toHexString()}`)
      .send({text,completed})
      .expect(200)
      .expect((res) => {
        //USING THE EXPECT liBRARY
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toBe(null);
      })
      .end(done);
     });

});
