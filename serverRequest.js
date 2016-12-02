/*create and store httpRequest object
This is the object that allow use to update a section of our page without loading
the entire page*/
var xmlHttp = createXmlHttpRequestObject();

function createXmlHttpRequestObject() {
    var xmlHttp;

    //For Internet Explorer user
    if(window.ActiveXObject) {
        try {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }catch(e) {
            xmlHttp = false;
        }
    }//End: For Internet Explorer user
    //For other browser
    else {
        try {
            xmlHttp = new XMLHttpRequest();
        }catch(e) {
            xmlHttp = false;
        }
    }//End: for other browser

    //Alert user if xmlHttp setting fail, else return the object
    if(!xmlHttp) {
        alert("can't create xmlHttp object!")
    }
    else {
        return xmlHttp;
    }
}//End: createXmlHttpRequestObject()

function process() {
    //state 0 or 4 mean your object(xmlHttp) is free (to communicate with the server)
    if(xmlHttp.readyState == 4 || xmlHttp.readyState == 0) {
        //encoding startDate and endDate
        var startDate = encodeURIComponent(document.getElementById("startdate").value);
        var endDate = encodeURIComponent(document.getElementById("enddate").value);

        /*createing a request to be sent to the server
        @param1 type of request GET or POST. Have to match the request type in our
                server
        @param2 format of the request url
        @param3 true: asychronous, false: non-asychronous (I don't know the significant here)
        */
        xmlHttp.open("GET", "server.php?StartDate="+ startDate + "&EndDate=" +endDate, false);

        /*When the server response, call handleServerResponse() to handle file
        that was send back from the server*/
        xmlHttp.onreadystatechange = handleServerResponse;

        /*sending the request
        the param is null because GET request doesn't use it
        if you were using POST, you would need to use this param
        */
        xmlHttp.send(null);
    }
    //if xmlHttp is busy, wait for 1s, then try again
    else {
        setTimeout('process()', 1000);
    }
}//End: process()

/*This function handle xml file that was returned from the server.
And change the message in underInput element
*/
function handleServerResponse() {
    //readyState == 4: xmlHttp is done communicating
    if(xmlHttp.readyState == 4) {
        //status == 200: communication was okay
        if(xmlHttp.status == 200) {
            //globle variable response of the returned json file (as string formatted json)
            response = xmlHttp.responseText;
            //convert string-formatted json to actual json
            json_response = JSON.parse(response);
            //Initialize addDetections
            for(i = 0; i < json_response.length; i++)
            {
                //use library XDate to help convert date; [0] is needed because otherwise 'date object' is inside an array of object.
                allDetections[i] = {lat: parseFloat(json_response[i].Latitude), lng: parseFloat(json_response[i].Longitude), dateTime: (new XDate (json_response[i]["Date_Time"].replace(/\s+/g, 'T'), true))[0]};
            }
        }
        //if communication fail
        else {
            alert('communication fails');
        }
    }
}//End: handleServerResponse()
