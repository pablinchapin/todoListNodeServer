const ToDo = require('../models/todo');

_this = this;


//C
exports.createTodo = async function(todo){

  const newTodo = new ToDo({
    title: todo.title,
    description: todo.description,
    date: new Date(),
    status: todo.status
  });

  try{
    const savedTodo = await newTodo.save();
    return savedTodo;
  }catch(e){
      throw Error('Error creating the ToDo');
  }

};


//R
exports.getTodos = async function(query, page, limit){

  const options = {
    page, limit
  };

  try{
    const todos = await ToDo.paginate(query, options);
    return todos;
  }catch(e){
      throw Error('Error while paginating todos');
  }

};


//U
exports.updateTodo = async function(todo){

  const id = todo.id;

  try{
    const oldToDo = await ToDo.findById(id);
  }catch(e){
      throw Error('Error occured when finding the ToDo');
  }

  if(!oldTodo){
    return false;
  }

  oldToDo.title = todo.title;
  oldToDo.description = todo.description;
  oldToDo.status = todo.status;

  try{
    const savedTodo = await oldToDo.save();
    return savedTodo;
  }catch(e){
      throw Error('Error occured when updating the ToDo');
  }

};


//D
exports.deleteTodo = async function(id){

  try{
    var deleted = await ToDo.remove({_id:id})

    if(deleted.result.n === 0){
      throw Error('ToDo could not be deleted');
    }

    return deleted;

  }catch(e){
      throw('Error ocurred when deleting the ToDo');
  }
};