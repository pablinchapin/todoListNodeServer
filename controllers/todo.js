const ToDoService = require('../services/todo');

_this = this;


//C
exports.getTodos = async function(req, res, next){
  
  const page = req.query.page  ? req.query.page : 1;
  const limit = req.query.limit ? req.query.limit : 10;

  try{
    const todos = await ToDoService.getTodos({}, page, limit);

    return res.status(200).json({status:200, data:todos, message:"Todos successfully obtained"});
  }catch(e){
      
      return res.status(400).json({status:400, message: e.message});
  }
}


//R
exports.createTodo = async function(req, res, next){

  var todo = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status
  }

  try{

    const createdTodo = await ToDoService.createTodo(todo);
    return res.status(201).json({status: 201, data:createdTodo, message:"ToDo successfully created"})

  }catch(e){

    return res.status(400).json({status:400, message: "Error creating the Todo"});
  }
}


//U
exports.updateTodo = async function(req, res, next){

  if(!req.body._id){
    return res.status(400).json({status:400, message: "Id must be present"});
  }

  const id = req.body._id;

  const todo = {
    id,
    title: req.body.title ? req.body.title : null,
    description: req.body.description ? req.body.description : null,
    status: req.body.status ? req.body.status : null
  }

  try{
    var updatedTodo = await ToDoService.updateTodo(todo);
    return res.status(200).json({status:200, data:updatedTodo, message: "Successfully updated todo"});
  }catch(e){
      return res.status(400).json({status:400, message: e.message});
  }

}


//D
exports.removeTodo = async function(req, res, next){

  var id = req.params.id;

  try{
    var deleted = await ToDoService.deleteTodo(id);

    return res.status(204).json({status:204, message:"ToDo successfully deleted!"});
  }catch(e){
      return res.status(400).json({status:400, message:e.message});
  }

}