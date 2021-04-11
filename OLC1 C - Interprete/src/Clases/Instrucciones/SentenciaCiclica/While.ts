import Nodo from "src/Clases/Ast/Nodo";
import Controlador from "src/Clases/Controlador";
import { Expresion } from "src/Clases/Interfaces/Expresion";
import { Instruccion } from "src/Clases/Interfaces/Instruccion";
import { TablaSimbolos } from "src/Clases/TablaSimbolos/TablaSimbolos";

export default class While implements Instruccion{

    public condicion: Expresion;
    public lista_instrucciones : Array<Instruccion>;
    public linea : number;
    public columna : number;

    constructor(condicion, lista_instrucciones, linea, columna) {
        this.condicion = condicion;
        this.lista_instrucciones = lista_instrucciones;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        let valor_condicion = this.condicion.getValor(controlador, ts);

        if(typeof valor_condicion == 'boolean'){

            while(this.condicion.getValor(controlador,ts)){

                let ts_local = new TablaSimbolos(ts);

                for(let ins of this.lista_instrucciones){
                    let res = ins.ejecutar(controlador,ts_local);
                     //TODO verificar si res es de tipo CONTINUE, BREAK, RETORNO 
                }
            }
        }
    }
    
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }

}