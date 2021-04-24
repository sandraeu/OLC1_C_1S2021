import Nodo from "src/Clases/Ast/Nodo";
import Controlador from "src/Clases/Controlador";
import { Expresion } from "src/Clases/Interfaces/Expresion";
import { TablaSimbolos } from "src/Clases/TablaSimbolos/TablaSimbolos";
import { tipo } from "src/Clases/TablaSimbolos/Tipo";

/**
 * @enum Este sirve para enumerar la lista de operadores que maneja el lenguaje 
 */
export enum Operador {
    SUMA,
    RESTA,
    MULTI,
    DIV,
    MENORQUE,
    MAYORQUE,
    AND,
    NOT,
    UNARIO,
    IGUALIGUAL,
    MAYORIGUAL
}

/**
 * @class Clase para el manejo de operaciones del programa
 */

export default class Operacion implements Expresion{

    public exp1 : Expresion;
    public exp2 : Expresion;
    public expU : boolean;
    public operador : Operador;
    public linea : number;
    public columna: number;
    public op : string; 
    /**
     * @constructor Creamos una nueva operacion
     * @param exp1 expresion izquierda de la operacion
     * @param op operador de la operacion
     * @param exp2 expresion derecha de la operacion
     * @param linea linea donde se ubica la operacion
     * @param columna columna donde se ubica la operacion
     * @param expU boolean que indica si la operacion es una expresion unaria
     */
    constructor(exp1, operador, exp2, linea, columna, expU ) {
        this.exp1 = exp1;
        this.exp2 = exp2;
        this.columna = columna;
        this.linea = linea;
        this.expU = expU;
        this.op = operador;
        this.operador = this.getOperador(operador);
    }

    /**
     * @function getOperador obtiene el tipo de operador que se maneja
     * @param op operador en string 
     * @returns retorna un tipo de operador 
     */
    getOperador(op : string): Operador{
        if(op == '+'){
            return Operador.SUMA;
        }else if(op == '-'){
            return Operador.RESTA;
        }else if(op == '<'){
            return Operador.MENORQUE;
        }else if(op == '*'){
            return Operador.MULTI;
        }else if(op == '/'){
            return Operador.DIV;
        }else if(op == '>'){
            return Operador.MAYORQUE;
        }else if(op == '&&'){
            return Operador.AND;
        }else if(op == '!'){
            return Operador.NOT;
        }else if(op == 'UNARIO'){
            return Operador.UNARIO;
        }else if(op == '=='){
            return Operador.IGUALIGUAL;
        }else if(op == '>='){
            return Operador.MAYORIGUAL;
        }
    }


    /**
     * En esta clase no agregaremos codigo en los metodos de abajo.
     * Ya que esta es la clase padre le heredamos el contructor a quienes extienden de el 
     */

    getTipo(controlador: Controlador, ts: TablaSimbolos) : tipo{
        throw new Error("Method not implemented.");
    }
    getValor(controlador: Controlador, ts: TablaSimbolos) {
        throw new Error("Method not implemented.");
    }
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }
    
}
