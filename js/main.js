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
	function storeData(key){
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
 	
 		//Toggles between data input mode and data view mode
 	function toggleControls(n) {
	 	switch(n){
		 	case "on":
		 		$("mainForm").css('display', 'none');
		 		$("clearList").css('display','inline');
		 		$("viewList").css('display', 'none');
		 		$("addNew").css('display','inline');
		 		break;
		 	case "off":
		 		$("mainForm").css('display', 'block');
		 		$("clearList").css('display','inline');
		 		$("viewList").css('display','inline');
		 		$("addNew").css('display', 'none');
		 		$("item").css('display', 'none');
		 		break;
		 	default:
		 		return false;
		 		
	 	}
 	}

	//Retreives data from local storage
	$("#viewList").on('click', function getData(){
 		toggleControls("on");
 		if(localStorage.length === 0) {
	 		autoFillData();
	 		alert("Nothing has been saved yet so default data has been added."); 		
 		}
	 	//Write data from localStorage to the Browser
	 	
	 	$('<div>').attr({'id' : 'item'}).appendTo('#requestList');
	 	$('<ul>').attr({'id' : 'makeList'}).appendTo('#item');
	 	$("#item").css('display', 'block');
	 		for(var i=0, j=localStorage.length; i<j; i++) {
		 		$('<li>').attr({'id' : 'makeLi'}).appendTo('#makeList');
		 		var key = localStorage.key(i);
		 		var value = localStorage.getItem(key);
		 		var item = JSON.parse(value);
		 		$('<ul>').attr({'id' : 'entry'}).appendTo('#makeLi');
		 		getImage(item.genres[1], $('#entry'));
		 		for(var n in item) {
			 		$('<li>').attr({'id' : 'makeSubLi'}).appentTo('#entry');
			 		var dataInfo = item[n][0]+" "+item[n][1];
			 		$('#makeSubLi').html(dataInfo);
			 		// Creating Edit and Delete Links
			 		$('<li>').attr({'id' : 'linksLi'}).appendTo('#entry');
			 		$('<a>').attr({'href' : '#','onclick' : 'deleteItem(' + key + ');'})
			 				.html('Delete Song').appendTo('#linksLi');
	 				$('<a>').attr({'href' : '#','onclick' : 'editItem(' + key + ');'})
			 				.html('Edit Song').appendTo('#linksLi');
	 				
			 		
		 		}
	 		}
	 		
	 	}
 	
 	function getImage(genreName, $('#entry')) {
	 	$('<li>').attr({'id' : 'imgLi'}).appendTo('#entry');
	 	$('<img>').attr({'id' : 'pic', 'src' : 'img/' + genreName + '.png'});
	 	$('#pic').appendTo('#imgLi');

 	}
 	
 	function autoFillData() {
	 	//Actual json object data required for this to work is coming from our json.js file which is loaded from our HTML page.
	 	//Store json object into local storage.
	 	for(var n in json){
		 	var id = Math.floor(Math.random()*1000001);
		 	localStorage.setItem(id, JSON.stringify(json[n]));
	 	}
 	}
 	
 	
 /*
	function editItem() {
		//Grab the data for our items in Local Storage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		//Populate the form fields with current localStorage values.
		$("#genres").value = item.genres[1];
		$("#songName").value = item.songName[1];
		$("#artist").value = item.artist[1];
		$("#rating").value = item.rating[1];
		$("#notes").value = item.notes[1];
		
		//Remove the initial listener form the input 'save contact' button
		addSong.removeEventListener("click", storeData);
		//Change submit button value to say edit
		$("#submitButton").value = "Edit Song Info";
		var editSubmit = $("#submitButton");
		//Save the key value established in this function as a property of the editSubmit event
		//so we can use that value when we save the data we edited.
		editSubmit.addEventListener("click", storeData);
		editSubmit.key = this.key;
		
 	}
 	
 	function deleteItem() {
	 	var ask = confirm("Delete Song?");
	 	if(ask) {
		 	localStorage.removeItem(this.key);
		 	window.location.reload();
	 	}else{
		 	alert("Whew, that was a close one!");
		 	
	 	} storeData(this.key);

 	}
 		
 		 	
 	
 	
 	//Clears local storage
 	function clearLocal() {
 		if(localStorage.length === 0) {
	 		alert("There is nothing to clear!");
 		}else{
	 		localStorage.clear();
	 		alert("All songs have been deleted.");
	 		window.location.reload();
	 		return false;
 		}
 	 }
	

	// Set Link & Submit Click Events
	$("form").submit(function() {
      if ($("#submitButton").val() == true) {
        alert("Song Saved!");
        return true;
      }
        alert("Nothing Saved").fadeOut(1000);
      return false;
    });
	
 	
 	
 	$("#clearList").click(function(){
	 	clearLocal();
 	});

 	$("#submitButton").click(function(){
	 	storeData();
 	});
*/
});

			

/*
var autofillData = function (){
	 
};

var getData = function(){

};


var	deleteItem = function (){
			
};
					
var clearLocal = function(){

};
*/
