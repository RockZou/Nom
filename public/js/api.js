
/*
function foodSearch(){

	var foodURL="https://www.kimonolabs.com/api/2s22kqm8?apikey=zCUC8nH4XcYSSme7P7RcWQq07Ekb2AFB";
	$.ajax({
		url:"/../menu.json",
		type:'GET',
		dataType:'json',
		error:function(data){
			console.log("something went wrong...");
		},
		success:function(data){
			console.log("HOORAY!");

			console.log(data["results"]["collection1"]);
			var theSearchResults=data["results"]["collection1"];

			var theResultsString='<div class="row">';

			for (var i=0;i<theSearchResults.length;i++)
			{
				theResultsString+="<div class='col-md-4'>"+theSearchResults[i]["item"]+"</div>";
			}
			theResultsString+='</div>';
			$("#theResults").append(theResultsString);
		}
	});

}
*/

var menu_items;
var htmlString;

//Function to genrerate HTML string
function makeHTML(theData){
	var theHTML = '<div id="menu_items"><ul>';
	for(var i=0;i<theData.length;i++){
		theHTML += '<li>' + 'Name:'+ theData[i].doc.name+'  Price:'+ theData[i].doc.price + '</li>';
	}
	theHTML += '</ul></div>';
	return theHTML;
}

//send the data to the server then the server will send the data to DB
function getMenu(theObj){
	

	$.ajax({
		url:'/menu',
		type:'GET',
		dataType:'json',
		error: function(data){
			console.log("bad things happened");
			console.log(data);
		},
		success: function(data){
			console.log("happiness");

			menu_items=data;
			console.log(menu_items);

			htmlString = makeHTML(menu_items);

			console.log(htmlString);	
			$('body').append(htmlString);
		}
	});


}

$(document).ready(function(){
	console.log("We are loaded");
	console.log(menu_items);
	getMenu();
});


/*
function theFade(){
    var quotes = $(".quotes");
    var quoteIndex = -1;
    var theWords=['Samurai','Beijing Restaurant','Foodlands'];
	function nextFade(){
		++quoteIndex;
		console.log(quoteIndex);
        quotes.text(theWords[quoteIndex%3])
            .fadeIn(500)
            .fadeOut(500,nextFade);
        
    }
    nextFade();
}
*/