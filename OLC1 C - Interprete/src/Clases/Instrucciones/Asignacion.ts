import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";


export default class Asignacion implements Instruccion{

    public identificador : string;
    public valor : Expresion;
    public linea : number;
    public columna : number;

    constructor(identificador, valor, linea, columna) {
        this.identificador = identificador;
        this.valor = valor;
        this.linea =linea;
        this.columna = columna;
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        //verificamos si existe en la tabla de simbolos 

        if(ts.existe(this.identificador)){
            let valor = this.valor.getValor(controlador,ts );

            //TODO: Validar si son del mismo tipo

            ts.getSimbolo(this.identificador).setValor(valor);
        }else{
            //TODO: reportar error no existe variable.
        }
    }
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }

}