const usernameInput = document.querySelector('.username-input');
const passwordInput = document.querySelectorAll('.new-password');
const submitButton = document.querySelector('.submit-button');

submitButton.addEventListener('click',(e)=>
{
    e.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput[0].value;
    const confirmPassword = passwordInput[1].value;

    if(!username || !password || !confirmPassword )
    {
        alert('Erreur : champs vide');
    }
    else if (password!=confirmPassword)
    {
        alert("Erreur : les mots de passent ne correspondent pas.")
    }
    else 
    {
        let data = 
        {
            username : username,
            password : password,
            confirmPassword : confirmPassword
        }

        let dataEnString = JSON.stringify(data);

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function()
        {
            if(xhr.readyState ==4)
            {
                console.log(xhr.response);
            }
        }

        xhr.open("POST", "./formAccount.php", true);
        xhr.send(dataEnString);

        accountCreatedMessage = createHtmlElement('div', B,'Ton compte a été créé avec succès', ["account-created-div"]);
        getBackToIndexButton = createButton(B,"Te connecter", ["get-back-index-button"]);

        getBackToIndexButton.addEventListener("click", ()=>
        {
        location.href='index.html';
        })
    }
})
