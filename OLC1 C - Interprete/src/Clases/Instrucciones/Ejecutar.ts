import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Instruccion } from "../Interfaces/Instruccion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Llamada from "./Llamada";


export default class Ejecutar implements Instruccion{

    public llamada : Llamada;
    public linea;
    public column;
    
    constructor(llamada, linea, col) {
        this.llamada = llamada;
        this.linea = linea;
        this.column = col;
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        this.llamada.ejecutar(controlador,ts);
    }

    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }

}