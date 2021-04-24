import Nodo from "src/Clases/Ast/Nodo";
import Controlador from "src/Clases/Controlador";
import { Instruccion } from "src/Clases/Interfaces/Instruccion";
import { TablaSimbolos } from "src/Clases/TablaSimbolos/TablaSimbolos";


export default class Detener implements Instruccion{

    constructor() { }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        return this;
    }
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }

}