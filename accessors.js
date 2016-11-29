/*This fuction determines how dots is to be filled based on the user
* time unit selection.
* @param startIndex The index on which to start adding detections from the allDetections array.
* @param endIndex The index on which to stop adding detections from the alldDetections array.
* @param timeUnit The time unit that the user has selected.
* @return array This returns the detections to be displayed based on a unit of time in an array called dots
*/
function getDots(startDate, endDate, timeUnit)//timeUnit is based on user input, hourly, daily, etc.
{
	var startIndex = getStartingIndex(allDetections, startDate);
	var endIndex = getEndingIndex(allDetections, endDate);

	//console.log(startIndex + "  " + endIndex); //DEBUGGING
	//console.log(startDate + " " + endDate); //DEBUGGING
	var dots = [];

	if(startIndex === -1) {
		return dots;
	}

	switch(timeUnit)
	{
		case 0:
			//const HOURLY = 3600000;
			dots = getDetections(startIndex, endIndex, 3600000);
			break;
		case 1:
			//const DAILY = 86400000;
			dots = getDetections(startIndex, endIndex, 86400000);
			break;
		case 2:
			//const WEEKLY = 604800000;
			dots = getDetections(startIndex, endIndex, 604800000);
			break;
		case 3:
			//const MONTHLY = 2628000000;
			dots = getDetections(startIndex, endIndex, 2628000000);
			break;
	}
	return dots;
}

/* This function fills the dots array based on an hourly detection rate.
* This function is called by getDots().
* @param startIndex The index on which to start adding detections from the allDetections array.
* @param endIndex The index on which to stop adding detections from the alldDetections array.
* @param timeUnit The input representing MONTHLY, DAILY, WEEKLY, HOURLY variables.
* 	Reference:
*		const HOURLY = 3600000;
*		const DAILY = 86400000;
*		const WEEKLY = 604800000;
*		const MONTHLY = 2628000000;
* @return array This returns the detections to be displayed based on an hourly unit of time.
*/

function getDetections(startIndex, endIndex, timeUnit) {
	var dots = [];
	var traversalIndex = startIndex;
	var timeMeasurement = 0;
	var currentTm = Math.floor(allDetections[startIndex].dateTime.getTime() / timeUnit);
	var uniqueDotsInTm = 0;

	dots[dots.length] = {lat: allDetections[startIndex].lat, lng: allDetections[startIndex].lng, count: 1, tm: timeMeasurement, dateTime: allDetections[traversalIndex].dateTime};
	uniqueDotsInTm++;
	while(traversalIndex <= endIndex) {
		if(currentTm === Math.floor(allDetections[traversalIndex].dateTime.getTime() / timeUnit)) {
			if(allDetections[traversalIndex].lat === dots[dots.length-1].lat && allDetections[traversalIndex].lng === dots[dots.length-1].lng
				&& timeMeasurement === dots[dots.length-1].tm) {
				dots[dots.length-1].count += 1;
				traversalIndex++;
			}
			else {
				var newDot = true;
				for(i=uniqueDotsInTm; i > 0; i--) {
					if(allDetections[traversalIndex].lat === dots[dots.length-i].lat && allDetections[traversalIndex].lng === dots[dots.length-i].lng) {
						dots[dots.length-i].count += 1;
						newDot = false;
					}
				}
				if(newDot) {
					dots[dots.length] = {lat: allDetections[traversalIndex].lat, lng: allDetections[traversalIndex].lng, count: 1, tm: timeMeasurement, dateTime: allDetections[traversalIndex].dateTime};
					uniqueDotsInTm++;
				}
				traversalIndex++;
			}
		}
		else {
			timeMeasurement++;
			currentTm = Math.floor(allDetections[traversalIndex].dateTime.getTime() / timeUnit);
			uniqueDotsInTm = 0;
		}
	}
	return dots;
}

/*This functions gets the latitude of a detection.
*@param x This is the x coordinate of the detection.
*@param y This is the y coordiante of the detection.
*@return num This returns the latitude of the point on the map.
*/
function getLat(x, y)
{
	var point = map.containerPointToLatLng(L.point(x,y));
	return point.lat.toFixed(5);
}

/*This functions gets the longitude of a detection.
*@param x This is the x coordinate of the detection.
*@param y This is the y coordiante of the detection.
*@return num This returns the longitude of the point on the map.
*/
function getLng(x, y)
{
	var point = map.containerPointToLatLng(L.point(x,y));
	return point.lng.toFixed(5);
}

/*This fuction gets the date of a detection.
* @param date The date object from a detection as a string.
* @return string This returns the date of the detection as a string.
*/
function getDate(date)
{
	var parse = date.split(" ", 4);
	var fixedDate = parse[0] +  parse[2] + " " + parse[1] + " " + parse[3] + " ";
	return fixedDate;
}

/*This fuction gets the time of a detection.
* @param date The date object from a detection as a string.
* @return string This returns the time of the detection as a string.
*/
function getTime(date)
{
	var parse = date.split(" ", 5);
	var fixedTime = parse[4];
	return fixedTime;
}

/* Gets the time unit selected by user from track menu radio buttons
*		(hourly, daily, weekly, monthly)
* @return the index of the selected button
*/
function getTimeUnit()
{
	var selection = document.getElementsByName("radioButton");
	var timeUnit = 0;
	for(var i = selection.length; i--;) {
		if(selection[i].checked) {
			timeUnit = selection[i].value;
		}
	}
	return Number(timeUnit);
}


/*This fuction determines the index on which to stop getting detections from the
* allDetections array to fill the dots array.
* @param allDetections The array containing all the detections from the csv file.
* @param endDate The ending date that the user entered.
* @return num The index on which to stop adding detections to dots.
*/
function getEndingIndex(allDetections, endDate)
{
	var endIndex = 0;
	//Determine ending index (for the allDetections array) based on endDate
	for(i = 0; i < allDetections.length; i++)
	{
		if(allDetections[i].dateTime.getTime() > endDate.getTime())
		{
			endIndex = i - 1;
			break;
		}
	}
	return endIndex;
}

/*This fuction determines the index on which to start getting detections from the
* allDetections array to fill the dots array.
* @param allDetections The array containing all the detections from the csv file.
* @param startDate The starting date that the user entered.
* @return num The index on which to start adding detections to dots.
*/
function getStartingIndex(allDetections, startDate)
{
	var startIndex = -1;
	//determine starting index (for the allDetections array) based on startDate
	for(i = 0; i < allDetections.length; i++)
	{
		if(allDetections[i].dateTime.getTime() >= startDate.getTime())
		{
			startIndex = i;
			break;
		}
	}
	return startIndex;
}
