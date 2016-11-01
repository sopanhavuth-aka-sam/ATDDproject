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
    $query = sprintf("SELECT * FROM detections WHERE (Date_Time between '%s' and '%s');", $startDate, $endDate);
    $result = mysqli_query($connection, $query); //$result is a 'resource' object
    // Test if there was a query error
    if(!$result) {
        die("Database query failed.");
    }
?>

<?php
    $row_array = array();
    // 3. User returned data (if any)
    while($row = mysqli_fetch_assoc($result)) {
        //output data from each row for DEBUGGING
        // var_dump($row);
        // echo "<hr />";
        //store each row in array to be return to client
        $row_array[] = $row;
    }
?>

<?php
    // 4. Close database connection
    mysqli_close($connection);

    // Send back json file
    echo json_encode($row_array);
?>
