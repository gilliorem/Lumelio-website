
export default class Chantier 
{
    constructor(text, chantiersList)
    {
        this.chantiersList = chantiersList;
        this.createHtml(text);
        this.setEventOnClick();
    }
    createHtml(text)
    {
        this.link = createLink(B, "", "");
        this.div = createDiv(this.link,text);
        this.name = text;
    }
    setEventOnClick()
    {
        this.link.addEventListener("click",(e)=>
        {
            e.preventDefault();
            this.hideUnselected(this.name);
            window.history.pushState({}, "", "/site-web/chantiers/"+this.name);
        })
    }
    hideUnselected()
    {
         for (let chantier of this.chantiersList)
         {
            if(chantier.name != this.name){
                chantier.div.style.display = "none";
            }
         }
    }
}