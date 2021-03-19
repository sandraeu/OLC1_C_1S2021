import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";


export default class  Primitivo implements Expresion{

    public primitivo : any; 
    public linea : number;
    public columna : number;

    /**
     * @constructor creamos un nuevo primitivo
     * @param primitivo hace referencia a los valores enteros, dobles, cadenas, caracteres, booleanos
     * @param linea idica la linea donde se encuentra
     * @param columna indica la columna donde se encuentra
     */
    constructor(primitivo : any, linea: number, columna : number) {
        this.columna = columna;
        this.linea = linea;
        this.primitivo = primitivo;
    }

    getTipo(controlador: Controlador, ts: TablaSimbolos) :tipo {
        let valor = this.getValor(controlador, ts);

        if(typeof valor === 'number'){   
            return tipo.DOBLE;
        }else if(typeof valor === 'string'){
            return tipo.CADENA;
        }else if(typeof valor === 'boolean'){
            return tipo.BOOLEANO;
        }
    }

    /**
     * @returns retorna el valor exacto del primitivo 
     */
    getValor(controlador: Controlador, ts: TablaSimbolos) {
        return this.primitivo;
    }
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }

}