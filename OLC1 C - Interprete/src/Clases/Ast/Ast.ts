import Controlador from "../Controlador";
import { Instruccion } from "../Interfaces/Instruccion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Nodo from "./Nodo";

export default class Ast implements Instruccion{

    public lista_instrucciones : Array<Instruccion>;

    constructor(lista_instruciones) {
        this.lista_instrucciones = lista_instruciones;
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        //En este metodo vamo a recorrer todas las instrucciones del programa y las vamos a ejecutar
        for(let instruccion of this.lista_instrucciones){
            instruccion.ejecutar(controlador, ts);
        }
    }
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }

}