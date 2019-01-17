jsonData = "data.json";

function load() {
    console.log('CNosh loaded');
    var request = new XMLHttpRequest();

    function transferComplete() { var data = JSON.parse(this.responseText); };

    function transferFailed(evt) {
        console.log('Looks like there was a problem. Status Code: ' +
                    request.status);
        addElementToDom("h1", "error",
                        "Could not load configuration: " + request.status,
                        {"style" : "color:red"});
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

function getQueryFirstKey() {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    var pair = vars[0].split("=");
    if (pair)
        return pair[0];
    else
        return (false);
}

function collectConfiguration() {
    document.getElementById("WifiConfigured").value = "True";
    var configurationData = new FormData();
    configurationElements = document.body.querySelectorAll('*[data-config]');
    for (var i = configurationElements.length - 1; i >= 0; i--) {
        var configurationKey =
            configurationElements[i].getAttribute("data-config");
        var configurationValue = configurationElements[i].value;
        if (configurationElements[i].hasAttribute("required") &&
            configurationValue == "") {
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
        alert(
            "FEHLER! Die WLAN-Konfiguration konnte nicht abgeschlossen werden.");
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
        var configurationKey =
            configurationElements[i].getAttribute("feeding-config");
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
    configurationElements = document.body.querySelectorAll('*[rfid-config]');
    let queryFirstKey = getQueryFirstKey();
    for (var i = configurationElements.length - 1; i >= 0; i--) {
        var configurationKey =
            configurationElements[i].getAttribute("rfid-config");
        var configurationValue = configurationElements[i].value;
        configurationData.append(configurationKey, configurationValue);
    }

    if (queryFirstKey === "c1_uid" || queryFirstKey === "c2_uid" ||
        queryFirstKey === "c3_uid") {
        var request = new XMLHttpRequest();
        request.addEventListener("load", transferComplete);
        request.addEventListener("error", transferFailed);
        request.open("POST", "/set_rfid");
        console.log("Sending rfid");
        request.send(configurationData);

        function transferFailed() {
            alert(
                "Es ist ein Fehler aufgetreten, bitte versuchen Sie es erneut.");
        }

        function transferComplete() {
            alert("Die Katze wurde erfolgreich registriert.");
        };
    }
}

function collect_cat_amount() {
    var configurationData = new FormData();
	configurationElements = document.body.querySelectorAll('*[amount-config]');
    let queryFirstKey = getQueryFirstKey();
    for (var i = configurationElements.length - 1; i >= 0; i--) {
        var configurationKey =
            configurationElements[i].getAttribute("amount-config");
        var configurationValue = configurationElements[i].value;
        configurationData.append(configurationKey, configurationValue);
	}

        if (queryFirstKey === "c1_extra_amount_number" ||
            queryFirstKey === "c2_extra_amount_numberd" ||
            queryFirstKey === "c3_extra_amount_number") {
            var request = new XMLHttpRequest();
            request.addEventListener("load", transferComplete);
            request.addEventListener("error", transferFailed);
            request.open("POST", "/set_amount");
            console.log("Sending amount");
            request.send(configurationData);

            function transferFailed() {
                alert(
                    "Es ist ein Fehler aufgetreten, bitte versuchen Sie es erneut.");
            }

            function transferComplete() {
                alert("Die Futtermenge wurde erfolgreich gespeichert.");
            };
        }
}

function collect_cat_name() {
    var configurationData = new FormData();
    configurationElements = document.body.querySelectorAll('*[name-config]');
    let queryFirstKey = getQueryFirstKey();
    var value = document.getElementById('cat_name').value;
    if (value && value !== '') {
        configurationData.append(queryFirstKey, value);
    }

    if (queryFirstKey === "c1_name" || queryFirstKey === "c2_name" ||
        queryFirstKey === "c3_name") {
        var request = new XMLHttpRequest();
        request.addEventListener("load", transferComplete);
        request.addEventListener("error", transferFailed);
        request.open("POST", "/add_cat");
        console.log("Sending cat name");
        request.send(configurationData);

        function transferFailed() {
            alert(
                "Es ist ein Fehler aufgetreten, bitte versuchen Sie es erneut.");
        }

        function transferComplete() {
            alert("Katze wurde erfolgreich hinzugefügt.");
        };
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

function delete_cat(key) {
    if (key === "c1_uid" || key === "c2_uid" || key === "c3_uid") {
        var configurationData = new FormData();
        var configurationKey = key;
        var configurationValue = "temp";
        configurationData.append(configurationKey, configurationValue);

        var request = new XMLHttpRequest();
        request.addEventListener("load", transferComplete);
        request.addEventListener("error", transferFailed);
        request.open("POST", "/delete_cat");
        console.log("Sending delete");
        request.send(configurationData);

        function transferFailed() {
            alert(
                "Es ist ein Fehler aufgetreten, bitte versuchen Sie es erneut.");
        }

        function transferComplete() {
            alert("Die Katze wurde erfolgreich gelöscht.");
        };
    }
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
        if (request.status == 200) {
            let response = JSON.parse(request.responseText);
            let input = document.getElementById('rfid');
            input.setAttribute("value", response['uid']);
        }
    };
}