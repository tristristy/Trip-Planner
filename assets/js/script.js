const travelOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b480d29e23msh0abb34b9a11b6c1p1c16e4jsn4c7767506acd',
		'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
	}
};

const bookingOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b480d29e23msh0abb34b9a11b6c1p1c16e4jsn4c7767506acd',
		'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
	}
};


var cityName = ""
var tripStart = ""
var tripEnd = ""
var tripLength = ""
var partySize = ""
var dropDownOptions = ""
var pastTrips = []



var datePickerer = ( function() {
    var dateFormat = "mm/dd/yy",
      from = $( "#startDate" )
        .datepicker({
          defaultDate: "+1w",
          changeMonth: true,
          numberOfMonths: 3,
		  dateFormat: "yy-mm-dd"
        })
        .on( "change", function() {
          to.datepicker( "option", "minDate", getDate( this ) );
        }),
      to = $( "#endDate" ).datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 3,
		dateFormat: "yy-mm-dd"
      })
      .on( "change", function() {
        from.datepicker( "option", "maxDate", getDate( this ) );
      });
	  function getDate( element ) {
		var date;
		try {
		  date = $.datepicker.parseDate( dateFormat, element.value );
		} catch( error ) {
		  date = null;
		}
   
		return date;
	  }
	} );

// var carCaller = function(cityName){
// 	fetch("https://booking-com.p.rapidapi.com/v1/car-rental/locations?name=" + cityName + "&locale=en-gb", bookingOptions)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));
// }
var cityToId = function(cityName) {
	var destId 
	console.log(cityName);
	fetch('https://booking-com.p.rapidapi.com/v1/hotels/locations?locale=en-gb&name=' + cityName , bookingOptions)
	.then(response => {destId = response.json()})
	.then(response => console.log(response))
	.catch(err => console.error(err));
	return destId[0].dest_id
}

var carCaller = function(cityName) {
	fetch('https://booking-com.p.rapidapi.com/v1/car-rental/locations?name=' + cityName + '&locale=en-gb', bookingOptions)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
}

var hotelCaller = function(cityName, tripStart, tripEnd, partySize) {
	
	const destId = cityToId(cityName)
	fetch('https://booking-com.p.rapidapi.com/v1/hotels/search?checkout_date='+ tripEnd +'&units=metric&dest_id=' + destId + '&dest_type=city&locale=en-gb&adults_number='+ partySize +'&order_by=popularity&filter_by_currency=AED&checkin_date='+ tripStart + '&room_number=1&page_number=0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&include_adjacency=true', bookingOptions)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
	
}

var attractCaller = function(cityName, tripStart, tripEnd, partySize) {

	fetch('https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete?query=' + cityName + '&lang=en_US&units=km', travelOptions);
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
}


var searchHandler = function(cityName, tripStart, tripEnd, partySize){
    // carCaller(cityName);
	hotelCaller(cityName, tripStart, tripEnd, partySize);
	carCaller(cityName);
	attractCaller(cityName, tripStart, tripEnd, partySize);

	
	
};
// function isEmpty(val){
//     return ((val !== '') && (val !== undefined) && (val.length > 0) && (val !== null));
// !isEmpty($("#destination")) && !isEmpty($("#startDate")) && !isEmpty($( "#endDate" )) && !isEmpty($("#peopleCount").val) 
// }
$("#submit").on( "click", function(event){
	event.preventDefault();
	cityName = $("#destination").val();
	partySize = $("#peopleCount").val();
	tripStart = $("#startDate").val();
	tripEnd = $("#endDate").val();

	
	if (!cityName || !tripStart || !tripEnd || !partySize ) {
		UIkit.notification({
			message: "<span uk-icon='icon: warning'></span> Please complete the form before submitting",
			status: 'danger',
			pos: 'top-center',
			timeout: 5000
		});
		
	} else {
		searchHandler(cityName, tripStart, tripEnd, partySize);
	}
});

$("#peopleCount").keypress(function(event){
	if(event.keyCode == 13){
		$("#submit").click();
	}
})

var hotelCardBuilder = function(){

	for (var i = 0; i < 2; i++) {
		let grid = $("<div>").addClass("uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin");
		if (i = 1){
			let imageContainer = $("<div>").addClass("uk-flex-last@s uk-card-media-right uk-cover-container");
		} else {
			let imageContainer = $("<div>").addClass("uk-card-media-left uk-cover-container");
		}
		let img = $("<img>").attr("src", "") //insert attr from array for image here
		let canvas = $("<canvas>").attr({width:600, height:400})
		let textContainer = $("<div>")
		let textBody = $("<div>").addClass("uk-card-body")
		let locationTitle = $("<h3>").addClass("uk-card-title").attr("style" ,"color: #aa00ff").text();
		let paragraphContent = $("<p>").text("")

		textBody.append(locationTitle, paragraphContent);
		textContainer.append(textBody);

		grid.append(imageContainer, textContainer)
		$("#hotelList").append(grid)
}
}

var carCardBuilder = function(){
	for (var i = 0; i < 2; i++){
		let grid = $("<div>").addClass("uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin");
		if (i = 1){
			let imageContainer = $("<div>").addClass("uk-flex-last@s uk-card-media-right uk-cover-container");
		} else {
			let imageContainer = $("<div>").addClass("uk-card-media-left uk-cover-container");
		}
		let img = $("<img>").attr("src", "") //insert attr from array for image here
		let canvas = $("<canvas>").attr({width:600, height:400})
		let textContainer = $("<div>")
		let textBody = $("<div>").addClass("uk-card-body")
		let locationTitle = $("<h3>").addClass("uk-card-title").attr("style" ,"color: #aa00ff").text();
		let paragraphContent = $("<p>").text("")

		textBody.append(locationTitle, paragraphContent);
		textContainer.append(textBody);

		grid.append(imageContainer, textContainer)
		$("#carList").append(grid)
}
}

var attractCardBuilder = function(){
	for (var i = 0; i < 2; i++) {
		let grid = $("<div>").addClass("uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin");
		if (i = 1){
			let imageContainer = $("<div>").addClass("uk-flex-last@s uk-card-media-right uk-cover-container");
		} else {
			let imageContainer = $("<div>").addClass("uk-card-media-left uk-cover-container");
		}
		
		let img = $("<img>").attr("src", "") //insert attr from array for image here
		let canvas = $("<canvas>").attr({width:600, height:400})
		let textContainer = $("<div>")
		let textBody = $("<div>").addClass("uk-card-body")
		let locationTitle = $("<h3>").addClass("uk-card-title").attr("style" ,"color: #aa00ff").text();
		let paragraphContent = $("<p>").text("")

		textBody.append(locationTitle, paragraphContent);
		textContainer.append(textBody);

		grid.append(imageContainer, textContainer)
		$("#attractList").append(grid)
}
}

datePickerer();
//TODO:
//Form interactions
//dynamically create elements for destination
//add modals
//call api based on user inputs
