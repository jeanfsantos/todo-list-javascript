(function(Route, Todo, $){
  'use strict';

  Route('index', '/src/partials/index/index.html', app);

  function app(){
    var $tbody = $.querySelector('[data-js="tbody"]');
    var eventUpdate = new CustomEvent('update');

    $tbody.addEventListener('update', handleContentTable, false);
    $tbody.dispatchEvent(eventUpdate);

    function handleContentTable(){
      $tbody.innerHTML = null;
      Todo.read().forEach(function(item){
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
      input.setAttribute('data-id', item.id);
      input.setAttribute('data-task', item.task);
      input.setAttribute('value', (item.status ? 1 : 0));
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
      button.setAttribute('data-id', item.id);
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
          item.removeEventListener('click', updateTodo, false);
          item.addEventListener('click', updateTodo, false);
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

    function updateTodo(){
      Todo.update(Number(this.getAttribute('data-id')), {
        task: this.getAttribute('data-task'),
        status: changeStatus.call(this)
      });
    }

    function changeStatus(){
      return Number(this.value) === 0 ? 1 : 0;
    }

    function removeItem(){
      Todo.remove(Number(this.getAttribute('data-id')));
      $tbody.dispatchEvent(eventUpdate);
    }
  }
})(Route, Todo, document);
