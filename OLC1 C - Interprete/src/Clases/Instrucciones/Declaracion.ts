import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Instruccion } from "../Interfaces/Instruccion";
import Simbolos from "../TablaSimbolos/Simbolos";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Tipo, { tipo } from "../TablaSimbolos/Tipo";


export default class Declaracion implements Instruccion{
    
    public type : Tipo;
    public stype : string;
    public lista_simbolos : Array<Simbolos>;

    public linea : number;
    public columna: number;

    constructor(type, lista_simbolos, linea, columna) {
        this.type = type;
        this.lista_simbolos = lista_simbolos;
        this.linea = linea; 
        this.columna = columna;
    }

    
    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        
        for(let simbolo of this.lista_simbolos){

            let variable = simbolo as Simbolos;

            //--> verifico que la variable no exista en la tabla de simbolos actual \
            if(ts.existeEnActual(variable.identificador)){
                let error = new Errores('Semantico', `La variable ${variable.identificador} ya existe en el entorno actual.`, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(`** Error Semantico : La variable ${variable.identificador} ya existe en el entorno actual. En la linea ${this.linea} y columan ${this.columna}`);
                continue;
            }

            //int p1 = 2;
            // int p2;
            if(variable.valor != null){
                let valor = variable.valor.getValor(controlador,ts);

                //TODO: Verificar que el tipo del valor obtenido sea igual al de la declaracion 
                let tipo_valor = variable.valor.getTipo(controlador,ts);
                console.log(tipo_valor, this.type.type);
                if(tipo_valor == this.type.type || (tipo_valor == tipo.DOBLE && this.type.type == tipo.ENTERO)){
                    //--> Lo agregamos a la tabla de simbolos 
                   
                    let nuevo_simb = new Simbolos(variable.simbolo, this.type, variable.identificador, valor);
                    ts.agregar(variable.identificador, nuevo_simb);
                    console.log("son del mismo tipo")
                }else{
                    //Error no se puede declarar por incopatibilidad de simbolos
                }
                
            }else{
                //--> Lo agregamos a la tabla de simbolos 
                let nuevo_simb = new Simbolos(variable.simbolo, this.type, variable.identificador, null);
                ts.agregar(variable.identificador, nuevo_simb);
            }

        }

    }

    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }

}