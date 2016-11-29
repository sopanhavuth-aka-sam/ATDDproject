/* Sets the number of steps for the slider
* @param steps, number of steps to use for slider
*/
function setSliderSteps(steps)
{
	$('#rangeSlider').prop({
		'min': 0,
		'max': steps
	});
}

/*
* This method given the array of dots that
* currentStep is the index. A portion of the play line.
* @param: dots is the array that has the user's queryed dots in it.
* Used at the dot if you hover over it displays the Date, location, time of detection.
*/

function getSliderDate(dots, currentStep)
{
	var day = dots[currentStep].dateTime.getDate();
	var month = dots[currentStep].dateTime.getMonth() + 1;
	var year = dots[currentStep].dateTime.getFullYear();
	var date = "Date:" + month.toString() + "/" + day.toString() + "/" + year.toString();
	return date;
}

/*Called from DateTag.
	Displayed on the top corner right.
	@return: It returns the string that it will display in the small box in the top right
		corner of the play box(made with js and css).
*/

function getSliderHour(dots, currentStep)
{
	var hour = dots[currentStep].dateTime.getHours();
	var time = "";
	if (hour == 0 || hour == 24)
	{
		time = "Time:12:00 am."
	}
	else if(hour <= 12)
	{
		time = "Time:" + hour + ":00 am."
	}
	else if(hour > 12)
	{
		time = "Time:" + hour%12 + ":00 pm."
	}
	return time;
}

/* Gets the number of steps for the slider
* @param dots, array of user desired detections
* @return size of dots array
*/
function getSliderSteps(dots)
{
	return dots[dots.length-1].tm;
}
