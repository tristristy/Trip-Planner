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

var carCaller = function(cityName){
	fetch("https://booking-com.p.rapidapi.com/v1/car-rental/locations?name=" + cityName + "locale=en-gb", bookingOptions)
	.then(response => carResponse.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
}

var hotelCaller = function(cityName, tripStart, tripEnd, partySize) {
	
}

var attractCaller = function(cityName, tripStart, tripEnd, partySize) {

}


var searchHandler = function(cityName, tripStart, tripEnd, partySize){
    
	
	
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


datePickerer();
//TODO:
//Form interactions
//dynamically create elements for destination
//add modals
//call api based on user inputs

