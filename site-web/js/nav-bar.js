const mobile = document.querySelector('.mobile');
const header = document.querySelector('.header-wrapper');
const navButton = document.querySelector('.nav-button');
const navMenu = document.querySelector('.nav-menu');
const crossNavMenu = document.querySelector('.cross-menu');


navButton.addEventListener("click",()=>
{
    navMenu.classList.toggle("show");
    navButton.style.display = "none";
})

crossNavMenu.addEventListener("click", ()=>
{
    navButton.style.display = "flex";
    navMenu.classList.toggle("show");
})