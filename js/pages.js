//This script contains page-specific things
$(document).bind('pagechange', function(event){
    var currentPage = $.mobile.activePage.attr('id');

    if (currentPage == "index"){
        post.checkLogin();
    }
});