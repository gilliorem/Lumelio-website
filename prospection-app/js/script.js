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
        })
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
        this.backToConnectionInterfaceButton.style.display = "none";
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
        this.dashboardDiv = createDiv(this.newInterface, "Welcome username", ["dashboard-div"]);
        this.profileButton = createButton(this.newInterface,"profile",["profile-button"]);
        this.prospectionButton = createButton(this.newInterface,"prospection",["prospection-button"]);
        this.chiffreButton = createButton(this.newInterface,"chiffre",["chiffre-button"]);
        this.agendaButton = createButton(this.newInterface,"agenda",["agenda-button"]);
        this.buttons = [this.profileButton, this.prospectionButton, this.chiffreButton, this.agendaButton];
        this.setEvent(this.buttons)

    }
    setEvent()
    {
        this.profileButton.addEventListener("click",()=>
        {
            if(!app.profile)
            {
                app.profile = new Profile();
            }
            app.profile.show();
        });

        this.prospectionButton.addEventListener("click",()=>
        {
            if(!app.prospection)
            {
                app.prospection = new Prospection();
            }
            app.prospection.show();
        });

        this.chiffreButton.addEventListener("click",()=>
        {
            if(!app.chiffre)
            {
                app.chiffre = new Chiffre();
            }
            app.chiffre.show();
        });

        this.agendaButton.addEventListener("click",()=>
        {
            if(!app.agenda)
            {
                app.agenda = new Agenda();
            }
            app.agenda.show();
        })
    }
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
        this.label = createHtmlElement('label', this.profileDiv, "Mon Rôle:", ['label-role']);
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
        })
    }
    setInfo(button)
    {
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
            })

            
        })
    }

    
}

class Prospection extends Interface
{
    constructor()
    {
        super("Prospection")
    }
    draw()
    {
        super.draw();
        this.prospectionDiv = createDiv(this.newInterface, "", ["prospection-div"]);
        this.prospectionTitle = createTitle(this.prospectionDiv, "Prospection", ["prospection-title"]);
        this.backToDashboard = createButton(this.prospectionDiv, "back to dashboard", ["back-to-dashboard-interface-button"]);

        this.setDashboard(this.backToDashboard);
    }
    
}

class Chiffre extends Interface
{
    constructor()
    {
        super("Chiffre")
    }
    draw()
    {
        super.draw();
        this.chiffreDiv = createDiv(this.newInterface, "", ["chiffre-div"]);
        this.backToDashboard = createButton(this.chiffreDiv, "back to dashboard", ["back-to-dashboard-interface-button"]);
        this.setDashboard(this.backToDashboard);
        this.chiffreTitle = createTitle(this.chiffreDiv, "Chiffre", ["chiffre-title"]);

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


window.app.connectionInterface = new Connexion();




// reload de la page : save les id de co dans le local storage pour rechargé l'espace connecté de l'utilisateur. si on est "connecté, et qu'on reload la page : on load le app.dashboard."

// formulaire prospection : logic du profile