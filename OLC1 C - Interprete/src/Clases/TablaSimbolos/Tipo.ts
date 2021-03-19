/**
 * @enum de Tipo nos permite enumerar los tipos del lenguaje
 */

export enum tipo{
    ENTERO,
    DOBLE,
    BOOLEANO,
    CARACTER,
    CADENA
}

/**
 * @class Esta clase sirve para llevar el control de los tipos de los simbolos del lenguaje
 */
export default class Tipo{
    
    constructor(public type : tipo) {
        this.type = type;
    }

    // TODO: Hacer metodo getTipo
}