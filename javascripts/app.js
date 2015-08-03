/*************
 * Author: Christopher Dancarlo Danan
 * Created: July 2015
 * For: NumberCruncher project.
 * Name: app.js
 * Purpose: Handles the scripting for the project. The project is a calculator where the user
 			can input numbers (either separated by a comma or space), and the page will output
 			mathematical calculations and statistics (e.g. sum, average, standard deviation).
*************/

//Reference: http://www.stoimen.com/blog/2010/07/09/friday-algorithms-javascript-bubble-sort/
/*************
 * Purpose:	Sort the given array, from least to greatest.
 * Input:	
 			-numbers: the array that is passed in.
 			-length: the size of the array.
 * Output:
 			The array will be sorted, from least to greatest.
*************/
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
			}
		}
	}while(swapped);
};

/**************
 * Purpose: Add the numbers to calculate the sum.
 * Input:
 			-numbers: the array that is passed in.
 * Output:
 			Return the sum to the caller.
*************/
var summation = function(numbers){
	"use strict";

	var sum = 0;  //Holds the sum of the numbers.

	numbers.forEach(function(number){
		sum = sum + number;
	});

	return sum;
};

/**************
 * Purpose: Find the average of the numbers.
 * Input:
 			-numbers: the array that is passed in.
 			-length: the size of the array.
 * Output:
 			Return the average to the caller.
*************/
var average = function(numbers, length){
	"use strict";

	var sum = summation(numbers);

	return sum/length;
};

/**************
 * Purpose: Find the median of the numbers.
 * Input:
 			-numbers: the array that is passed in.
 			-length: the size of the array.
 * Output:
 			Return the median to the caller.
*************/
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

/**************
 * Purpose: Find the number of times each number appears in the array and store the data into an object.
 * Input:
 			-numbers: the array that is passed in.
 			-length: the size of the array.
 * Output:
 			Return the object holding number of occurrences to the caller.
*************/
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

	return counts;
};

/**************
 * Purpose: Find the mode of the numbers by finding the number(s) with the highest number of occurrences.
 * Input:
 			-numbers: the array that is passed in.
 			-length: the size of the array.
 * Output:
 			Return the mode to the caller.
*************/
var mode = function(numbers, length){
	var max = 2,  //Mode has to appear 2 or more times.
		mode = [],  //Can be more than 2 modes, so put them in array.
		counts = {};  //Object that holds the number of occurrences for each number.

	counts = numOccurrences(numbers, length);  //Get the number of occurrences of each number.

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

	//If there is no array, then mode does not exist.
	if(mode.length === 0){
		mode = "None";
	}

	return mode;
};

//Reference: https://www.purplemath.com/modules/meanmode.htm
/*************
 * Purpose: Find the range of the numbers.
 * Input:
 			-smallest: the smallest number from the inputs.
 			-largest: the largest number from the inputs.
 * Output:
 			Return the range to the caller.
*************/
var range = function(smallest, largest){
	return largest - smallest;
};

//Reference: http://www.mathsisfun.com/data/standard-deviation.html
/**************
 * Purpose: Find the variance of the numbers. This function can calculate the sample and population vairance since
 			the length is also passed in as a parameter (population variance uses the full length while sample
 			variance uses length-1).
 * Input:
 			-avg: the average of the numbers
 			-numbers: the array that is passed in.
 			-length: the size of the array.
 * Output:
 			Return the variance to the caller.
*************/
var variance = function(avg, numbers, length){
	var diffOfSquares = 0;  //Holds the difference of squares.

	//Calculate the difference of squares.
	numbers.forEach(function(number){
		var temp = number - avg;
		temp = Math.pow(temp, 2);
		diffOfSquares += temp;
	});

	return diffOfSquares / length;
};

//Reference: http://www.mathsisfun.com/data/standard-deviation.html
/**************
 * Purpose: Find the standard deviation of the numbers. Population and sample standard deviantion is found depending
 			on the type of variance that is sent in as a parameter.
 * Input:
 			-vari: the variance used to calculate the standard deviation.
 * Output:
 			Return the standard deviation to the caller.
*************/
var standardDeviation = function(vari){
	return Math.sqrt(vari);
};

var main = function(){
	"use strict";

	console.log("Hello Vane");

	//Note: need to give variable names that are different from function names, otherwise there'll be errors.
	var varSum,
		varAvg,
		varMed,
		varMode,
		varRange,
		popVariance,
		sampVariance,
		popSD,
		sampSD;

	//Press the calculate button.
	$("#submitBtn").on("click", function(){
		$("#output-field").empty();  //Empty previous outputs.

		var inp = $("textarea").val();  //Get the value of string in text area.
		//inp = inp.replace(/\s/g, '');  //Remove all whitespace from string. Reference: http://stackoverflow.com/questions/6623231/remove-all-white-spaces-from-text

		inp = inp.replace(/[^0-9\.\,\ \-]+/g, '');  //Remove all non-numeric characters except for points, commas, whitespace, and minus signs (for negative numbers). Reference: http://stackoverflow.com/questions/26202837/remove-non-numeric-characters-except-dash

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

		//Only use resources when there are 2 or more numbers to input.
		if(length > 1){
			bubbleSort(numbers, length);

			varSum = summation(numbers);
			varAvg = average(numbers, length);
			varMed = median(numbers, length);
			varMode = mode(numbers, length);
			varRange = range(numbers[0], numbers[length -1]);
			popVariance = variance(varAvg, numbers, length);
			sampVariance = variance(varAvg, numbers, length - 1);
			popSD = standardDeviation(popVariance);
			sampSD = standardDeviation(sampVariance);

			//Put information into DOM paragraphs.
			var $numInfo = $("<p>").attr("id", "numInfo").addClass("output-info").text("Numbers entered (in order): " + numbers.join(", ")),  //Reference for formatting object output: http://stackoverflow.com/questions/12835621/removing-commas-from-javascript-array
				$lenInfo = $("<p>").attr("id", "lenInfo").addClass("output-info").text("Amount of numbers entered: " + length),
				$sumInfo = $("<p>").attr("id", "sumInfo").addClass("output-info").text("Sum: " + varSum),
				$avgInfo = $("<p>").attr("id", "avgInfo").addClass("output-info").text("Average: " + varAvg),
				$medInfo = $("<p>").attr("id", "medInfo").addClass("output-info").text("Median: " + varMed),
				$modeInfo = $("<p>").attr("id", "modeInfo").addClass("output-info").text("Mode: " + varMode),
				$rangeInfo = $("<p>").attr("id", "rangeInfo").addClass("output-info").text("Range: " + varRange),
				$popVarInfo = $("<p>").attr("id", "popVarInfo").addClass("output-info").text("Population Variance: " + popVariance),
				$sampVarInfo = $("<p>").attr("id", "sampVarInfo").addClass("output-info").text("Sample Variance: " + sampVariance),
				$popSDInfo = $("<p>").attr("id", "popSDInfo").addClass("output-info").text("Population Standard Deviation: " + popSD),
				$sampSDInfo = $("<p>").attr("id", "sampSDInfo").addClass("output-info").text("Sample Standard Deviation: " + sampSD);

			//Append the information in the output area.
			$("#output-field").append($numInfo);
			$("#output-field").append($lenInfo);
			$("#output-field").append($sumInfo);
			$("#output-field").append($avgInfo);
			$("#output-field").append($medInfo);
			$("#output-field").append($modeInfo);
			$("#output-field").append($rangeInfo);
			$("#output-field").append($popVarInfo);
			$("#output-field").append($sampVarInfo);
			$("#output-field").append($popSDInfo);
			$("#output-field").append($sampSDInfo);
		} else{
			var $emptyMsg = $("<p>").attr("id", "emptyMsg").text("Please input at least 2 numbers.");
			$("#output-field").append($emptyMsg);
		}

		console.log("Numbers entered: " + numbers);
		console.log("How many numbers entered: " + length);
		console.log("Sum: " + varSum);
		console.log("Avg: " + varAvg);
		console.log("Median: " + varMed);
		console.log("Mode: " + varMode);
		console.log("Range: " + varRange);
		console.log("Population Variance: " + popVariance);
		console.log("Sample Variance: " + sampVariance);
		console.log("Population Standard Deviation: " + popSD);
		console.log("Sample Standard Deviation: " + sampSD);
	});
};

$(document).ready(main);

//t
//fflvd