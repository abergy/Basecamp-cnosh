jsonData = "cnosh.json";

function load() {
	console.log('CNosh loaded');
	var request = new XMLHttpRequest();
	function transferComplete() {
			        var data = JSON.parse(this.responseText);
		};
	function transferFailed(evt) {
			console.log('Looks like there was a problem. Status Code: ' + request.status);
			addElementToDom("h1","error","Could not load configuration: " + request.status, {"style": "color:red"});
			return;
		};
	request.addEventListener("load", transferComplete);
	request.addEventListener("error", transferFailed);
	request.open("GET", jsonData);
	request.send();

};