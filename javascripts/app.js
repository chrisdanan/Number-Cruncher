//Reference: http://www.stoimen.com/blog/2010/07/09/friday-algorithms-javascript-bubble-sort/
var bubbleSort = function(numbers, length){
	var swapped;  //Ends loop if false.

	do{
		swapped = false;

		for(var i = 0; i <= (length - 2); i++){
			if(numbers[i] > numbers[i+1]){
				var temp = numbers[i];
				numbers[i] = numbers[i+1];
				numbers[i+1] = temp;
				swapped = true;
				console.log("loop");
			}
		}
	}while(swapped);
};

var add = function(numbers){
	"use strict";

	var sum = 0;  //Holds the sum of the numbers.

	numbers.forEach(function(number){
		sum = sum + number;
	});

	return sum;
};

var average = function(numbers, length){
	"use strict";

	var sum = add(numbers);

	return sum/length;
};

var median = function(numbers, length){
	"use strict";

	if(length % 2 === 0){  //Even number of numbers in array.
		console.log("Even number of numbers in the array.");
		var rightMid = length / 2,  //Right-middle number.
			leftMid = rightMid - 1;  //Left-middle number.

		return average([numbers[leftMid], numbers[rightMid]], 2);

	} else{  //Odd number of numbers in array.
		console.log("Odd number of numbers in the array.");
		var mid = Math.floor(length / 2);  //Middle of the array.
		return numbers[mid];
	}

	return null;  //Should not be able to go to this state.
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

		bubbleSort(numbers, length);
		console.log(numbers);
		console.log("Sum: " + add(numbers));
		console.log("Avg: " + average(numbers, length));
		console.log("Median: " + median(numbers, length));
	});
};

$(document).ready(main);