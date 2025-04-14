const menuIcon = document.getElementById('menu');
const menuList = document.getElementById('menuList');
const navigation = document.querySelector('.navigation');
const navbarMenu = document.querySelector('.navigation .navbar ul');
// Toggle the display of the menu (ul)
menuList.classList.toggle('show');

// Change the menu icon to close or menu based on the current state
if (menuList.classList.contains('show')) {
    menuIcon.src = 'assets/close.png'; // Change to close icon
    navigation.style.height = '48vh'; // Set navigation height to 48vh
    navbarMenu.style.display = 'block';
} else {
    menuIcon.src = 'assets/menu.png'; // Change back to menu icon
    navigation.style.height = ''; // Reset navigation height to default
    navbarMenu.style.display = 'none';
}
}