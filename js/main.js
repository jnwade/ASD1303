$('#home').on('pageinit', function(){
	//code needed for home page goes here

	
});	

$('#additem').on('pageinit', function(){


		var rlForm = $('#mainForm');
		    rlForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var key = rlForm.serializeArray();
			storeData(key);
			}

	
		});

	//Stores form data into Local Storage
	var storeData = function(data, key){
	//If there is no key, this means this is a brand new item and we need a new key
	if(!key){
		var id 					= Math.floor(Math.random()*1000001);
	}else{
		id = key;
	}
		var item 				= {};
			item.genres			= ["Genre:", $("#genres").val()];
			item.songName		= ["Title:", $("#songName").val()];
			item.artist			= ["Artist:", $("#artist").val()];
			item.rating			= ["Rating:", $("#rating").val()];
			item.notes			= ["Notes:", $("#notes").val()];
			
		//Save data into Local Storage: Use "Stringify" to convert our objects to strings (Local storage can only store strings
		localStorage.setItem(id, JSON.stringify(item));
		alert("Song Saved!"); 		
 	}


 
 $('#viewList').on('click', function getData() {
 
		 	$('<ul>').attr({'class' : 'formObj', 'data-role' : 'listview'}).appendTo('#listView');
		 	for(var i = 0, j = localStorage.length; i <j; i++) {
			 	var data = localStorage.key(i);
			 	var list = localStorage.getItem(data);
			 	var jsonObject = JSON.parse(list);
			 		
			 	for(var n in jsonObject){
			 	var dataInfo = jsonObject[n][0]+" "+jsonObject[n][1];
			 	$('<li>' + dataInfo + '</li>').appendTo('.formObj');
		 	} 
		}
	 		
	 		makeLinks(data);
		
		});
 	
 var makeLinks = function(data){
 	
 		$('<ul>').attr({'id' : 'linksLi',}).appendTo('#editNav');
	 	
	 		$('<li>').attr({'id' : 'dataLink1'}).appendTo('#linksLi');
				$('<input>').attr({'type' : 'submit',
								   'value' : 'Delete',
								   'data-icon' : "plus",
								   'data-theme' : "a",
								   'onclick' : 'deleteItem(' + data + ');'})
								   .appendTo('#dataLink1');
			$('<li>').attr({'id' : 'dataLink2'}).appendTo('#linksLi');					   
			    $('<input>').attr({'type' : 'submit',
								   'value' : 'Edit',
								   'data-icon' : "edit",
								   'data-theme' : "b",
								   'onclick' : 'editItem(' + data + ');'})
								   .appendTo('#dataLink2');

			
 	};
 	
 	
 	


 	

 	
 
	 	
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 	//End of addItem Pageinit 
 	
});



