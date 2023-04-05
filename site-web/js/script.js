function reveal() {
    let reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveals.length; i++) {
      let windowHeight = window.innerHeight;
      let elementTop = reveals[i].getBoundingClientRect().top;
      let elementVisible = 20;
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }
window.addEventListener("scroll", reveal);

reveal();

function fallbackImage()
{
  let videoElement = document.querySelector('.background-video');
  let imgElement = document.getElementById('fallbackImage');
  imgElement.src="./media/photo/screen-video.png";
  videoElement.style.display="none";
  imgElement.style.display="block";
}

const form = document.querySelector('#form-index');

form.addEventListener('submit', function(e)
{
  e.preventDefault();

  let successDiv = document.querySelector('.pop-up');
  successDiv.style.display='block';
  form.appendChild(successDiv);

  
  const select = document.querySelector('#select').value;
  const name = document.querySelector('#name').value;
  const mail = document.querySelector('#mail').value;
  const tel = document.querySelector('#tel').value;
  const textarea = document.querySelector('#textarea').value;
  
  
  
  let data = 
  {
    option : select,
    nom : name,
    mail : mail,
    tel : tel,
    demande : textarea
  }
  
  let dataEnString = JSON.stringify(data);
  
  let xhr = new XMLHttpRequest();
  
  xhr.onreadystatechange = function()
  {
    if(xhr.readyState == 4)
    {
      console.log(xhr.response);
    }
  };
  
  xhr.open("POST", "formProcess.php", true);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(dataEnString);
  form.reset();
})

