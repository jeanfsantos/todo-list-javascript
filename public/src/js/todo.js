(function($){
  'use strict';

  var _todo = [];
  var _id = 1;
  var updateToDo = new CustomEvent('update');

  function init(){
    var $form = $.querySelector('[data-js="form"]');
    $form.addEventListener('submit', handleForm, false);
    $.addEventListener('update', handleContentTable, false);
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
    $inputTask.value = '';
    $.dispatchEvent(updateToDo);
  }

  function handleContentTable(){
    var $tbody = $.querySelector('[data-js="tbody"]');
    $tbody.innerHTML = null;
    _todo.forEach(function(item){
      var frag = $.createDocumentFragment();
      var tr = $.createElement('tr');

      var tdId = createCell(item.id);
      tr.appendChild(tdId);

      var tdTask = createCell(item.task);
      tr.appendChild(tdTask);

      var tdInputCheckbox = createCheckbox(item);
      tr.appendChild(tdInputCheckbox);

      var tdButtonRemove = createButtonRemove(item);
      tr.appendChild(tdButtonRemove);

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
  }

  function removeItem(){
    if(!confirm('do you want delete?'))
      return;
    var _this = this;
    _todo.forEach(function(item, index){
      if(item.id === Number(_this.getAttribute('data-value')))
        delete _todo[index];
    });
    $.dispatchEvent(updateToDo);
  }

  init();
})(document)
