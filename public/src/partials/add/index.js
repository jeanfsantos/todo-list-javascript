(function(Route, Todo, $){
  'use strict';

  Route('add', '/src/partials/add/index.html', app);

  function app(){
    var $form = $.querySelector('[data-js="form"]');
    var $btnRemove = $.querySelector('[data-js="btn-remove-all"]');

    $form.addEventListener('submit', handleForm, false);
    $btnRemove.addEventListener('click', removeAll, false);

    function handleForm(e){
      e.preventDefault();
      var $inputTask = $.querySelector('[data-js="input-task"]');
      var todo = {
        task: $inputTask.value,
        status: 0
      };
      Todo.insert(todo);
      $inputTask.value = '';
    }

    function removeAll(){
      Todo.removeAll();
    }
  }
})(Route, Todo, document);
