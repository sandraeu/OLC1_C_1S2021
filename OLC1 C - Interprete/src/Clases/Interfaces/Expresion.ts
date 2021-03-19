import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";


export interface Expresion {

    /**
     * @function getTipo retorna el tipo del valor de la expresion 
     * @param controlador llevamos el control de todo el programa
     * @param ts accede a la tabla de simbolos
     */
    getTipo(controlador : Controlador, ts : TablaSimbolos) : tipo;


    /**
     * @function getValor retorna el valor de la expresion 
     * @param controlador llevamos el control de todo el programa
     * @param ts accede a la tabla de simbolos 
     */
    getValor(controlador : Controlador, ts: TablaSimbolos);

    /**
     * @function recorrer crea y recorre el subarbol de la expresion
     */
    recorrer(): Nodo;

}