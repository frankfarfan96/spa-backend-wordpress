import api from "./helpers/wp_api.js"
import {App} from "./App.js";

document.addEventListener("DOMContentLoaded", App);

//Evento que detecta el cambio del Hash, del objeto window
window.addEventListener("hashchange", () => {
    //En este modo se evita el problema de logica de cuando estamos
    //escroleando la home en la pag 9 x ejemp, dsps cuando vamos en
    //buscar, no salgan los resultados desde la pag 9
    api.page = 1;
    App();
});