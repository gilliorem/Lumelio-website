let chantiersContainer = document.querySelector('.chantiers');
let chantiers = document.querySelectorAll('.chantier');
let images =
{
    imagesGouy : ["./media/photo/chantier-solaire-gouy-sous-bellonne1.png", "./media/photo/chantier-solaire-gouy-sous-bellonne2.png", "./media/photo/chantier-solaire-gouy-sous-bellonne3.png"],
    imagesBlaringhem : ["./media/photo/installation-solaire-blaringhem1.jpeg","./media/photo/installation-solaire-blaringhem2.jpeg","./media/photo/installation-solaire-blaringhem3.jpeg"],
    imagesSantes :["./media/pĥoto/chantier-solaire-agriculteur-santes-decarnin1.png","chantier-solaire-agriculteur-santes-decarnin2.png", "chantier-solaire-agriculteur-santes-decarnin3.png"]
}

function createImage(obj)
{
    createImg(B,obj)
}

// createImage(images.imagesBlaringhem[1])

// createImg(B,images.imagesBlaringhem[2])
console.log(images.imagesGouy[1])

class PageChantier
{
    constructor()
    {
        this.setClickEvent();
    }
    drawChantierPage(chantierName)
    {
        this.chantierDiv = createDiv(B,chantierName,[chantierName+"-page"]);
        this.drawImages(images)
    }
    hideActualPage()
    {
        chantiersContainer.style.display = "none";
    }
    setClickEvent()
    {
        for(let chantier of chantiers)
        {
            chantier.addEventListener("click",(e)=>
            {
                this.drawChantierPage(e.target.className);
                this.hideActualPage();

            })
        }

    }
    drawImages(obj)
    {
        for (imageArray in obj)
        {
            for(image of imageArray)
            {
                img=createImg(B, obj.imageArray);
                console.log(img);
            }
        }
    }
}

new PageChantier();