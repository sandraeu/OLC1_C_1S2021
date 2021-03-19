import Simbolos from "./Simbolos";


export class TablaSimbolos{

    public ant : TablaSimbolos;
    public tabla : Map<string, Simbolos>;


    /**
     * @constructor creamos una nueva tabla.
     * @param ant indica quien es la tabla anterior a la nueva tabla (para el manejo de ambitos)
     */
    constructor(ant : TablaSimbolos) {
        this.ant = ant;
        this.tabla = new Map<string, Simbolos>();
    }

    //TODO: agregar metodo para agregar simbolos a la tabla

    // TODO: Agregar metodo para validar si ya existe el simbolo (variable o funcion) en la tabla

    // TODO: Agregar metodo para obtener un simbolo
}