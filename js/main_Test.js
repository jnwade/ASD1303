$('#home').on('pageinit', function(){
	//code needed for home page goes here

	
});	

$('#additem').on('pageinit', function(){


		var rlForm = $('#mainForm');
		    rlForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var data = rlForm.serializeArray();
			storeData(data);
			}

	
		});
   

	

 	//Toggles between data input mode and data view mode
 	var toggleControls = function(n) {
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
 	};
 	
 	var returnHome = function(){
	toggleControls('off');
};
 	
 	//Stores form data into Local Storage
	var storeData = function(data){
	//If there is no key, this means this is a brand new item and we need a new key
	if(!data.key){
		var id 					= Math.floor(Math.random()*1000001);
	}else{
		id = data.key;
	}
		var item 				= {};
			item.genres			= ["Genre:", data[0].value];
			item.songName		= ["Title:", data[1].value];
			item.artist			= ["Artist:", data[2].value];
			item.rating			= ["Rating:", data[3].value];
			item.notes			= ["Notes:", data[4].value];
			
		//Save data into Local Storage: Use "Stringify" to convert our objects to strings (Local storage can only store strings
		localStorage.setItem(id, JSON.stringify(item));
		location.reload();
		alert("Song Saved!"); 		
 	}; 	
 	
 	
 	//Retreives data from local storage
 	var getData = function(){
 		toggleControls("on");
 		if(localStorage.length === 0) {
	 		autoFillData();
	 		alert("Nothing has been saved yet so default data has been added.");
	 		
 		}
	 	//Write data from localStorage to the Browser
	 	var makeDiv = $("<div></div>");
	 	makeDiv.attr({"id" : "item"});
	 	var makeList = $("<ul></ul>");
	 	makeDiv.append(makeList);
	 	$("#mainForm").after(makeDiv);
	 	$("#item").css("display", "block");
	 	for(var i = 0, j = localStorage.length; i<j; i++){
		 	var makeLi = $("<li></li>");
		 	var linksLi = $("<li></li>");
		 	makeList.append(makeLi);
		 	var key = localStorage.key(i);
		 	var value = localStorage.getItem(key);
		 	// Here we are converting our localStorage string value back into an object using JSON.parse().
		 	var item = JSON.parse(value);
		 	var makeSubList = $("<ul></ul>");
		 	makeSubList.attr({"id" : "entry"});
		 	makeLi.append(makeSubList);
		 	getImage(item.genres[1], makeSubList);
		 	for(var n in item){
			 	var makeSubLi = $("<li></li>");
			 	makeSubList.append(makeSubLi);
			 	var dataInfo = item[n][0]+" "+item[n][1];
			 	makeSubLi.html(dataInfo);
			 	makeSubList.append(linksLi);
		 	}
		 	//Creates edit and delete links for each item submitted to local storage
		 	makeItemLinks(localStorage.key(i), linksLi); 	
	 	}	
 	}
 	
 	var getImage = function(genreName, makeSubList) {
	 	//Get the image for the right catagory that's being displayed.
	 	var imgLi = $("<li></li>");
	 	makeSubList.append(imgLi);
	 	var newImg = $('<img></img>');
	 	newImg.attr({"id" : "pic"});
	 	var setSource = newImg.attr({"src" : "img/"+ genreName + ".png"});
	 	imgLi.append(newImg);
 	}
 	var autoFillData = function() {
	 	//Actual json object data required for this to work is coming from our json.js file which is loaded from our HTML page.
	 	//Store json object into local storage.
	 	for(var n in json){
		 	var id = Math.floor(Math.random()*1000001);
		 	localStorage.setItem(id, JSON.stringify(json[n]));
	 	}
 	}
 	
 	//Make Item Links
 	//Creates the edit and delete links for each stored item when displayed
 	var makeItemLinks = function(key, linksLi) {
 		//Add edit single item link
	 	var editLink = $('<a></a>');
	 	editLink.attr({'href' : "#"});
	 	editLink.key = key;
	 	var editText = "Edit Song";
	 	editLink.on("click", editItem);
	 	editLink.attr({"id" : "editLink"});
	 	editLink.html(editText);
	 	linksLi.append(editLink);
	 	
	 	/*
//Add line break
	 	var breakTag = document.createElement('br');
	 	linksLi.appendChild(breakTag);
*/
	 	
	 	//Add delete single item link
	 	var deleteLink = $('<a></a>');
	 	deleteLink.attr({'href': '#'});
	 	deleteLink.key = key;
	 	var deleteText = "Delete Song";
	 	deleteLink.on("click", deleteItem);
	 	deleteLink.attr({"id" : "deleteLink"});
	 	deleteLink.html(deleteText);
	 	linksLi.append(deleteLink);
 	}
 	
 	var editItem = function() {
		//Grab the data for our items in Local Storage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//Show Form Field
		toggleControls("off");
		
		//Populate the form fields with current localStorage values.
		$("#genres").value = item.genres[1];
		$("#songName").value = item.songName[1];
		$("#artist").value = item.artist[1];
		$("#rating").value = item.rating[1];
		$("#notes").value = item.notes[1];
		
		//Remove the initial listener form the input 'save contact' button
		addSong.removeEventListener("click", storeData);
		//Change submit button value to say edit edit
		$("#submitButton").value = "Edit Song Info";
		var editSubmit = $("#submitButton");
		//Save the key value established in this function as a property of the editSubmit event
		//so we can use that value when we save the data we edited.
		editSubmit.on("click", validate);
		editSubmit.key = this.key;
		
 	}
 	
 	var deleteItem = function() {
	 	var ask = confirm("Delete Song?");
	 	if(ask) {
		 	localStorage.removeItem(this.key);
		 	location.reload();
	 	}else{
		 	alert("Whew, that was a close one!");
		 	
	 	}
 	}
 	
 	
 	
 	//Clears local storage
 	var clearLocal = function() {
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
 	$("#viewList").on("click", getData());
 	$("#clearList").on("click", clearLocal());
 	$("#submitButton").on("click", returnHome());
 	 	


});
	
