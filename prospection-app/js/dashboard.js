class ProcessDashboard
    {
        static loadDashboardInterface()
        {
            window.app.dashboardInitialisation = new DashboardInitialisation();
            window.app.initialisation.welcomeSection.style.display ="none";
        }
        
        static loadProfile(button)
        {
            button.addEventListener("click",()=>
            {
                new DashboardProfile();
            })
        }
    }
    

class DashboardInitialisation
{
    constructor(connexionButton)
    {
        this.dashboardSection = createHtmlElement('section',B,'', ["dashboard-section"]);
        this.titleWrapper = createDiv(this.dashboardSection, "",["title-wrapper"]);
        this.title = createHtmlElement("h1", this.titleWrapper, "Tableau de Bord. Semaine _", ["title-header"]); 
        this.subtitle = createHtmlElement("h2", this.titleWrapper, "Name", ["subtitle"]);
        this.contentWrapper = createHtmlElement("div", this.dashboardSection,"", ["content-wrapper"]);
        this.setProfileButton = createButton(this.contentWrapper, "Set up mon compte", ["set-profile-button"]);
        this.personalContentWrapper =createHtmlElement("div", this.contentWrapper,"", ["content-wrapper"]);
        this.teamContentWrapper =createHtmlElement("div", this.contentWrapper,"", ["content-wrapper"]);
    }
}

class DashboardProfile
{
    constructor()
    {
        this.profileSection = createHtmlElement("section",B, "", ["profile-section"]);
        this.titleWrapper = createDiv(this.profileSection,"",["title-wrapper"]);
        this.title = createHtmlElement("h1", this.titleWrapper, ConnectToAccount.instance.username, ["title-header"]); 
        this.subtitle = createHtmlElement("h2", this.titleWrapper, "Name", ["subtitle"]);
        this.contentWrapper = createHtmlElement("div", this.dashboardSection,"", ["content-wrapper"]);
    }

}

