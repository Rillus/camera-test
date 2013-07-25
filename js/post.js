var post = {

    settings : {
        baseUrl : "http://sect.tv/index.php/",
        username : "",
        userId : "",
        errorMsg : ""
    },
    // Application Constructor
    init: function() {
        this.bindEvents();
        this.errorCheck();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        var sett = this.settings,
            post = this;

        //add event handler to the `submit` event for your login form
        $(document).on('submit', 'form', function(event) {
            event.preventDefault();
            validateAll();

            if ($('.alert').length == 0){
                //send a post request to the web-service
                var formAction = $(this).data('action');
                console.log(formAction);
                post.postData(sett.baseUrl+formAction, $(this).serialize());
            }
        }, event);
    },
    postData: function(url, data){
        var sett = this.settings,
            post = this;
        
        console.log('posting', data)
        
        $.post(url, data, function (response) {
            //parse the response string into an object
            response = $.parseJSON(response);

            console.log('received resposne', response);

            //check if the authorization was successful or not
            if (response.status == 'success') {
                sett.username = response.username;
                sett.userId = response.userid;
                sett.errorMsg = "";
                
                $.mobile.changePage('#share', "slide");
            } else if (response.status == 'fail') {
                $.mobile.changePage('#index');
                post.errorCheck("Bad username/password combo.");
            } else {
                post.errorCheck("An unspecified error occurred. Sorry I can't be more useful.");
            }
        });

    },
    errorCheck: function(message) {
        var sett = this.settings;

        sett.errorMsg = message;

        if (message != ""){
            $('.errorHolder').html(message);
        }
    },
    checkLogin: function(){
        var sett = this.settings
            data = "";
        $.post(sett.baseUrl+'post/checklogin', data, function (response) {
            response = $.parseJSON(response);
            console.log(response);
            //check if the authorization was successful or not
            if (response.status == 'success') {
                $.mobile.changePage('#share', "slide");
            }
        });
    }
};
post.init();