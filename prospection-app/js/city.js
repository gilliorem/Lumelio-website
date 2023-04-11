const button = createButton(B, 'afficher la liste des villes', ['display-cities-button']);

button.addEventListener("click",()=>
{
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "./villes.php");
    xhr.onreadystatechange = () =>
    {
        if(xhr.status ===200 && xhr.readyState ===4)
        {
            villesList = (JSON.parse(xhr.response))
            let villeContainer = createDiv(B, "", ["ville-container"]);
            for (let villes of villesList)
            {
                 let villeButton= createButton(villeContainer, villes, ['ville-button']);
                 villeButton.addEventListener("click",()=>
                {
                    let xhr = new XMLHttpRequest();
                    xhr.open("POST", "./cities.php");
                    xhr.onreadystatechange = () =>
                    {
                        if (xhr.status ===200 && xhr.readyState ===4)
                        {
                            street = JSON.parse(xhr.response)
                            if(villeButton.innerText == "Lille")
                            {
                                for (street of street.Lille)
                                {
                                    let lilleStreet = createButton(villeButton, street, ["streets-div"]);
                                }
                            }
                            else if(villeButton.innerText == "Dunkerque")
                            {
                                for (street of street.Dunkerque)
                                {
                                    let dunkerqueStreets = createButton(villeButton, street, ["streets-div"])
                                }
                            }
                            
                        }
                    }
                xhr.send();
                })
            }
            
        }
        else if (xhr.status !==200 && xhr.readyState ===4)
        {
            const errorDiv = createDiv(B, "error", ["error-div"]);
        }
        
    }
    xhr.send();
})

