const footerImages = document.querySelectorAll('.image-footer');
let currentImage = 0;

function nextImage()
{
  footerImages[currentImage].style.left ='-100%';
  currentImage = (currentImage +1) % footerImages.length;
  footerImages[currentImage].style.left ='0'; 
}

footerImages.forEach((image)=>
{
  image.style.left ='100%';
})

footerImages[0].style.left ='0';
setInterval(nextImage, 3000);

