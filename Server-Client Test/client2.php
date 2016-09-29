<html>
<body>

    <script src="js/jquery-2.2.3.min.js"></script>

    <!-- <form action="serverSide.php" method="get" id="date"> -->
    <form id="date"> 
    <input type="text" name="StartDate" placeholder="YYYY-MM-DD"></input><br/>
    <input type="text" name="EndDate" placeholder="YYYY-MM-DD"></input><br/>
    <input type="submit" name="submit" value="Submit"></input>
    </form>
    
<script>   
    var jsonFile;
    $("date").submit(function() {
    var mydata = $("date").serialize();
    console.log(mydata); // it's only for test
    $.ajax({
        type: "GET",
        url: "/serverSide.php",
        data: mydata,
        dataType: "json",
        success: function(data) {
            jsonFile = data;
            console.log(data);
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log("error");
        }
    });
    return false;
});

    
   
</script>
</body>
</html>