var menu_items;
var dataStatus;
var orderTotal=0;
var theOrder=[];


/*******
HOW TO SEND AN ARRAY OF JSON OBJECTS TO THE SERVER?
******/

function addFunction(dataObj){
	orderTotal+=parseInt(dataObj.price,10);
	$('#orderTotal').html(orderTotal);
	theOrder.push(dataObj);

	/**********
	temporary solution
	***********/

	//add an order object on the server
	$.ajax({
		url: '/order_add',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(dataObj),
		error: function(data){
			console.log(data);
			console.log("Oh No! Problem with posting the order to database!");
		},
		success: function(data){
			console.log("order posted to database!");
			console.log(data);
		}
	});

	/********
	end	tmeporary solution
	*********/

//	console.log(JSON.stringify(theOrder));

	console.log('the order total is'+orderTotal);
	
	console.log("add #"+ dataObj.index+ "to user's cart");
}

function confirmFunciton(){

	$.ajax({
		url: '/order_confirm',
		type: 'POST',
		contentType: 'application/json',
		error: function(data){
			console.log(data);
			console.log("Oh No! Problem with posting the order to database!");
		},
		success: function(data){
			console.log("order posted to database!");
			console.log(data);
			getCurrentOrderAmount();
			theOrder=[];
			orderTotal=0;
			$('#orderTotal').html('0');
		}
	});
}

$(document).ready(function(){
	console.log("We are loaded");
	getCurrentOrderAmount();
	getMenu();
	$('#confirm_button').click(function(){
		confirmFunciton();
	});
});
