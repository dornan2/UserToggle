console.log("popup.js");

chrome.tabs.getSelected(null, function(tab) {
   document.getElementById('currentLink').innerHTML = tab.url;
   console.log("Current link is: " + tab.url);

 });




 // chrome.tabs.query({
 //     "currentWindow": true,//Filters tabs in current window
 //     "status": "complete", //The Page is completely loaded
 //     "active": true // The tab or web page is browsed at this state,
 //     "windowType": "normal" // Filters normal web pages, eliminates g-talk notifications etc
 // }, function (tabs) {//It returns an array
 //     for (tab in tabs) {
 //         $('#url').val(tabs[tab].url);
 //         $('#title').val(tabs[tab].title);
 //         $loader.hide();
 //     }
 // });




document.addEventListener('DOMContentLoaded', function() {

    console.log("Listening...");

    //Unverified User
    var unverifiedBtn = document.getElementById('unverifiedBtn');
    unverifiedBtn.addEventListener('click', function() {
        console.log("Unverified button clicked");
        loggedIn().then(function(isLoggedValue){
            console.log("Are you logged in?: " + isLoggedValue);
            if(isLoggedValue){
                logOut().then(function(){
                    console.log('log out is done so can now call sign in.');
                    signIn('adrian.dornan@live.ie', 'nitrocloud');
                })
            }
            else{
                console.log('not logged in so can safely sign in');
                signIn('adrian.dornan@live.ie', 'nitrocloud');
            }
        })



        // !!!!!!!!!!SIGN IN KICKING OFF BEFORE LOGGED OUT RAN!!!!!!!!!!
        // signIn('adrian.dornan@live.ie', 'nitrocloud');
    });

    // //Verified User
    // var verifiedBtn = document.getElementById('verifiedBtn');
    // unverifiedBtn.addEventListener('click', function() {
    //     loggedIn().then(function(isLoggedValue){
    //         console.log("Are you logged in?: " + isLoggedValue);
    //         if(isLoggedValue)
    //             logOut();
    //     })
    //
    //     signIn('adrian.dornan@gmail.com', 'PASSWORD');
    // });
});

function signIn(username, password) {

    console.log("signing in...");

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var tabsID = tabs[0].id;
        var credentials = [username, password];

        chrome.tabs.executeScript(tabsID, {file: 'content.js'}, function() {
            chrome.tabs.sendMessage(tabsID, credentials);
        });
    });
}

function loggedIn() {

    console.log("Checking to see if user is logged in");

    return new Promise(
        function(resolve, reject) {
            chrome.tabs.getSelected(null, function(tab) {
                var isLoggedIn;
                var url = tab.url;

                if(url.substr(0, 36) == 'https://cloud.gonitro.com/documents/' ||
                url.substr(0, 30) == 'https://cloud.gonitro.com/documents/') {
                    isLoggedIn = true;
                }
                else {
                    isLoggedIn = false;
                }
                resolve(isLoggedIn);
            });
        }
    );
}

function logOut() {

    console.log("Logging user out");

    return new Promise(
        function(resolve, reject) {

            chrome.tabs.query({active: true, currentWindow: true},
                function(tabs){
                var tabsID = tabs[0].id;
                var credentials = ['True'];

                chrome.tabs.executeScript(tabsID, {file: 'content.js'}, function() {
                    chrome.tabs.sendMessage(tabsID, credentials);

                    var urlTab;

                    chrome.tabs.getSelected(null, function(tab) {
                       document.getElementById('currentLink').innerHTML = tab.url;

                       urlTab = tab.url;
                       console.log("1. Current link is: " + tab.url);


                       console.log("OUTSIDE FUNCTION Current link is: " + urlTab);

                       while(urlTab.substr(0, 30) != 'https://sso.gonitro.com/login?'){
                           console.log('inside while loop');
                           chrome.tabs.getSelected(null, function(tab) {
                              document.getElementById('currentLink').innerHTML = tab.url;
                              console.log("Current link is: " + tab.url);
                              urlTab = tab.url;

                            });

                            console.log("Current link is: " + urlTab);
                       }
                       console.log("2. Current link is: " + tab.url);
                       console.log("3. Excited out of group");

                    });

                    resolve();

                });
            });
        }
    );
}
