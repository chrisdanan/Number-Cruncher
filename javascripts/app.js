var add = function(numbers){
	"use strict";

	var sum = 0;  //Holds the sum of the numbers.

	numbers.forEach(function(number){
		sum = sum + number;
	});

	return sum;
};

var average = function(numbers, length){
	var sum = add(numbers);

	return sum/length;
};

var median = function(numbers){

};

var mode = function(numbers){

};

var main = function(){
	"use strict";

	console.log("Hello Vane");

	//Press the submit button.
	$("#submitBtn").on("click", function(){
		var inp = $("textarea").val();  //Get the value of string in text area.
		//inp = inp.replace(/\s/g, '');  //Remove all whitespace from string. Reference: http://stackoverflow.com/questions/6623231/remove-all-white-spaces-from-text

		inp = inp.replace(/[^0-9\.\,]+/g, '');  //Remove all non-numeric characters except for points and commas. Reference: http://stackoverflow.com/questions/26202837/remove-non-numeric-characters-except-dash

		var numbers = inp.split(/[ ,]+/);  //Retrieve each number entered and put them into an array. Reference: http://stackoverflow.com/questions/10346722/how-can-i-split-a-javascript-string-by-white-space-or-comma
		var length = numbers.length;  //Get how many numbers the user inputted.

		for(var i = 0; i < length; i++){
			//Translate the string input into number input.
			numbers[i] = parseFloat(numbers[i]);

			//Go through numbers one more time and remove any NaNs.
			if(isNaN(numbers[i])){
				numbers.splice(i, 1); 
			}
		}

		length = numbers.length;  //Need to recalculate length in case NaNs are stripped.
		
		console.log(numbers);
		console.log(add(numbers));
		console.log(average(numbers, length));
	});
};

$(document).ready(main);