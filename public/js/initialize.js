const calender = document.querySelectorAll('.datepicker');
M.Datepicker.init(calender, {});

$(document).ready(function(){
    $('select').formSelect();
  });

window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  preloader.classList.add('preloader-finish');
})
  

