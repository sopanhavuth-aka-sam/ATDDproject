
/*
*  jQuery's  $(document).ready(function()
*  will only run the code inside once the page is ready
*  i read that in practice its better to put the code in a separate .js file
*  	and then load it in to the html, like it currently is (at least for the $(document).ready code)
*/

/*
*  useful link for select2 boxes (species)
*	https://select2.github.io/examples.html
*/

/*
* This funciton setsup the start and end date picker.
*/
function setupDatePicker() {
	/* config startdate picker : setupStartdatePicker() & config enddate picker : setupEnddatePicker()
	* directionstartdate: false, means past only dates ending today
	* pair: $(enddate), sets the date of the enddate picker to startdate +1
	* direction for enddate: only allow dates in future from selected startdate
	* offset shifts datepickers position relative to top right of the icon
	*/
	$(document).ready(function() {
		$("#startdate").Zebra_DatePicker({direction: false, pair: $(enddate), offset:[-190, 285]});
		$("#enddate").Zebra_DatePicker({direction: false, direction: 1, offset:[-190, 285]});
	});
	/* 
*/
}

function navbarButtons(){
	// trackButton and detailsButton click functionality
	$(document).ready(function() {
		// tottle visability of the trackMenu when trackButton is clicked
		$("#trackButton").click(function() {
			$("#trackMenu").toggle("slow");
		});

		// open user guide when detailsButton is clicked
		$("#detailsButton").click(function() {
			var url = "https://github.com/sopanhavuth-aka-sam/ATDDproject/blob/miguel/UserGuide.txt";
			window.open(url, "_blank");
		});
	});
}

function loadingData(){
	// parsing "Species data" into an array of objects (each row == object)
	var speciesPromise = new Promise(function(resolve, reject) {
		var dataset = [];	// array for species.csv data
		d3.csv("Species.csv", function(data) {
			dataset = data;
			if(dataset.length > 0) {
				resolve(dataset);	// successful data load, pass data to speciesPromise.then()
			}
			else {
				reject("Parsing Specices Fail");	// failed to load data from .csv
			}
		});
	});

	// if promise was resolve/successful
	speciesPromise.then(function(dataset) {
		var speciesOptions = [];
		// load data for select box, key(id), value(string species_name)
		for(i = 0; i < dataset.length; i++){
			speciesOptions[i] = {id: i, text: dataset[i].species_name};
		}

		// configure select species select box
		$(document).ready(
			function() {
				$("#speciesSlct").select2({
				placeholder: "Select Species.",	// placeholder only works on IE v10 or higher (select2 docs)
				allowClear: true,
				data: speciesOptions,
			});

			//DISPLAYING SPECIE INPUT WHEN 'GET VALUE' IS CLICKED                <----------------------------------
			$(".getValue").click(function() {
				input_specie= $(".slct1").val();									//SAVING INPUT AS A VALUE TYPE TO input_specie
			});
		});

			/*** need to remove this 'individual' option for species ***/
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
		}).catch(function(err) {
			console.log(err);
		}
	); // end speciesPromise	
}
