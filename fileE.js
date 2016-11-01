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
