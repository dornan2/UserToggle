console.log("content.js is being executed!");

chrome.runtime.onMessage.addListener(function(credentials, sender, sendResponse) {

    console.log("MESSAGE recieved: " + credentials.length);

    if(credentials.length == 1)
        logOut();
    else if(credentials.length == 2)
        signIn(credentials);

});


function logOut() {
    console.log('Inside logOut() about to press log-out button');


    document.getElementsByClassName('E2E-logout-btn')[0].click();
}


function signIn(credentials) {

    console.log('Inside signIn() about to press enter credentials');
    console.log("Username " + credentials[0]);
    console.log("Password " + credentials[1]);

    document.getElementById('username').value = credentials[0];
    document.getElementById('password').value = credentials[1];
    document.getElementsByClassName('E2E-login-btn')[0].click();
}
