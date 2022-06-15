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
var tripDate = ""
var tripLength = ""
var partySize = ""
var dropDownOptions = ""
var pastTrips = []


var searchHandler = function(){
    var searchTerm = ""

    switch(dropDownOptions){
        case Hotel:

            break;
        case carRental:
			
            break;
        case attractions:
			
            break;
    }
};

//TODO:
//Form interactions
//dynamically create elements for destination
//add modals
//call api based on user inputs