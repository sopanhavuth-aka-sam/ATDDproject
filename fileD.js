/**(Sam) File D: getStartingIndex(), getEndingIndex(), getDots()**/

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

/*This fuction determines how dots is to be filled based on the user
* time unit selection.
* @param startIndex The index on which to start adding detections from the allDetections array.
* @param endIndex The index on which to stop adding detections from the alldDetections array.
* @param timeUnit The time unit that the user has selected.
* @return array This returns the detections to be displayed based on a unit of time.
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
            dots = getHourlyDetections(startIndex, endIndex);
            break;
        case 1:
            dots = getDailyDetections(startIndex, endIndex);
            break;
        case 2:
            dots = getWeeklyDetections(startIndex, endIndex);
            break;
        case 3:
            dots = getMonthlyDetections(startIndex, endIndex);
            break;
    }
    return dots;
}
