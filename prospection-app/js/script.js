window.app = {
    interfaces :[],
    username : ""
};

window.app.request = function(url,data,func)
{
    let dataEnString = JSON.stringify(data);

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = ()=>
    {
        if(xhr.readyState ==4)
        {
            func(xhr.response);
        }
    }
    xhr.open("POST", url);
    xhr.send(dataEnString);
}

class Interface
{
    constructor(interfaceName)
    {
        window.app.interfaces.push(this);
        this.draw(interfaceName);
    }
    
    draw(interfaceName)
    {
        this.newInterface = createDiv(B,interfaceName,[interfaceName + "-div"]);
        this.errorDiv = createDiv(this.newInterface, "", ["error-div"]);

    }

    show()
    {
        for(let i of window.app.interfaces)
        {
            i.hide();
        }
        this.newInterface.style.display = "block";
    }
    hide()
    {
        this.newInterface.style.display = "none";
    }

    error(errorText)
    {
        this.errorDiv.innerText = errorText;
    }

   
    setDashboard(button)
    {
        button.addEventListener("click",()=>
        {
            if(!app.dashboard)
            {
                app.dashboard = new Dashboard();
                app.dashboard.draw();
            }
            app.dashboard.show();
            this.hide();
        });
    }
}


class Connexion extends Interface
{
    constructor()
    {
        super("Welcome");
    }

    draw(interfaceName)
    {
        super.draw(interfaceName);
        this.usernameInput = createInputElement(this.newInterface, 'email', 'Adresse mail', ["username-input"] );
        this.passwordInput = createInputElement(this.newInterface, 'password', 'Mot de Passe', ["password-input"] );
        this.connectionButton = createButton(this.newInterface, "Connection", [interfaceName + "-button"]);
        this.createAccountButton = createButton(this.newInterface, "Create Account", ["new-account-button"]);
        this.setConnection(this.connectionButton);
        this.setAccount(this.createAccountButton);
        
        let storedId = localStorage.getItem("id");
        if(storedId)
        {
            let id = JSON.parse(storedId);
            this.usernameInput.value = id.username;
            this.passwordInput.value = id.password;
            window.addEventListener("load",()=>
            {
                app.dashboard = new Dashboard();
                super.hide(interfaceName);
            });
        }
    }
    

    

    setConnection(button)
    {
        button.addEventListener("click",()=>
        { 
            let id = 
            {
                username : this.usernameInput.value,
                password : this.passwordInput.value
            }

            localStorage.setItem("id",JSON.stringify(id));

            app.request("./connection.php",id,(response)=>
            {
                if(response.includes("true"))
                {
                    window.app.dashboard = new Dashboard(window.app.connectionInterface);
                    window.app.dashboard.show();
                    window.app.username = id.username;
                }
                else 
                {
                    this.error(response);
                }
            })
        })
    }


    setAccount(button)
    {
        button.addEventListener("click",()=>
        {
            this.newAccountInterface = new CreateAccount();
            this.newAccountInterface.show();
            
        })
    }
}

class CreateAccount extends Interface
{
    constructor()
    {
        super("create Account");

    }
    
    draw(interfaceName)
    {
        super.draw(interfaceName);
        this.usernameInput = createInputElement(this.newInterface, 'email', 'Adresse mail', ["username-input"] );
        this.passwordInput = createInputElement(this.newInterface, 'password', 'Mot de Passe', ["password-input"] );
        this.confirmPasswordInput = createInputElement(this.newInterface, 'password', 'Confirme mot de Passe', ["password-input"] );
        this.createAccountButton = createButton(this.newInterface, "Create Account", ["new-account-button"]);
        this.backToConnectionInterfaceButton = createButton(this.newInterface, "back to Connection interface", ["back-to-Connection-interface-button"]);
        this.setAccount(this.createAccountButton);
        this.setConnectionInterface(this.backToConnectionInterfaceButton);
        
    }

    setAccount(button)
    {
        button.addEventListener('click',()=>
        {
            let id =
            {
                mail : this.usernameInput.value,
                password : this.passwordInput.value,
                confirmPassword : this.confirmPasswordInput.value
            }

            if(!this.passwordInput.value||!this.confirmPasswordInput.value || !this.usernameInput.value) 
            {
                alert("empty field(s) !");
            }
            
            else if(this.usernameInput.checkValidity() && this.usernameInput.type =="email" && this.passwordInput.value == this.confirmPasswordInput.value) 
            {
                
                app.request("create-account.php", id, (response)=>
                {
                    if(response !="false")
                    {
                        console.log(response);
                        this.usernameInput.style.display = "none";
                        this.passwordInput.style.display="none";
                        this.confirmPasswordInput.style.display = "none";
                        button.style.display ="none";
                        this.accountCreatedTitle = createTitle(this.newInterface,response, ['valid-account-title'])
                        this.backToConnectionInterfaceButton.style.display ="block";
                    }
                    else
                    {
                        this.error("username is already taken. please select another");
                    }
                })
            
                this.errorEmpty=this.error("");
                
            }

            else if(this.passwordInput.value !== this.confirmPasswordInput.value)
            {
                alert("passwords missmatch!")
            }

            else alert("username has to be mail adress !");
            
        })
    }

    
    setConnectionInterface(button)
    {
        button.addEventListener("click",()=>
        {
            this.connectionInterface=new Connexion();
            this.connectionInterface.show();
        })
    }
}

class Dashboard extends Interface
{
    constructor()
    {
        super("YOUR DASHBOARD");
    }
    draw()
    {
        super.draw();
        let profile = localStorage.getItem("profile");
        if(profile)
        {
            let profileParsed = JSON.parse(profile);
            this.dashboardDiv = createDiv(this.newInterface, "Welcome " + profileParsed.nom, ["dashboard-div"]);
        }
        this.agendaButton = createButton(this.newInterface,"agenda",["agenda-button"]);
        this.chiffreButton = createButton(this.newInterface,"chiffre",["chiffre-button"]);
        this.priseDeRdvButton = createButton(this.newInterface,"prise-de-rdv",["prise-de-rdv-button"]);
        this.prospectionButton = createButton(this.newInterface,"prospection",["prospection-button"]);
        this.profileButton = createButton(this.newInterface,"profile",["profile-button"]);
        this.disconnectButton = createButton(this.newInterface,"disconnect",["disconnect-button"]);
        this.buttons = [this.profileButton, this.priseDeRdvButton, this.chiffreButton, this.agendaButton, this.disconnectButton];
        this.setEvent(this.buttons);
        

    }
    setEvent()
    {
        this.agendaButton.addEventListener("click",()=>
        {
            if(!app.agenda)
            {
                app.agenda = new Agenda();
            }
            app.agenda.show();
        });

        this.chiffreButton.addEventListener("click",()=>
        {
            if(!app.chiffre)
            {
                app.chiffre = new Chiffre();
            }
            app.chiffre.show();
        });

        this.priseDeRdvButton.addEventListener("click",()=>
        {
            if(!app.priseDeRdv)
            {
                app.priseDeRdv = new Rdv();
            }
            app.priseDeRdv.show();
        });

        this.prospectionButton.addEventListener("click",()=>
        {
            if(!app.prospection)
            {
                app.prospection = new Prospection();
            }
            app.prospection.show();
        });

        this.profileButton.addEventListener("click",()=>
        {
            if(!app.profile)
            {
                app.profile = new Profile();
            }
            app.profile.show();
        });
        
        this.disconnectButton.addEventListener("click",()=>
        {            
            app.connectionInterface.show();
            localStorage.clear();
            location.reload();
        })
    }
}

class Agenda extends Interface
{
    constructor()
    {
        super("Agenda")
    }
    draw()
    {
        super.draw();
        this.agendaDiv = createDiv(this.newInterface, "", ["agenda-div"]);
        this.agendaTitle = createTitle(this.agendaDiv, "Agenda", ["agenda-title"]);
        this.backToDashboard = createButton(this.agendaDiv, "back to dashboard", ["back-to-dashboard-interface-button"]);
        this.setDashboard(this.backToDashboard);
        
    }
}

class Chiffre extends Interface
{
    constructor()
    {
        super("Numbers")
    }
    draw()
    {
        super.draw();
        this.chiffreDiv = createDiv(this.newInterface, "", ["chiffre-div"]);
        this.chiffreTitle = createTitle(this.chiffreDiv, "Chiffre", ["chiffre-title"]);
        this.backToDashboard = createButton(this.chiffreDiv, "back to dashboard", ["back-to-dashboard-interface-button"]);
        this.setDashboard(this.backToDashboard);
    }
   
}

class Rdv extends Interface
{
    constructor()
    {
        super("Rdv")
    }
    draw()
    {
        super.draw();
        this.priseDeRdvDiv = createDiv(this.newInterface, "", ["priseDeRdv-div"]);
        this.priseDeRdvTitle = createTitle(this.priseDeRdvDiv, "Rdv", ["priseDeRdv-title"]);
        this.label = createHtmlElement('label', this.priseDeRdvDiv, "Statut Rdv:", ['label-prospect']);
        this.select = createHtmlElement('select', this.label, "", ['statut-selection']);
        this.optionRdv = createOption(this.select, "Prise de RDV", "Prise de RDV", ["selection-option"]);
        this.optionRefus = createOption(this.select, "Refus", "Refus", ["refus-option"]);
        this.optionHorsCible = createOption(this.select, "Hors-cible", "hors-cible", ["hors-cible-option"]);
        this.factureInput = createInputElement(this.priseDeRdvDiv, 'montant facture EDF', 'montant facture', ["facture-input"] );
        this.nameInput = createInputElement(this.priseDeRdvDiv, 'text', 'nom complet (très important)', ["name-input"] );
        this.telInput = createInputElement(this.priseDeRdvDiv, 'tel', 'numero de telephone', ["phone-input"] );
        this.adressInput = createInputElement(this.priseDeRdvDiv, 'adress', 'adresse', ["adresse-input"] );
        this.dateInput = createInputElement(this.priseDeRdvDiv, 'datetime-local', 'date', ["date-time-input"] );

        
        this.submitButton = createButton(this.newInterface, "valider", "submit-button");
        this.setDataToServer(this.submitButton);

        this.backToDashboard = createButton(this.priseDeRdvDiv, "back to dashboard", ["back-to-dashboard-interface-button"]);
        this.setDashboard(this.backToDashboard);
    }
    setDataToServer(button)
    {
        button.addEventListener("click",()=>
        {
            let dataClient =
            {
                result : this.select.value,
                facture : this.factureInput.value,
                nom : this.nameInput.value,
                tel : this.telInput.value,
                adress : this.adressInput.value,
                date : this.dateInput.valueAsNumber/1000
            };

            localStorage.setItem("dataClient", JSON.stringify(dataClient));

            app.request("./dataClient.php", dataClient,(response)=>
             {
                console.log(response);
                this.dataSavecMessage = createDiv(this.priseDeRdvDiv, response, ['data-saved-msg']);
            })
        })
    }
    
    
}

class Prospection extends Interface
{
    constructor()
    {
        super("Prospection");
    }

    draw()
    {
        super.draw();
        this.prospectionDiv = createDiv(this.newInterface, "", ["prospection-div"]);
        this.prospectionTitle = createTitle(this.prospectionDiv, "Prospection", ["prospection-title"]);
        this.cityInput = createInputElement(this.prospectionDiv, 'text', 'nom de la ville', ["city-input"] );
        this.displayCityButton = createButton(this.prospectionDiv, "afficher les villes", ["display-city-button"]);
        this.searchButton = createButton(this.prospectionDiv, "search", ["search-address-button"]);
        this.backToDashboard = createButton(this.prospectionDiv, "back to dashboard", ["back-todashboard-interface-button"]);
        this.setCityStreets(this.searchButton);
        this.setDashboard(this.backToDashboard);
    }


    displayCities(button)
    {
        button.addEventListener("click",()=>
        {
            let xhr = new XMLHttpRequest();
            
        })
    }

    setCityStreets(button)
    {
        button.addEventListener("click",()=>
        {
            
        console.log(this.cityInput.value);
          
        }
    )};

}

class Profile extends Interface
{
    constructor()
    {
        super("NAME");
    }

    draw()
    {
        super.draw();
        this.profileDiv = createDiv(this.newInterface, "", ["profile-div"]);
        this.profileTitle = createTitle(this.profileDiv, "Mon Profil", ["profile-title"]);
        this.nameInput = createInputElement(this.profileDiv, 'text', 'nom complet', ["name-input"] );
        this.telInput = createInputElement(this.profileDiv, 'tel', 'numero de telephone', ["phone-input"] );
        this.label = createHtmlElement('label', this.profileDiv, "Rôle:", ['label-role']);
        this.select = createHtmlElement('select', this.label, "", ['role-selection']);
        this.option = createOption(this.select, "", "empty", ["selection-option"]);
        this.option = createOption(this.select, "Commercial", "Commercial", ["commercial-option"]);
        this.option = createOption(this.select, "Prospecteur", "prospecteur", ["prospecteur-option"]);
        this.backToDashboard = createButton(this.profileDiv, "back to dashboard", ["back-to-dashboard-interface-button"]);
        this.validButton = createButton(this.profileDiv, "Enregister mes infos", ["update-profile-button"]);
        
        this.setDashboard(this.backToDashboard);
        this.setInfo(this.validButton);

        let storedProfile = localStorage.getItem("profile");
        if(storedProfile)
        {
            let profile = JSON.parse(storedProfile);
            this.nameInput.value = profile.nom;
            this.telInput.value = profile.tel;
            this.select.value = profile.role;

        }
    }
    
    setDashboard(button)
    {
        button.addEventListener("click",()=>
        {
            if(!app.dashboard)
            {
                app.dashboard = new Dashboard();
                app.dashboard.draw();
            }
            app.dashboard.show();
            this.hide();
            if(this.profileModified)
            {
                location.reload();
            }
        })
    }
    setInfo(button)
    {
        this.profileModified = false;
        button.addEventListener("click",()=>
        {
            let profile = 
            {
                username : window.app.username,
                nom : this.nameInput.value,
                tel : this.telInput.value,
                role : this.select.value
            };

            localStorage.setItem("profile", JSON.stringify(profile));
            
            app.request("./profile.php",profile,(response)=>
            {
                console.log(response);
                this.profileUpdateMessage = createTitle(this.profileDiv, "Profil mis à jour.", ["update-profile-title"])
                this.profileModified = true;
            });

            
        })
    }

    
}

window.app.connectionInterface = new Connexion();