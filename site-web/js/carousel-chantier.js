const carouselImages = document.querySelectorAll('.carousel-image');
const nextButton = document.querySelector('.right-button');
const prevButton = document.querySelector('.left-button');
let currentCarouselImage = 0;

function nextCarouselImage()
{
    carouselImages[currentCarouselImage].style.left ='-100%';
    currentCarouselImage = (currentCarouselImage +1) % carouselImages.length;
    carouselImages[currentCarouselImage].style.left ='0';
}

function prevCarouselImage()
{
    carouselImages[currentCarouselImage].style.left ='100%';
    currentCarouselImage = (currentCarouselImage -1 + carouselImages.length) % carouselImages.length;
    carouselImages[currentCarouselImage].style.left ='0';
}

carouselImages.forEach((image)=>
{
    image.style.left = '100%';
})

carouselImages[currentCarouselImage].style.left='0';
nextButton.addEventListener('click', nextCarouselImage);
prevButton.addEventListener('click', prevCarouselImage);
