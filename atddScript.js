$(document).ready(function() {
	$("#startdate").Zebra_DatePicker({direction: false, pair: $(enddate), offset:[-190, 285]});
});

$(document).ready(function() {
	$("#enddate").Zebra_DatePicker({direction: false, direction: 1, offset:[-190, 285]});
});

$(document).ready(function(){
	// $("#trackButton").click(function(){
	// 	$("#trackMenu").toggle("slow");
	// });

	$("#detailsButton").click(function(){
		var url = "https://github.com/sopanhavuth-aka-sam/ATDDproject/blob/master/UserGuide.html";
		window.open(url, "_blank");
	});
});

//parsing "Species data" into an array of objects (row == object)
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

			//DISPLAYING SPECIE INPUT WHEN 'GET VALUE' IS CLICKED                <----------------------------------
			$(".getValue").click(function() {
			input_specie= $(".slct1").val();									//SAVING INPUT AS A VALUE TYPE TO input_specie
			});
		});

		$(document).ready(function() {
			$("#individualSlct").select2({
			placeholder: "Select Individual.",
			allowClear: true,
			data: speciesOptions,
			maximumSelectionLength: 3
			});

			//DISPLAYING INDIVIDUAL INPUT WHEN 'GET VALUE' IS CLICKED                <----------------------------------
			$(".getValue").click(function() {
			input_indiv= $(".slct2").val();										//SAVING INPUT AS A VALUE TYPE TO input_indiv
			});
		});
	}
).catch(
	function(err) {
		console.log(err);
	}
);
