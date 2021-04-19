import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Funcion from "./Funcion";

export default class Llamada implements Instruccion{

    public identificador : string;
    public parametros : Array<Expresion>;
    public linea : number;
    public columna : number;

    constructor(id, param, linea, col) {
        this.identificador = id;
        this.parametros = param;
        this.columna = col;
        this.linea = linea;
    }


    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        //Verificar si la funcion/metodo existe 

        if(ts.existe(this.identificador)){
            let ts_local = new TablaSimbolos(ts);

            let simbolo_funcion = ts.getSimbolo(this.identificador) as Funcion;
            
            //TODO: Hacer un metodo para validar si los parametros de la llamada son del mismo tipo que el de la funcion
            
            let r = simbolo_funcion.ejecutar(controlador,ts_local);

            if(r != null){
                return r;
            }

        }else{
            //TODO: reportar error semantico
        }
    }
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }

}