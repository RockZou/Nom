//Function to genrerate HTML string
function makeHTML(theData){
	var theHTML = '<ul>';
	theData.forEach(function(d){
		theHTML += '<li>' + d + '</li>';
	});
	theHTML += '</ul>';
	return theHTML;
}


//send the data to the server then the server will send the data to DB
function sendToServer(theObj){
	$.ajax({
		url:'/save',
		type:'POST',
		contentType: 'application/json',
		data: JSON.stringify(theObj),
		error: function(resp){
			console.log("bad things happened");
			console.log(resp);
		},
		success: function(resp){
			console.log("happiness");
			console.log(resp);
		}
	});
}


//wikipedia stuff
//Function to get data via the server's JSON route
function getAPIData(term){
	$.ajax({
		url: '/api/' + term,
		type: 'GET',
		dataType: 'json',
		error: function(data){
			console.log(data);
			alert("Oh No! Try a refresh?");
		},
		success: function(data){
			console.log("WooHoo!");
			console.log(data);
			var theHTML = makeHTML(data[1]);
			$('body').append(theHTML);
		}
	});
}


$(document).ready(function(){
	console.log(message);


	$('#enter').click(function(){
		console.log("Enter clicked");
		var name = $('#name').val();
		var price = $('#price').val();
		var obj = {
			name:name,
			price:price
		};

		console.log(obj);
		sendToServer(obj);
	});
});
