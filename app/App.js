import {Header} from "./components/Header.js"
import {Main} from "./components/Main.js"
import {Loader} from "./components/Loader.js"
import {Router} from "./components/Router.js"
import {InfiniteScroll} from "./helpers/infinite_scroll.js"

export function App() {
     const $root = document.getElementById("root");

     
//una buena practica es, antes de entrar a las anidaciones router, se hace :
     $root.innerHTML = null;

     $root.appendChild(Header());
     $root.appendChild(Main());
     $root.appendChild(Loader());
     
     Router();
    InfiniteScroll();
}
