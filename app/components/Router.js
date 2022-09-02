import api from "../helpers/wp_api.js";
import {ajax} from "../helpers/ajax.js";
import {PostCard} from "./PostCard.js";
import {Post} from "./Post.js";
import {SearchCard} from "./SearchCard.js"
import {ContactForm} from "./ContactForm.js"

export async function Router() {
    const d = document,
     w= window,
     $main = d.getElementById("main");
    
    let {hash} = location;
    //console.log(hash);
//una buena practica es, antes de entrar a las anidaciones router, se hace :
    $main.innerHTML = null;
    
    if(!hash || hash === "#/") {
        await ajax({
        url:api.POSTS,
        cbSuccess: (main) => {
            //d.querySelector(".loader").style.display = "none";
            //console.log(main);
            let html = "";
            main.forEach(post => (html += PostCard(post)));
            $main.innerHTML = html;
        }
    })
    console.log(api.POST);
    } else if(hash.includes("#/search")) {
        //d.querySelector(".loader").style.display = "none";
        let query = localStorage.getItem("wpSearch");
        if(!query)
        {
            d.querySelector(".loader").style.display = "none";  
            return false; //Asi salimos de estos if, y se vael loader
        } 
        
        await ajax({
            url: `${api.SEARCH}${query}`,
            cbSuccess: (search) => {
                console.log(search);
                let html = "";
                if(search.length === 0) {
                    html = `
                <p class="error">
                    No existen resultados de busqueda para el termino <mark>${query}</mark>
                </p>
                    `;
                } else {
                    search.forEach(post => html += SearchCard(post));
                }

                $main.innerHTML = html;
            }
        })


    } else if(hash === "#/contacto") {
        //d.querySelector(".loader").style.display = "none";
        //$main.innerHTML = "<h2>Seccion de Contacto </h2>" EN ESTE CASO NO INNERHTML
        //Visto que hemos creado un nodo, tenemos que hacer lo siguiente:
        $main.appendChild(ContactForm())

    } else { 
        //console.log(`${api.POST}/${localStorage.getItem("wpPostId")}`)

        await ajax({
            url:`${api.POST}/${localStorage.getItem("wpPostId")}`,
            cbSuccess: (post) => {
                //console.log(post);
                $main.innerHTML = Post(post) 
            }
        })

        //d.querySelector(".loader").style.display = "none";
    }

    d.querySelector(".loader").style.display = "none";

}