const hamburger = document.querySelector('.hamburger'),
      header = document.querySelector('.header');  
function showAndHideClose() {
    header.classList.toggle('show__menu');
}      
hamburger.addEventListener('click', showAndHideClose)

