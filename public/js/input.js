var menu_items;
var htmlString;
var dataStatus;

function deleteFunction(dataObj){
	console.log(dataObj);
	//Make sure you want to delete
	var conf = confirm("Are you sure you want to delete '" + dataObj.user + " : " + dataObj.word + "' ?");
	if (!conf) return;

	$('#loading').html('deleting');
	$('#loading').show();
	//Proceed if confirm is true
	//$('#dataContainer').html('<div id="loading">Data is being deleted...</div>');
	$.ajax({
		url: '/delete',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(dataObj),
		error: function(resp){
			console.log("Oh no...");
			console.log(resp);
		},
		success: function(resp){
			console.log('Deleted!');
			console.log(resp);
			getMenu();
		}
	});
}


//send the data to the server then the server will send the data to DB
function sendToServer(theObj){

	dataStatus='sending to server';
	$('#loading').html(dataStatus);
	$('#loading').show();

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
			console.log("should show data here");
			getMenu();
		}
	});
}


$(document).ready(function(){
	console.log(message);

	dataStatus='loading data';
	$('#loading').html(dataStatus);
	$('#loading').show();
	getMenu();

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
