class ProcessConnexion
{
    static loadWelcomeInterface()
    {
        window.app.initialisation = new Initialisation();
        window.app.connexion = new ConnectToAccount(window.app.initialisation.connexionButton, window.app.initialisation.usernameInput, window.app.initialisation.passwordInput);
    }
    
    static loadInscriptionInterface()
    {    
        window.app.inscription= new Inscription(window.app.initialisation.newAccountButton, window.app.initialisation.welcomeSection);
    }
    
    static setUpAccount()
    {
        window.app.setUpAccount = new CreateAccount(Inscription.submitButton, Inscription.usernameInput, Inscription.passwordInput, Inscription.confirmPasswordInput);
    }
    
}

class Initialisation
{
    constructor()
    {
        this.welcomeSection = createHtmlElement('section',B,'', ["welcome-section"]);
        this.titleWrapper = createDiv(this.welcomeSection, "",["title-wrapper"]);
        this.title = createHtmlElement("h1", this.titleWrapper, "Gestion Relation Client", ["title-header"]); 
        this.subtitle = createHtmlElement("h2", this.titleWrapper, "Lumélio", ["subtitle"]);
        this.contentWrapper = createHtmlElement("div", this.welcomeSection,"", ["content-wrapper"]);
        this.usernameInput = createInputElement(this.contentWrapper, 'email', 'Adresse mail', ["username-input"] );
        this.passwordInput = createInputElement(this.contentWrapper, 'password', 'Mot de Passe', ["password-input"] );
        this.connexionButton = createButton(this.contentWrapper, 'connexion',["connection-button"]);
        this.buttonWrapper = createHtmlElement("div",this.welcomeSection,'',['button-wrapper'])
        this.passwordForgetButton = createButton(this.buttonWrapper, 'mot de passe oublié', ["password-forget-button"]);
        this.newAccountButton = createButton( this.buttonWrapper, 'créer un compte', ["create-account-button"]);
    }
}



class Inscription
{
    constructor(newAccountButton, welcomeSection)
    {
        newAccountButton.addEventListener("click", ()=>
        {
            hideInterface(welcomeSection);
            Inscription.buildInscriptionInterface();
            ProcessConnexion.setUpAccount();
        })
    }
    static buildInscriptionInterface()
    {
        this.newAccountSection = createHtmlElement("section", B, "", ["new-account-section"]);
        this.titleWrapper = createDiv(this.newAccountSection, "",["title-wrapper"]);
        this.title = createHtmlElement("h1", this.titleWrapper, "Créé ton compte", ["title-header"]); 
        this.contentWrapper = createHtmlElement("div", this.newAccountSection,"", ["content-wrapper"]);
        this.usernameInput = createInputElement(this.contentWrapper, 'email', 'Adresse mail', ["username-input"] );
        this.passwordInput = createInputElement(this.contentWrapper, 'password', 'Mot de Passe', ["new-password-input"] );
        this.confirmPasswordInput = createInputElement(this.contentWrapper, 'password', 'Mot de Passe', ["new-password-input"] );
        this.submitButton = createButton(this.contentWrapper, 'Créer mon compte',["submit-button"]);
    }

}

class CreateAccount
{
    constructor(submitButton, usernameInput, passwordInput, confirmPasswordInput)
    {
        submitButton.addEventListener('click',(e)=>
            {   
                e.preventDefault();
                let username = usernameInput.value;
                let password = passwordInput.value;
                let confirmPassword = confirmPasswordInput.value;

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

                let accountCreatedMessage = createHtmlElement('div', B,'Ton compte a été créé avec succès', ["account-created-div"]);
                let accountCreatedButton = createButton(B,"se connecter", ['account-created-button']);
                accountCreatedButton.addEventListener('click',()=>
                {
                    Inscription.newAccountSection.style.display = "none";
                    accountCreatedMessage.style.display = "none";
                    accountCreatedButton.style.display ="none";
                    new Initialisation;
                })
            }
        })    
    }
}

class ConnectToAccount
{
    constructor(connexionButton, username, password)
    {
        this.username = username;
        connexionButton.addEventListener("click",()=>
        {

            let id = 
            {
                username : username.value,
                password : password.value
            }

            let idEnString = JSON.stringify(id);

            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function()
            {
                if(xhr.readyState ==4)
                {
                    let xhrResponse = xhr.response;
                    console.log(xhr.response);
                    if(xhrResponse =="true")
                    {
                        ProcessDashboard.loadDashboardInterface();
                    }
                }
            }
            xhr.open("POST", "./verification.php");
            xhr.send(idEnString);
        })
    }
}