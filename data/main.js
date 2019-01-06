jsonData = "data.json";

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

function collectConfiguration() {
	document.getElementById("WifiConfigured").value="True";
	var configurationData = new FormData();
	configurationElements = document.body.querySelectorAll('*[data-config]');
	for (var i = configurationElements.length - 1; i >= 0; i--) {
		var configurationKey = configurationElements[i].getAttribute("data-config");
		var configurationValue = configurationElements[i].value;
		if (configurationElements[i].hasAttribute("required") && configurationValue == "") {
			alert("Please fill out all required values");
			return;
		}
		if (configurationValue.length > 0 && configurationKey.length > 0) {
			configurationData.append(configurationKey, configurationValue);
		}
	}
	var request = new XMLHttpRequest();
	request.addEventListener("load", transferComplete);
	request.addEventListener("error", transferFailed);
	request.open("POST", "/submitconfig");
	console.log("Sending configuration");
	request.send(configurationData);
	function transferFailed(){
		alert("FEHLER! Die WLAN-Konfiguration konnte nicht abgeschlossen werden.");
	}
	function transferComplete(){
		alert("WLAN-Konfiguration erfolgreich. CNosh startet neu.");
	};

}

function collect_feedingtimes() {
	console.log('Button pressed');
	var configurationData = new FormData();
	configurationElements = document.body.querySelectorAll('*[feeding-config]');
	for (var i = configurationElements.length - 1; i >= 0; i--) {
	  var configurationKey = configurationElements[i].getAttribute("feeding-config");
	  var configurationValue = configurationElements[i].value;
	  configurationData.append(configurationKey, configurationValue);
	}
	var request = new XMLHttpRequest();
	request.addEventListener("load", transferComplete);
	request.addEventListener("error", transferFailed);
	request.open("POST", "/submitfeedingtime");
	console.log("Sending feedingtimes");
	request.send(configurationData);
	function transferFailed() {
	  alert("Es ist ein Fehler aufgetreten, bitte versuchen Sie es erneut.");
	}
	function transferComplete() {
	  alert("Die Futterzeiten wurden erfolgreich gespeichert.");
	};
}