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
		location.reload();
		alert("Song Saved!"); 		
 	}


 
 $('#viewList').on('click', function getData() {
 	
 		if(localStorage.length === 0) {
	 		autoFillData();
	 		alert("Nothing has been saved yet so default data has been added.");
	 		}
 
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
 	
 	
 	var autoFillData = function() {
	 	//Actual json object data required for this to work is coming from our json.js file which is loaded from our HTML page.
	 	//Store json object into local storage.
	 	for(var n in json){
		 	var id = Math.floor(Math.random()*1000001);
		 	localStorage.setItem(id, JSON.stringify(json[n]));
		 	
		 	
		 	
	 	}
	 	
 	}
 	
 	var editItem = function() {
		//Grab the data for our items in Local Storage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		var nGenre = item.genres[1],
			nsongName = item.songName[1],
			nArtist = item.artist[1],
			nRating = item.rating[1],
			nNotes = item.notes[1];
			
		//Populate the form fields with current localStorage values.
		$("#genres").val(nGenre); 
		$("#songName").val(nsongName);
		$("#artist").val(nArtist);
		$("#rating").val(nRating);
		$("#notes").val(nNotes);
	
		//Save the key value established in this function as a property of the editSubmit event
		//so we can use that value when we save the data we edited.
			localStorage.setItem(item);
			location.reload();
			alert("Song Saved!");
		};
		
		
 	




 	
/* editSubmit.key = this.key; */
 	
 
	 	
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 	//End of addItem Pageinit 
 	
});



