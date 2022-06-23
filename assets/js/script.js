
var cityName = ""
var tripStart = ""
var tripEnd = ""
var tripLength = ""
var partySize = ""
var dropDownOptions = ""
var pastTrips = []
const des = {
	rentals:'' ,
	hotels:'' ,
}


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

	var cityToId = async function(cityName) {
		const response = await fetch('https://booking-com.p.rapidapi.com/v1/hotels/locations?locale=en-gb&name=' + cityName , bookingOptions);
		return response.json();
	}

	var carCaller = async function(cityName) {
		const response = await fetch('https://booking-com.p.rapidapi.com/v1/car-rental/locations?name=' + cityName + '&locale=en-gb', bookingOptions);
	   
	   return response.json();
   }

   var hotelCaller = async function(cityName, tripStart, tripEnd, partySize, place) {
	const response = await fetch('https://booking-com.p.rapidapi.com/v1/hotels/search?checkout_date='+ tripEnd +'&units=metric&dest_id=' + place + '&dest_type=city&locale=en-gb&adults_number='+ partySize +'&order_by=popularity&filter_by_currency=AED&checkin_date='+ tripStart + '&room_number=1&page_number=0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&include_adjacency=true', bookingOptions)
 	return response.json();
}

var searchHandler = async function(cityName, tripStart, tripEnd, partySize){
    const dest = await cityToId(cityName);
    const place = dest[0].dest_id;
    des.hotels = await hotelCaller(cityName, tripStart, tripEnd, partySize, place);
    des.rentals = await carCaller(cityName);

	window.location.href = "searchpage.html"

	hotelCardBuilder(des.hotels);
	carCardBuilder(des.rentals);
}
$("#submit").on( "click", function(event){
	event.preventDefault();
	let location = {
		city:'',
		party:'',
		start:'',
		end:''
	}
	
	localStorage.removeItem("searchterm")
	
	location.city = $("#destination").val();
	location.party = $("#peopleCount").val();
	location.start = $("#startDate").val();
	location.end = $("#endDate").val();

	

	
	if (!location.city || !location.start || !location.end || !location.party ) {
		UIkit.notification({
			message: "<span uk-icon='icon: warning'></span> Please complete the form before submitting",
			status: 'danger',
			pos: 'top-center',
			timeout: 5000
		});
		
	} else {
	localStorage.setItem("searchterm" ,JSON.stringify(location));
	localStorage.setItem("recent-searches" , location)
	window.location.href = "searchpage.html"
	}
});


$("#peopleCount").keypress(function(event){
	if(event.keyCode == 13){
		$("#submit").click();
	}
})

var hotelCardBuilder = function(hotels){
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
		$("#hotel-list").append(grid)
}
}

var carCardBuilder = function(car){
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
		$("#car-list").append(grid)
}
}

// var attractCardBuilder = function(){
// 	for (var i = 0; i < 2; i++) {
// 		let grid = $("<div>").addClass("uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin");
// 		if (i = 1){
// 			let imageContainer = $("<div>").addClass("uk-flex-last@s uk-card-media-right uk-cover-container");
// 		} else {
// 			let imageContainer = $("<div>").addClass("uk-card-media-left uk-cover-container");
// 		}
		
// 		let img = $("<img>").attr("src", "") //insert attr from array for image here
// 		let canvas = $("<canvas>").attr({width:600, height:400})
// 		let textContainer = $("<div>")
// 		let textBody = $("<div>").addClass("uk-card-body")
// 		let locationTitle = $("<h3>").addClass("uk-card-title").attr("style" ,"color: #aa00ff").text();
// 		let paragraphContent = $("<p>").text("")

// 		textBody.append(locationTitle, paragraphContent);
// 		textContainer.append(textBody);

// 		grid.append(imageContainer, textContainer)
// 		$("#attractList").append(grid)
// }
// }

datePickerer();

//TODO:
//Form interactions
//dynamically create elements for destination
//add modals
//call api based on user inputs
