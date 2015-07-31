var main = function(){
	"use strict";

	console.log("Hello Vane");

	//Press the submit button.
	$("#submitBtn").on("click", function(){
		var inp = $("textarea").val();  //Get the value of string in text area.
		//inp = inp.replace(/\s/g, '');  //Remove all whitespace from string. Reference: http://stackoverflow.com/questions/6623231/remove-all-white-spaces-from-text

		var numbers = inp.split(/[ ,]+/);  //Retrieve each number entered and put them into an array. Reference: http://stackoverflow.com/questions/10346722/how-can-i-split-a-javascript-string-by-white-space-or-comma

		numbers.forEach(function(number){
			console.log(number);
			console.log(Math.trunc(number));
		});
	});
};

$(document).ready(main);