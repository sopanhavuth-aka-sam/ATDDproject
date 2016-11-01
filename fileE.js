/**(Sam) File E: getHourlyDetections(), getDailyDetections(), getWeeklyDetections(),
getMonthlyDetections(), removeZeroCountDot()**/


/* This function fills the dots array based on an hourly detection rate.
* @param startIndex The index on which to start adding detections from the allDetections array.
* @param endIndex The index on which to stop adding detections from the alldDetections array.
* @return array This returns the detections to be displayed based on an hourly unit of time.
*/
function getHourlyDetections(startIndex, endIndex)
{
    var dots = [];
    var traversalIndex = startIndex;
    var timeMeasurement = 0;
    var currentTm = Math.floor(allDetections[startIndex].dateTime.getTime() / HOURLY);
    var uniqueDotsInTm = 0;

    dots[dots.length] = {lat: allDetections[startIndex].lat, lng: allDetections[startIndex].lng, count: 1, tm: timeMeasurement, dateTime: allDetections[traversalIndex].dateTime};
    uniqueDotsInTm++;
    while(traversalIndex <= endIndex)
    {
        if(currentTm === Math.floor(allDetections[traversalIndex].dateTime.getTime() / HOURLY))
        {
            if(allDetections[traversalIndex].lat === dots[dots.length-1].lat && allDetections[traversalIndex].lng === dots[dots.length-1].lng
                && timeMeasurement === dots[dots.length-1].tm)
            {
                dots[dots.length-1].count += 1;
                traversalIndex++;
            }
            else
            {
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
        else
        {
            timeMeasurement++;
            currentTm = Math.floor(allDetections[traversalIndex].dateTime.getTime() / HOURLY);
            uniqueDotsInTm = 0;
        }
    }
    return dots;
}

/* This function fills the dots array based on an daily detection rate.
* @param startIndex The index on which to start adding detections from the allDetections array.
* @param endIndex The index on which to stop adding detections from the alldDetections array.
* @return array This returns the detections to be displayed based on an daily unit of time.
*/
function getDailyDetections(startIndex, endIndex)
{
    var dots = [];
    var traversalIndex = startIndex;
    var timeMeasurement = 0;
    var currentTm = Math.floor(allDetections[startIndex].dateTime.getTime() / DAILY);
    var uniqueDotsInTm = 0;

    dots[dots.length] = {lat: allDetections[startIndex].lat, lng: allDetections[startIndex].lng, count: 1, tm: timeMeasurement, dateTime: allDetections[traversalIndex].dateTime};
    uniqueDotsInTm++;
    while(traversalIndex <= endIndex)
    {
        if(currentTm === Math.floor(allDetections[traversalIndex].dateTime.getTime() / DAILY))
        {
            if(allDetections[traversalIndex].lat === dots[dots.length-1].lat && allDetections[traversalIndex].lng === dots[dots.length-1].lng
                && timeMeasurement === dots[dots.length-1].tm)
            {
                dots[dots.length-1].count += 1;
                traversalIndex++;
            }
            else
            {
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
        else
        {
            timeMeasurement++;
            currentTm = Math.floor(allDetections[traversalIndex].dateTime.getTime() / DAILY);
            uniqueDotsInTm = 0;
        }
    }
    return dots;
}
/* This function fills the dots array based on an weekly detection rate.
* @param startIndex The index on which to start adding detections from the allDetections array.
* @param endIndex The index on which to stop adding detections from the alldDetections array.
* @return array This returns the detections to be displayed based on an weekly unit of time.
*/
function getWeeklyDetections(startIndex, endIndex)
{
    var dots = [];
    var traversalIndex = startIndex;
    var timeMeasurement = 0;
    var currentTm = Math.floor(allDetections[startIndex].dateTime.getTime() / WEEKLY);
    var uniqueDotsInTm = 0;

    dots[dots.length] = {lat: allDetections[startIndex].lat, lng: allDetections[startIndex].lng, count: 1, tm: timeMeasurement, dateTime: allDetections[traversalIndex].dateTime};
    uniqueDotsInTm++;
    while(traversalIndex <= endIndex)
    {
        if(currentTm === Math.floor(allDetections[traversalIndex].dateTime.getTime() / WEEKLY))
        {
            if(allDetections[traversalIndex].lat === dots[dots.length-1].lat && allDetections[traversalIndex].lng === dots[dots.length-1].lng
                && timeMeasurement === dots[dots.length-1].tm)
            {
                dots[dots.length-1].count += 1;
                traversalIndex++;
            }
            else
            {
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
        else
        {
            timeMeasurement++;
            currentTm = Math.floor(allDetections[traversalIndex].dateTime.getTime() / WEEKLY);
            uniqueDotsInTm = 0;
        }
    }
    return dots;
}
/* This function fills the dots array based on an monthly detection rate.
* @param startIndex The index on which to start adding detections from the allDetections array.
* @param endIndex The index on which to stop adding detections from the alldDetections array.
* @return array This returns the detections to be displayed based on an monthly unit of time.
*/
function getMonthlyDetections(startIndex, endIndex)
{
var dots = [];
    var traversalIndex = startIndex;
    var timeMeasurement = 0;
    var currentTm = Math.floor(allDetections[startIndex].dateTime.getTime() / MONTHLY);
    var uniqueDotsInTm = 0;

    dots[dots.length] = {lat: allDetections[startIndex].lat, lng: allDetections[startIndex].lng, count: 1, tm: timeMeasurement, dateTime: allDetections[traversalIndex].dateTime};
    uniqueDotsInTm++;
    while(traversalIndex <= endIndex)
    {
        if(currentTm === Math.floor(allDetections[traversalIndex].dateTime.getTime() / MONTHLY))
        {
            if(allDetections[traversalIndex].lat === dots[dots.length-1].lat && allDetections[traversalIndex].lng === dots[dots.length-1].lng
                && timeMeasurement === dots[dots.length-1].tm)
            {
                dots[dots.length-1].count += 1;
                traversalIndex++;
            }
            else
            {
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
        else
        {
            timeMeasurement++;
            currentTm = Math.floor(allDetections[traversalIndex].dateTime.getTime() / MONTHLY);
            uniqueDotsInTm = 0;
        }
    }
    return dots;
}

//Might not need this
//filering data base on userInput(dates)
//	function dateFilter(data, start_date, end_date) {
//
//		var newData = [];
//
//		for(i =0; i < data.length - 1; i++) {
//			if( +start_date <= +data[i].dateTime && +data[i].dateTime <= +end_date) {
//				newData.push(data[i]);
//			}
//		}
//
//		return newData;
//	}//end: dateFilter()

function removeZeroCountDot(dots) {
    var noZeroDots = [];
    for( i=0; i < dots.length; i++) {
        if (dots[i].count > 0) {
            noZeroDots.push(dots[i]);
        }
    }
    return noZeroDots;
}
