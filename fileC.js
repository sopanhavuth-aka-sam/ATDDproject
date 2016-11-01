/**(Sam) File C: getSliderDate(), getSliderHour(), getLat(), getLong(), getDate(),
getTime(), clearDetections(), project(),**/

function getSliderDate(dots, currentStep)
{
    var day = dots[currentStep].dateTime.getDate();
    var month = dots[currentStep].dateTime.getMonth() + 1;
    var year = dots[currentStep].dateTime.getFullYear();
    var date = "Date:" + month.toString() + "/" + day.toString() + "/" + year.toString();
    return date;
}

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

/* This function resizes the screen based on the detections.
*/
function fitToScreen(dots)
{
    map.fitBounds(dots);
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
/* This function clears all the user inputs and removes the
*  detections from the map.
*/
function clearDetections()
{
    startDate = new Date();
    endDate = new Date();
    startIndex = 0;
    endIndex = 0;
    timeUnit = 0;
    dots = [];
    circles.remove();
}
/* This function returns a point based on latidude and longitude.
*  @param ll The longitude and longitude of a detection.
*  @return num This returns the map layer point.
*/
function project(ll)
{
    var point = map.latLngToLayerPoint(L.latLng(ll))
    return point;
}
