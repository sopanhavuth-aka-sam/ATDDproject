$(document).ready(function() {
	$("#startdate").Zebra_DatePicker({direction: false, pair: $(enddate), offset:[-190, 285]});
});

$(document).ready(function() {
	$("#enddate").Zebra_DatePicker({direction: false, direction: 1, offset:[-190, 285]});
});	

$(document).ready(function(){
	$("#trackButton").click(function(){
		$("#trackMenu").toggle("slow");
	});
	
	$("#detailsButton").click(function(){
		var url = "https://github.com/sopanhavuth-aka-sam/ATDDproject/blob/miguel/UserGuide.txt";
		window.open(url, "_blank");
	});
});


var speciesPromise = new Promise(function(resolve, reject){
	var dataset = [];
	d3.csv("Species.csv", function(data) {
		dataset = data;
		if(dataset.length > 0) {
			resolve(dataset);
		}
		else {
			reject("Parsing Specices Fail");
		}		
	});	
});

speciesPromise.then(
	function(dataset) {
		var speciesOptions = []; 
		
		for(i = 0; i < dataset.length; i++){
			speciesOptions[i] = {id: i, text: dataset[i].species_name};
		}
		$(document).ready(function() {
			$("#speciesSlct").select2({
			placeholder: "Select Species.",
			allowClear: true,
			data: speciesOptions, 
			});
		});	
		
		$(document).ready(function() {
			$("#individualSlct").select2({
			placeholder: "Select Individual.",
			allowClear: true,
			data: speciesOptions,
			maximumSelectionLength: 3
			});
		});
	}
).catch(
	function(err) {
		console.log(err);
	}
);