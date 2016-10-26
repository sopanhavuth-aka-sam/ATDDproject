<?php
    // 0. Reciving GET request
    if( $_GET["StartDate"] && $_GET["EndDate"]) {
        $startDate = $_GET["StartDate"];
        $endDate = $_GET["EndDate"];
    }
    // 1. Create DB connection
    $dbhost = "cecs-db01.coe.csulb.edu";
    $dbuser = "cecs491b1";
    $dbpass = "sh!oR2";
    $dbname = "cecs491bgroup";

    $connection = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
    //Test db connection
    if(mysqli_connect_errno()) {
        die("Database connetion failed: ".
            mysqli_connect_error() .
            " (" . mysqli_connect_errno() . ")"
        );
    }
?>

<?php
    // 2. Perform database query
    // $query = "SELECT * FROM detections WHERE (Date_Time between " .$startDate . " and " .$endDate. ")";
    $query = sprintf("SELECT * FROM detections WHERE (Date_Time between '%s' and '%s');", $startDate, $endDate);
    echo $query;
    $result = mysqli_query($connection, $query); //$result is a 'resource' object
    // Test if there was a query error
    if(!$result) {
        die("Database query failed.");
    }

    $row_array = array();
    // 3. User returned data (if any)
    echo $result;
    while($row = mysqli_fetch_assoc($result)) {
        //output data from each row for DEBUGGING
        var_dump($row);
        echo $row;
        echo "<hr />";
        //store each row in array to be return to client
        $row_array[] = $row;
    }

    // 4. Close database connection
    mysqli_close($connection);

    // Send back json file
    $json_obj_arr = json_encode($row_array);
    echo $json_obj_arr;
?>