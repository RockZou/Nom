
function Menu_item(dataObj,index){
	
	this.dataObj=dataObj;
	this.dataObj.index=index;
	console.log('this is dataObj object:');
	console.log(this.dataObj);

	this.createDomElement = function(){
		var htmlString = '';
		htmlString += '<li>' + this.dataObj.name + ' : '  + this.dataObj.price;
		htmlString += '<button id=' + this.dataObj._rev + ' class="addButton">ADD</button>';
		htmlString += '<button id=' + this.dataObj._id + ' class="deleteButton">DELETE</button>';
		htmlString += '</li>';

		//console.log(htmlString);
		//Bind DOM events within the class
		var curObj = this;
		curObj.element = $(htmlString).appendTo('#theDataList');
		curObj.element.click(function(e){
			var theID = $(e.target).attr("id");
			if (theID == curObj.dataObj._rev){
				addFunction(curObj.dataObj);//addFunction specific to each page
			}
			else if (theID == curObj.dataObj._id){
				deleteFunction(curObj.dataObj);//deleteFunction specific to each page
			}
		});
	};
}

//send the data to the server then the server will send the data to DB
function getMenu(){
	
	$('#loading').html('data is loading');
	$('#loading').show();

	$.ajax({
		url:'/api_menu_all',
		type:'GET',
		dataType:'json',
		error: function(data){
			console.log("bad things happened at getMenu");
			console.log(data);
			$('#loading').html('Sorry things are wrong while sending to server...');
			$('#loading').show();
		},
		success: function(data){
			menu_items=data.map(function(d){
				return d.doc;
			});
			//console.log("Data came back from server");
			//console.log(menu_items);


			$('#dataContainer').html('<ul id="theDataList" style="list-style-type:none">');

			menu_items.forEach(function(d,i){
				var tempObj = new Menu_item(d,i);
				tempObj.createDomElement();
			});

			$('#theDataList').append('</ul>');

			$('#loading').hide();

		}
	});

}


function getCurrentOrderAmount(){
	var orders=[];
	$.ajax({
		url:'/api_orders_all',
		type:'GET',
		dataType:'json',
		error: function(data){
			console.log("bad things happened at getOrders");
			console.log(data);
			$('#loading').html('Sorry things are wrong while sending to server...');
			$('#loading').show();
		},
		success: function(data){
			console.log("Data came back from server");
			orders=data.map(function(d){
				return d.doc;
			});

			// console.log("orders are:");
			// console.log(orders);
			// console.log("one order is:");
			// console.log(orders[0]);

			var currentOrderAmount=0;
			orders.forEach(function(d,i){
				console.log('the order total is:');
				console.log(parseInt(d.orderTotal,10));
				currentOrderAmount+=parseInt(d.orderTotal,10);
			});
			console.log("currentOrderAmount is:");
			console.log(currentOrderAmount);
			$('#totalOrderAmount').html(currentOrderAmount);
		}
	});

}
