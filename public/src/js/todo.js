(function(window){
  'use strict';

  function Todo(){
    if(!(this instanceof Todo))
      return new Todo();
    this.create();
  }

  Todo.prototype.create = function create(){
    this._todo = [];
    this._id = 1;
  };

  Todo.prototype.insert = function insert(obj){
    this._todo.push(Object.assign({}, {id: this._id}, obj));
    this._id++;
  };

  Todo.prototype.read = function read(){
    return this._todo;
  };

  Todo.prototype.update = function update(id, obj){
    this._todo.forEach(function(item){
      if(item.id === id){
        item.task = obj.task;
        item.status = obj.status;
      }
    });
  };

  Todo.prototype.remove = function remove(id){
    var _this = this;
    this._todo.forEach(function(item, index){
      if(item.id === id)
        _this._todo.splice(index, 1);
    });
  };

  Todo.prototype.removeAll = function removeAll(){
    this._todo = [];
  };

  window.Todo = Todo();
})(window);
