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
const cat = localStorage.getItem('searchterm')
const location = JSON.parse(localStorage.getItem('searchterm'))
console.log(location)
const des = {
	rentals:'' ,
	hotels:'' ,
}


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

searchHandler()