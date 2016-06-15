(function($){
  'use strict';

  var _todo = getStorage('todo') || [];
  var _id = getStorage('id') || 1;
  var updateToDo = new CustomEvent('update');
  var $tbody = $.querySelector('[data-js="tbody"]');

  function init(){
    var $form = $.querySelector('[data-js="form"]');
    $form.addEventListener('submit', handleForm, false);
    $tbody.addEventListener('update', handleContentTable, false);
    $tbody.dispatchEvent(updateToDo);
  }

  function handleForm(e){
    e.preventDefault();
    var $inputTask = $.querySelector('[data-js="input-task"]');
    var todo = {
      id: _id,
      task: $inputTask.value,
      status: false
    };
    _todo.push(todo);
    _id++;
    setStorage('todo', _todo);
    setStorage('id', _id);
    $inputTask.value = '';
    $tbody.dispatchEvent(updateToDo);
  }

  function handleContentTable(){
    $tbody.innerHTML = null;
    _todo.forEach(function(item){
      var frag = $.createDocumentFragment();
      var tr = $.createElement('tr');
      tr.appendChild(createCell(item.id));
      tr.appendChild(createCell(item.task));
      tr.appendChild(createCheckbox(item));
      tr.appendChild(createButtonRemove(item));
      frag.appendChild(tr);
      $tbody.appendChild(frag);
    });
    tableEvents();
  }

  function createCell(text){
    var td = $.createElement('td');
    td.classList.add('text-xs-center');
    td.textContent = text;
    return td;
  }

  function createCheckbox(item){
    var td = $.createElement('td');
    var label = $.createElement('label');
    var input = $.createElement('input');
    td.classList.add('text-xs-center');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('data-js', 'input-checkbox');
    input.setAttribute('value', item.id);
    if(item.status)
      input.setAttribute('checked', 'checked');
    label.appendChild(input);
    td.appendChild(label);
    return td;
  }

  function createButtonRemove(item){
    var td = $.createElement('td');
    var button = $.createElement('button');
    var span = $.createElement('span');
    td.classList.add('text-xs-center');
    button.setAttribute('class', 'btn btn-danger btn-sm');
    button.setAttribute('data-js', 'btn-remove');
    button.setAttribute('data-value', item.id);
    span.innerHTML = '&times';
    span.setAttribute('aria-hidden', 'true');
    button.appendChild(span);
    td.appendChild(button);
    return td;
  }

  function tableEvents(){
    Array.prototype.forEach.call(
      $.querySelectorAll('[data-js="input-checkbox"]'),
      function(item){
        item.removeEventListener('click', changeStatus, false);
        item.addEventListener('click', changeStatus, false);
      }
    );

    Array.prototype.forEach.call(
      $.querySelectorAll('[data-js="btn-remove"]'),
      function(item){
        item.removeEventListener('click', removeItem, false);
        item.addEventListener('click', removeItem, false);
      }
    );
  }

  function changeStatus(){
    var _this = this;
    _todo.forEach(function(item, index){
      if(item.id === Number(_this.getAttribute('value')))
        item.status = !item.status;
    });
    setStorage('todo', _todo);
  }

  function removeItem(){
    if(!confirm('do you want delete?'))
      return;
    var _this = this;
    _todo.forEach(function(item, index){
      if(item.id === Number(_this.getAttribute('data-value')))
        _todo.splice(index, 1);
    });
    setStorage('todo', _todo);
    $tbody.dispatchEvent(updateToDo);
  }

  function setStorage(key, value){
    return localStorage.setItem(key, JSON.stringify(value));
  }

  function getStorage(key){
    return JSON.parse(localStorage.getItem(key));
  }

  init();
})(document)
