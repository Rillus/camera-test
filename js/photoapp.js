var photoApp = {

    settings : {
        pictureSource : "",
        destinationType : ""
    },
    // Application Constructor
    init: function() {
        this.bindEvents();
    },
    // Bind Event Listeners

    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        var photoApp = this;
        document.addEventListener('deviceready', photoApp.onDeviceReady, false);
        $(document).on('click', '#getPhoto', function(event) {
            photoApp.getPhoto(photoApp.settings.pictureSource.SAVEDPHOTOALBUM);
        });
        $(document).on('click', '#capturePhoto', function(event) {
            photoApp.capturePhoto();
        });
        $(document).on('click', '#uploadPhoto', function(event) {
            photoApp.uploadPhoto();
        });
    },
    // deviceready Event Handler

    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        var appSettings = photoApp.settings;
        console.log (appSettings);
        appSettings.pictureSource = navigator.camera.PictureSourceType;
        appSettings.destinationType = navigator.camera.DestinationType;
        console.log(navigator.camera.DestinationType);
    },
    onPhotoDataSuccess: function(imageData) {
        // Uncomment to view the base64-encoded image data
        // console.log(imageData);

        // Get image handle
        var smallImage = document.getElementById('smallImage');

        // Unhide image elements
        smallImage.style.display = 'block';

        // Show the captured photo
        // The inline CSS rules are used to resize the image
        smallImage.src = "data:image/jpeg;base64," + imageData;
    },
    
    // Called when a photo is successfully retrieved
    onPhotoURISuccess: function(imageURI) {
        // Uncomment to view the image file URI
        // console.log(imageURI);

        // Get image handle
        var smallImage = document.getElementById('smallImage');

        // Unhide image elements
        smallImage.style.display = 'block';

        // Show the captured photo
        // The inline CSS rules are used to resize the image
        smallImage.src = imageURI;
    },
    
    // A button will call this function
    capturePhoto: function () {
        // Take picture using device camera and retrieve image as base64-encoded string
        navigator.camera.getPicture(photoApp.onPhotoDataSuccess, photoApp.onFail, { quality: 50,
            destinationType: this.settings.destinationType.DATA_URL });
    },
    
    // A button will call this function
    getPhoto: function(source) {
        // Retrieve image file location from specified source
        navigator.camera.getPicture(photoApp.onPhotoURISuccess, photoApp.onFail, { quality: 50,
            destinationType: photoApp.settings.destinationType.FILE_URI,
            sourceType: source });
    },
    
    // Called if something bad happens.
    onFail: function (message) {
        alert('Failed because: ' + message);
    },

    uploadPhoto: function (imageURI) {
        var options = new FileUploadOptions(),
            photoApp = this;
        options.fileKey="file";
        options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType="image/jpeg";

        var params = {};
        params.value1 = "test";
        params.value2 = "param";

        options.params = params;

        var ft = new FileTransfer();
        ft.upload(imageURI, encodeURI(post.settings.baseUrl+'post/image'), photoApp.win, photoApp.fail, options);
    },

    win: function(r) {
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
    },

    fail: function(error) {
        alert("An error has occurred: Code = " + error.code);
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
    }
};
photoApp.init();
console.log(photoApp);