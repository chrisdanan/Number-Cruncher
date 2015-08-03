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

var summation = function(numbers){
	"use strict";

	var sum = 0;  //Holds the sum of the numbers.

	numbers.forEach(function(number){
		sum = sum + number;
	});

	return sum;
};

var average = function(numbers, length){
	"use strict";

	var sum = summation(numbers);

	return sum/length;
};

var median = function(numbers, length){
	"use strict";

	if(length % 2 === 0){  //Even number of numbers in array.
		var rightMid = length / 2,  //Right-middle number.
			leftMid = rightMid - 1;  //Left-middle number.

		return average([numbers[leftMid], numbers[rightMid]], 2);

	} else{  //Odd number of numbers in array.
		var mid = Math.floor(length / 2);  //Middle of the array.
		return numbers[mid];
	}

	return null;  //Should not be able to go to this state.
};

var numOccurrences = function(numbers, length){
	var currentNum,  //The current number in the array.
		counts = {};  //The JSON object that holds the number of occurrences of each number.

	//Go through the array, and if the number is already in the counts object, increase its number of occurrence by 1, otherwise put it in object with occurrence of 1.
	for(var i = 0; i < length; i++){
		currentNum = numbers[i];

		if(counts.hasOwnProperty(currentNum)){
			counts[currentNum] += 1;
		} else{
			counts[currentNum] = 1;
		}
	}

	return mode(counts);
};

var mode = function(counts){
	var max = 2,  //Mode has to appear 2 or more times.
		mode = [];  //Can be more than 2 modes, so put them in array.

	//Go through each key-value pair in counts.
	for(var num in counts){
		//Make sure that counts has key.
		if(counts.hasOwnProperty(num)){
			if(counts[num] === max){  //If number has same number of occurrences as max, then it is a mode.
				mode.push(num);
			} else if(counts[num] > max){  //If number has more number of occurrences as max, then it is new mode.
				max = counts[num];  //Max occurrences is updated.
				mode = [];	//Remove previous mode candidates.
				mode.push(num);  //Put in the new candidate.
			}
		}
	}

	if(mode.length === 0){
		mode = "None";
	}

	return mode;
};

var variance = function(avg, numbers, length){
	var diffOfSquares = 0;

	numbers.forEach(function(number){
		var temp = number - avg;
		temp = Math.pow(temp, 2);
		diffOfSquares += temp;
	});

	console.log(diffOfSquares / length);

	return diffOfSquares / length;
};

var standardDeviation = function(vari){
	return Math.sqrt(vari);
};

var main = function(){
	"use strict";

	console.log("Hello Vane");

	var sum,
		avg,
		med,
		varMode,
		popVariance,
		sampleVariance,
		popSD,
		sampleSD;

	//Press the submit button.
	$("#submitBtn").on("click", function(){
		var inp = $("textarea").val();  //Get the value of string in text area.
		//inp = inp.replace(/\s/g, '');  //Remove all whitespace from string. Reference: http://stackoverflow.com/questions/6623231/remove-all-white-spaces-from-text

		inp = inp.replace(/[^0-9\.\,\ ]+/g, '');  //Remove all non-numeric characters except for points and commas. Reference: http://stackoverflow.com/questions/26202837/remove-non-numeric-characters-except-dash

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

		sum = summation(numbers);
		avg = average(numbers, length);
		median = median(numbers, length);
		mode = numOccurrences(numbers, length);
		popVariance = variance(avg, numbers, length);
		sampleVariance = variance(avg, numbers, length - 1);
		popSD = standardDeviation(popVariance);
		sampleSD = standardDeviation(sampleVariance);

		console.log(numbers);
		console.log("Sum: " + sum);
		console.log("Avg: " + avg);
		console.log("Median: " + median);
		console.log("Mode: " + mode);
		console.log("Population Variance: " + popVariance);
		console.log("Sample Variance: " + sampleVariance);
		console.log("Population Standard Deviation: " + popSD);
		console.log("Sample Standard Deviation: " + sampleSD);
	});
};

$(document).ready(main);