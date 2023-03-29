window.app = {};
document.addEventListener("DOMContentLoaded", function()
    {
        ProcessConnexion.loadWelcomeInterface();
        ProcessConnexion.loadInscriptionInterface();
        ProcessDashboard.loadProfile(window.app.dashboardInitialisation.setProfileButton);
        
    });

    
    