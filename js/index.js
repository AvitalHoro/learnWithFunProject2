var showButton = document.getElementById('profile-img-header');
var ProfileDiv = document.getElementById('side-profile');


function showProfileSection()
{
    console.log("kjhgf");
 // Toggle the visibility of the target div
 if (ProfileDiv.style.display === 'none') {
    ProfileDiv.style.display = 'block';
} else {
    ProfileDiv.style.display = 'none';
}


};


showButton.addEventListener('click', showProfileSection);