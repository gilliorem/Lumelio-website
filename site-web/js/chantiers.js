import Chantier from "./Chantier.js";

class ChantiersPage
{
    constructor()
    {
        console.log(window.location.pathname);
        if(window.location.pathname =="/site-web/chantiers/")
        {
            this.chantiersList =[];
            this.chantiersList.push(new Chantier ("chantier1", this.chantiersList));
            this.chantiersList.push(new Chantier ("chantier2", this.chantiersList));
            this.chantiersList.push(new Chantier ("chantier3", this.chantiersList));
            
        }
        else
        {
            const nomDuChantier = window.location.pathname.replace("/site-web/chantiers/", "");
            new Chantier(nomDuChantier, []);
        }
    this.addEventBacktoChantiers();
    }
    addEventBacktoChantiers()
    {
        window.addEventListener("popstate",()=>
        {
            
        })
    }
}



new ChantiersPage();

    
 

