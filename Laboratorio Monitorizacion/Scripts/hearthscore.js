'use strict'


    $('button').button();
    var healthScore;
    var polInterval;

    var getHealthScore = function() {
        $.ajax({
            type: "HEAD",
            url: "_layouts/15/blank.htm",
            success: function(data, status, xhr) {
                healthScore = xhr.getResponseHeader("X-SharePointHealthScore");
                $('#healthPara').text("Server health score: " + healthScore);
                $('#healthBar').progressbar("option", "value", parseInt(healthScore));
            }
        });
    };

    var startPolling = function(parameters) {
        $('#healthBar').progressbar({
            max: 10,
            value: 0
        });
        getHealthScore();
        polInterval = setInterval(getHealthScore, 5000);
    };

    var stopPolling = function() {
        clearInterval(polInterval);
        $('#healthPara').text("Click Start Polling to poll the server for health scores.");
        $('#healthBar').progressbar("destroy");

    };