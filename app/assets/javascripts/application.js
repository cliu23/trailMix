// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require bootstrap-sprockets
//= require_tree .




	function loadQuote(){
		
			var quotes = [
			'"Every moment you live in the past is a moment you waste in the present..."', 
			'"Live each day as if your life had just begun...."', 
			'"Start by doing what\'s necessary, then do what\'s possible, and suddenly you are doing the impossible"',
			'"You have to learn the rules of the game. And then you have to play better than anyone else"',
			'"Failure will never overtake me if my determination to succeed is strong enough."'
			];
			var i = getRandom();
			var quote = quotes[i];
			console.log(quote);			
			$('#quote').append(quote);

			
		}

	function getRandom(){
		return Math.floor(Math.random()* 5);
	}

window.onload = function(){
  loadScript();
  loadQuote();
};
