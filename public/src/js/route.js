(function(window, $){
  'use strict';

  function Route(hash, template, fn){
    if(!(this instanceof Route))
      return new Route(hash, template, fn);
    this.hash = hash;
    this.template = template;
    this.fn = fn;
    this.cache = null;
    this.initEvents();
  }

  Route.prototype.initEvents = function initEvents(){
    window.addEventListener('load', this.handleRoute.bind(this), false);
    window.addEventListener('hashchange', this.handleRoute.bind(this), false);
  };

  Route.prototype.handleRoute = function handleRoute(e){
    if(!location.hash){
      location.hash = '#/index';
      return;
    }
    if(location.hash.substring(2) !== this.hash)
      return;
    if(this.cache){
      this.renderHTML(this.cache);
      return;
    }
    this.handleAjax(this.template);
  };

  Route.prototype.handleAjax = function handleAjax(file){
    this.ajax = new XMLHttpRequest();
    this.ajax.open('GET', file);
    this.ajax.send();
    this.ajax.addEventListener('readystatechange', this.handleReadyStateChange.bind(this), false);
  };

  Route.prototype.handleReadyStateChange = function handleReadyStateChange(){
    if(!this.isRequestOk())
      return;
    this.cache = this.ajax.responseText;
    this.renderHTML(this.ajax.responseText);
  };

  Route.prototype.isRequestOk = function isRequestOk(){
    return this.ajax.readyState === 4 && this.ajax.status === 200;
  };

  Route.prototype.renderHTML = function renderHTML(html){
    var $main = $.querySelector('[data-js="main"]');
    $main.innerHTML = html;
    this.fn();
  };

  window.Route = Route;
})(window, document)
