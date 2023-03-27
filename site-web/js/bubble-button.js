const bubbleButton = document.querySelector('.bubble-button');
bubbleButton.addEventListener("click",()=>
{
    window.location.href = "index.html#contact";
})

const etudeButton = document.querySelectorAll('.etude-button');
etudeButton.forEach(button=>
{
        button.addEventListener("click",()=>
    {
        window.location.href = "index.html#contact";
    })

});