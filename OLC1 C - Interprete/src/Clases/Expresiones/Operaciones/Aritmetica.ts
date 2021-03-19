import Nodo from "src/Clases/Ast/Nodo";
import Controlador from "src/Clases/Controlador";
import { Expresion } from "src/Clases/Interfaces/Expresion";
import { TablaSimbolos } from "src/Clases/TablaSimbolos/TablaSimbolos";
import { tipo } from "src/Clases/TablaSimbolos/Tipo";
import Operacion, { Operador } from "./Operaciones";


export default class Aritmetica extends Operacion  implements Expresion {

    public constructor(exp1, operador, exp2, linea, columna, expU ) {
        super(exp1, operador, exp2, linea, columna, expU);
    }

    getTipo(controlador: Controlador, ts: TablaSimbolos) : tipo{
        let valor = this.getValor(controlador, ts);

        if(typeof valor === 'number'){   
            return tipo.DOBLE;
        }else if(typeof valor === 'string'){
            return tipo.CADENA;
        }else if(typeof valor === 'boolean'){
            return tipo.BOOLEANO;
        }
    }

    getValor(controlador: Controlador, ts: TablaSimbolos) {
        let valor_exp1;
        let valor_exp2;
        let valor_expU;
        
        
        if(this.expU == false){
            valor_exp1 = this.exp1.getValor(controlador, ts);
            valor_exp2 = this.exp2.getValor(controlador, ts);
        }else{
            valor_expU = this.exp1.getValor(controlador, ts);
        }

        /**
         * Para las siguientes validaciones nos basamos en la tabla de 
         * de las operaciones aritmeticas permitidas que soporta el lenguaje descrito en el enunciado.
         */
        switch (this.operador) {
            case Operador.SUMA:
                if(typeof valor_exp1 === 'number'){
                    if(typeof valor_exp2 === 'number'){
                        return valor_exp1 + valor_exp2;
                    }else if(typeof valor_exp2 === 'boolean'){
                        let num = 1;
                        if(valor_exp2 == false){
                            num = 0;
                        }
                        return valor_exp1 + num;
                    }else if(typeof valor_exp2 === 'string'){
                        if(valor_exp2.length == 1){ //si es de tamaño 1 es un caracter
                            let numascii = valor_exp2.charCodeAt(0);
                            return valor_exp1 + numascii;
                        }else{
                            return valor_exp1 + valor_exp2; //se convierte a cadena
                        }
                    }
                }else if(typeof valor_exp1 === 'boolean'){
                    if(typeof valor_exp2 === 'number'){
                        let num = 1;
                        if(valor_exp1 == false){
                            num = 0;
                        }
                        return num + valor_exp2;
                    }else if(typeof valor_exp2 === 'boolean'){
                        //TODO: agregar error semantico.
                    }
                }
                
                break;

            case Operador.UNARIO:
                if(typeof valor_expU == 'number'){
                    return -valor_expU;
                }else{
                     //TODO: agregar error semantico.
                }
                break;
            case Operador.RESTA:
                if(typeof valor_exp1 === 'number'){
                    if(typeof valor_exp2 === 'number'){
                        return valor_exp1 - valor_exp2;
                    }//TODO: Agregar las otras validaciones
                }
                break;
            case Operador.MULTI:
                    if(typeof valor_exp1 === 'number'){
                        if(typeof valor_exp2 === 'number'){
                            return valor_exp1 * valor_exp2;
                        }//TODO: Agregar las otras validaciones
                    }
                    break;  
            case Operador.DIV:
                if(typeof valor_exp1 === 'number'){
                    if(typeof valor_exp2 === 'number'){
                        return valor_exp1 / valor_exp2;
                    }//TODO: Agregar las otras validaciones
                }
                break; 
            //TODO: Agregar otros casos de aritmeticas (POTENCIA, MODULO)
            default:
                //TODO: agregar errror que ser produjo algo inesperado.
                break;
        }

    }
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }
    
}