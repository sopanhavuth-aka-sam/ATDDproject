function getSliderSteps(dots) {
    return dots[dots.length-1].tm;
}

function setSliderSteps(steps) {
    $('#rangeSlider').prop({
        'min': 0,
        'max': steps
    });
}


function getTimeUnit() {
    var selection = document.getElementsByName("radioButton");
    var timeUnit = 0;
    for(var i = selection.length; i--;)
    {
        if(selection[i].checked)
        {
            timeUnit = selection[i].value;
        }
    }

    return Number(timeUnit);
}

function dateTag(currentStep, timeUnit, dots)
{
    if(timeUnit === 0)
    {
        $("#currentHour").text(getSliderHour(dots, currentStep));
    }
    else
    {
        $("#currentDate").text(getSliderDate(dots, currentStep));
    }
}

/*This function adds all the detections to the map with a radius of 2 and blinks
* detections based on the current step on the slider.
* @param currentStep The step that the slider is currently on.
*/
function drawDetections(currentStep, dots){
    //add this to fixed the circle size
    var max_rad = $(window).height() * 0.15;//dynamcially change base on screen size
    var maxDetectionCount = Math.max.apply(Math,dots.map(function(o){
                                    return o.count;
                                })); //maximum detection at a single location/dot

    circles
    .attr("cx", function(d)
    {
        return project(d).x;
    })
    .attr("cy", function(d)
    {
        return project(d).y;
    })
    .style({
        fill: "#ff1a1a",
        "fill-opacity": 0.6,
        stroke: "#004d60",
        "stroke-width": 1
    })
    .transition().duration(500)
    .attr("r", function(d)
    {
        if(d.tm === currentStep)
            //return d.rad;//simply use return d.rad to display all (no if statement)
            return d.count * max_rad / maxDetectionCount;
        else
            return 2;
    });
}

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
    if (hour === 0 || hour == 24)
    {
        time = "Time:12:00 am.";
    }
    else if(hour <= 12)
    {
        time = "Time:" + hour + ":00 am.";
    }
    else if(hour > 12)
    {
        time = "Time:" + hour%12 + ":00 pm.";
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
    var point = map.latLngToLayerPoint(L.latLng(ll));
    return point;
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
function getDots(timeUnit)//timeUnit is based on user input, hourly, daily, etc.
{
    // var startIndex = getStartingIndex(allDetections, startDate);
    // var endIndex = getEndingIndex(allDetections, endDate);

    //console.log(startIndex + "  " + endIndex); //DEBUGGING
    //console.log(startDate + " " + endDate); //DEBUGGING
    var dots = [];

    // if(startIndex === -1) {
    //     return dots;
    // }

    switch(timeUnit)
    {
        case 0:
            // dots = getHourlyDetections(startIndex, endIndex);
            dots = getHourlyDetections(0, allDetections.length - 1);
            break;
        case 1:
            // dots = getDailyDetections(startIndex, endIndex);
            dots = getDailyDetections(0, allDetections.length - 1);
            break;
        case 2:
            // dots = getWeeklyDetections(startIndex, endIndex);
            dots = getWeeklyDetections(0, allDetections.length - 1);
            break;
        case 3:
            // dots = getMonthlyDetections(startIndex, endIndex);
            dots = getMonthlyDetections(0, allDetections.length - 1);
            break;
    }
    return dots;
}

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
            if(allDetections[traversalIndex].lat === dots[dots.length-1].lat &&
                allDetections[traversalIndex].lng === dots[dots.length-1].lng &&
                timeMeasurement === dots[dots.length-1].tm)
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
            if(allDetections[traversalIndex].lat === dots[dots.length-1].lat &&
                allDetections[traversalIndex].lng === dots[dots.length-1].lng &&
                timeMeasurement === dots[dots.length-1].tm)
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
            if(allDetections[traversalIndex].lat === dots[dots.length-1].lat &&
                allDetections[traversalIndex].lng === dots[dots.length-1].lng &&
                timeMeasurement === dots[dots.length-1].tm)
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
            if(allDetections[traversalIndex].lat === dots[dots.length-1].lat &&
                allDetections[traversalIndex].lng === dots[dots.length-1].lng &&
                timeMeasurement === dots[dots.length-1].tm)
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
