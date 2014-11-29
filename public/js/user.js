var menu_items;
var dataStatus;
var orderTotal=0;
var theOrder=[];

function addFunction(dataObj){
	orderTotal+=parseInt(dataObj.price,10);
	$('#orderTotal').html(orderTotal);
	theOrder.push(dataObj);
	console.log(theOrder);

	console.log('the order total is'+orderTotal);
	
	console.log("add #"+ dataObj.index+ "to user's cart");
}

function confirmFunciton(){

	$.ajax({
		url: '/save',
		type: 'POST',
		dataType: 'json',
		error: function(data){
			console.log(data);
			console.log("Oh No! Problem with posting the order to database!");
		},
		success: function(data){
			console.log("order posted to database!");
			console.log(data);
		}
	});
}

$(document).ready(function(){
	console.log("We are loaded");
	getMenu();
	$('#confirm_button').click(function(){
		confirmFunciton();
	});
});
