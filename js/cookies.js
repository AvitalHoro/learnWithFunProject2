//js code for the cookies

// Function to set a cookie
function setCookie(name, value, minutes) {
    var expires = "";
    if (minutes) {
        var date = new Date();
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Get the value of a cookie by name
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// check for inactivity and delete the session cookie
function checkInactivity() {
    var inactivityTimeout = setTimeout(function () {
        deleteCookie("user_session"); // Delete the cookie
        localStorage.setItem('isConnected',false);
    }, 0.5 * 60 * 1000);

    // reset the session cookie whenever there's user activity
    document.addEventListener("mousemove", function () {
        clearTimeout(inactivityTimeout);
        setUserSessionCookie();
        inactivityTimeout = setTimeout(checkInactivity, 2 * 60 * 1000); // Restart the inactivity timer
    });
}

//set a session cookie for user activity
function setUserSessionCookie() {
    setCookie("user_session", "active", 0.5); 
}

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

// Call the setUserSessionCookie function when the page loads
window.onload = function () {
    setUserSessionCookie();
    checkInactivity();
};