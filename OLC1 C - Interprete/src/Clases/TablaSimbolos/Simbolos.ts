import Tipo from "./Tipo";

/**
 * @class Esta clase define los simbolos del lenguaje que seran variables o funciones/metodos
 */
export default class Simbolos{

    public simbolo : number; 
    //--> Simbolo variable
    public tipo : Tipo;                 
    public identificador : string;
    public valor : any;
    
    //--> Simbolo funcion/metodo
    public lista_params : Array<Simbolos>;
    public metodo : boolean;

    /**
     * @constructor 
     * @param simbolo indica el tipo de simbolo que es: 1- variable  2- funcion  3- metodo  4- vector  5- lista  6- param
     * @param tipo indica el tipo de la variable 
     * @param identificador nombre identificador de la variable
     * @param valor valor de la variable
     * @param lista_params lista de simbolos de tipo parametro (para funciones o metodos)
     * @param 
     */

    constructor(simbolo : number, tipo : Tipo, identificador : string, valor : any, lista_params?, metodo?) {
        this.simbolo = simbolo;
        this.tipo = tipo;
        this.identificador = identificador;
        this.valor = valor; 
        this.lista_params = lista_params;
        this.metodo = metodo;
    }

    // TODO: Agregar metodos set y get 

}