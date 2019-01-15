jsonData = "data.json";

function load() {
	console.log('CNosh loaded');
	var request = new XMLHttpRequest();

	function transferComplete() {
		var data = JSON.parse(this.responseText);
	};

	function transferFailed(evt) {
		console.log('Looks like there was a problem. Status Code: ' + request.status);
		addElementToDom("h1", "error", "Could not load configuration: " + request.status, {
			"style": "color:red"
		});
		return;
	};
	request.addEventListener("load", transferComplete);
	request.addEventListener("error", transferFailed);
	request.open("GET", jsonData);
	request.send();

};

function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
			return pair[1];
		}
	}
	return (false);
}

function collectConfiguration() {
	document.getElementById("WifiConfigured").value = "True";
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

	function transferFailed() {
		alert("FEHLER! Die WLAN-Konfiguration konnte nicht abgeschlossen werden.");
	}

	function transferComplete() {
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

function collect_rfid() {
	var configurationData = new FormData();

	if (getQueryVariable("c1_uid")) {
		configurationData.append("c1_uid", getQueryVariable("c1_uid"));
	}
	if (getQueryVariable("c2_uid")) {
		configurationData.append("c2_uid", getQueryVariable("c2_uid"));
	}
	if (getQueryVariable("c3_uid")) {
		configurationData.append("c3_uid", getQueryVariable("c3_uid"));
	}
	if (getQueryVariable("c4_uid")) {
		configurationData.append("c4_uid", getQueryVariable("c4_uid"));
	}

	if (getQueryVariable("c1_uid") || getQueryVariable("c2_uid") || getQueryVariable("c3_uid") || getQueryVariable("c4_uid")) {
		var request = new XMLHttpRequest();
		request.addEventListener("load", transferComplete);
		request.addEventListener("error", transferFailed);
		request.open("POST", "/set_rfid");
		console.log("Sending rfid");
		request.send(configurationData);

		function transferFailed() {
			alert("Es ist ein Fehler aufgetreten, bitte versuchen Sie es erneut.");
		}

		function transferComplete() {
			alert("Die Katze wurde erfolgreich registriert.");
		};
	}
}


function collect_cat_amount() {
	var configurationData = new FormData();

	configurationElements = document.body.querySelectorAll('*[amount-config]');
	for (var i = configurationElements.length - 1; i >= 0; i--) {
		var configurationKey = configurationElements[i].getAttribute("amount-config");
		var configurationValue = configurationElements[i].value;
		configurationData.append(configurationKey, configurationValue);

		if (getQueryVariable("c1_uid")) {
			configurationData.append("c1_uid", getQueryVariable("c1_uid"));
		}
		if (getQueryVariable("c2_uid")) {
			configurationData.append("c2_uid", getQueryVariable("c2_uid"));
		}
		if (getQueryVariable("c3_uid")) {
			configurationData.append("c3_uid", getQueryVariable("c3_uid"));
		}
		if (getQueryVariable("c4_uid")) {
			configurationData.append("c4_uid", getQueryVariable("c4_uid"));
		}

		if (getQueryVariable("c1_uid") || getQueryVariable("c2_uid") || getQueryVariable("c3_uid") || getQueryVariable("c4_uid")) {
			var request = new XMLHttpRequest();
			request.addEventListener("load", transferComplete);
			request.addEventListener("error", transferFailed);
			request.open("POST", "/set_amount");
			console.log("Sending amount");
			request.send(configurationData);

			function transferFailed() {
				alert("Es ist ein Fehler aufgetreten, bitte versuchen Sie es erneut.");
			}

			function transferComplete() {
				alert("Die Futtermenge wurde erfolgreich gespeichert.");
			};
		}
	}
}

function reset_system() {
	var request = new XMLHttpRequest();
	request.addEventListener("load", transferComplete);
	request.addEventListener("error", transferFailed);
	request.open("POST", "/reset_system");
	console.log("reset system");
	request.send();
	function transferFailed() {
		alert("Es ist ein Fehler aufgetreten, bitte versuchen Sie es erneut.");
	}

	function transferComplete() {
		alert("System wurde erfolgreich zurückgesetzt. CNosh startet neu.");
        };
}

function reset_statistics() {
	var request = new XMLHttpRequest();
	request.addEventListener("load", transferComplete);
	request.addEventListener("error", transferFailed);
	request.open("POST", "/reset_statistics");
	console.log("reset statistics");
	request.send();
	function transferFailed() {
		alert("Es ist ein Fehler aufgetreten, bitte versuchen Sie es erneut.");
	}

	function transferComplete() {
		alert("Statisticen wurden erfolgreich zurückgesetzt.");
	};
}

function delete_cat(uid) {
	var request = new XMLHttpRequest();
	request.addEventListener("load", transferComplete);
	request.addEventListener("error", transferFailed);
	request.open("POST", '/delete_cat');
	console.log('Katze mit der UID: ' + uid + ' wurde gelöscht.');

	function transferFailed() {
		alert("Es ist ein Fehler aufgetreten, bitte versuchen Sie es erneut.");
	}

	function transferComplete() {
		alert('Katze mit der UID' + uid + 'gelöscht.');
	};
}

function search_rfid() {
	var request = new XMLHttpRequest();
	request.addEventListener("load", transferComplete);
	request.addEventListener("error", transferFailed);
	request.open("POST", '/search_rfid');
	console.log('Searching rfid.');
	request.send();
	function transferFailed() {
		alert("Es ist ein Fehler aufgetreten, bitte versuchen Sie es erneut.");
	}

	function transferComplete() {
		//alert('Katze mit der UID' + uid + 'gelöscht.');
		console.log("RFID gefunden");
	};
}