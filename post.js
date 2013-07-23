var post = {

    settings : {
        baseUrl : "http://localhost/sect.tv/index.php/",
        destinationType : ""
    },
    // Application Constructor
    init: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        var sett = this.settings;
        //add event handler to the `submit` event for your login form
        $('#login_form').bind('submit', function () {
            console.log($(this).serialize());
            //send a post request to your web-service
            $.post(sett.baseUrl+'post/login', $(this).serialize(), function (response) {

                //parse the response string into an object
                response = $.parseJSON(response);
                
                //check if the authorization was successful or not
                if (response.status == 'success') {
                    $.mobile.changePage('#share', "slide");
                } else {
                    $.mobile.changePage('#index');
                }
            });
        });
    }
};
post.init();