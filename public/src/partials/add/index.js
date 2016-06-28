(function(Route, Todo, $){
  'use strict';

  Route('add', '/src/partials/add/index.html', app);

  function app(){
    $.querySelector('[data-js="form"]')
      .addEventListener('submit', handleForm, false);
    $.querySelector('[data-js="btn-remove-all"]')
      .addEventListener('click', removeAll, false);

    function handleForm(e){
      e.preventDefault();
      var $inputTask = $.querySelector('[data-js="input-task"]');
      Todo.insert({
        task: $inputTask.value,
        status: 0
      });
      $inputTask.value = '';
    }

    function removeAll(){
      Todo.removeAll();
    }
  }
})(Route, Todo, document);
