import Controlador from "../Controlador";
import Declaracion from "../Instrucciones/Declaracion";
import Ejecutar from "../Instrucciones/Ejecutar";
import Funcion from "../Instrucciones/Funcion";
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
        let bandera = false;
        //1era pasada voy a guardar las funciones y metodos del programa
        for(let instruccion of this.lista_instrucciones){
            if(instruccion instanceof Funcion ){
                let funcion = instruccion as Funcion;
                funcion.agregarSimboloFuncion(controlador,ts);
            }
        }
       
        //2da pasada vamos a ejecutar todas las instrucciones menos las funciones
        for(let instruccion of this.lista_instrucciones){
           /* if(!(instruccion instanceof Funcion)){
                instruccion.ejecutar(controlador, ts);
            }*/

            if(instruccion instanceof Ejecutar  && bandera == false){
                instruccion.ejecutar(controlador, ts);
                bandera = true;
            }else if (bandera){
                //reportar error
                return;
            }
            if(instruccion instanceof Declaracion ){
                instruccion.ejecutar(controlador, ts);
            }
            
        }
    }
    recorrer(): Nodo {
        let raiz = new Nodo("INICIO","");

        for(let inst of this.lista_instrucciones){
            raiz.AddHijo(inst.recorrer());
        }
        return raiz;
    }

}