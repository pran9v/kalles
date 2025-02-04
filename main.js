// Initialize Lucide icons
lucide.createIcons();

// Mobile menu functionality
const menuButton = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = menuButton.querySelector('i');

menuButton.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.contains('active');
  
  if (isOpen) {
    mobileMenu.classList.remove('active');
    menuIcon.setAttribute('data-lucide', 'menu');
  } else {
    mobileMenu.classList.add('active');
    menuIcon.setAttribute('data-lucide', 'x');
  }
  
  // Re-initialize icons to update the menu icon
  lucide.createIcons();
});