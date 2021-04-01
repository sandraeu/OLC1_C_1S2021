import Simbolos from "./Simbolos";


export class TablaSimbolos{

    public ant : TablaSimbolos;
    public tabla : Map<string, Simbolos>;


    /**
     * @constructor creamos una nueva tabla.
     * @param ant indica quien es la tabla anterior a la nueva tabla (para el manejo de ambitos)
     */
    constructor(ant : TablaSimbolos) {
        this.ant = ant;
        this.tabla = new Map<string, Simbolos>();
    }

    agregar(id: string, simbolo : Simbolos){
        this.tabla.set(id.toLowerCase(), simbolo); //convertimos a minuscula ya que nuestro lenguaje es caseinsitive ej. prueba = PRUeba
    }


    existe(id: string): boolean{
        let ts : TablaSimbolos = this;

        while(ts != null){
            let existe = ts.tabla.get(id);

            if(existe != null){
                return true;
            }
            ts = ts.ant;
        }
        return false;
    }

    
    existeEnActual(id: string): boolean{
        let ts : TablaSimbolos = this;

        let existe = ts.tabla.get(id);

        if(existe != null){
            return true;
        }
        return false;
    }

    // TODO: Agregar metodo para obtener un simbolo
    getSimbolo(id: string){
        let ts : TablaSimbolos = this; 

        while(ts != null){
            let existe = ts.tabla.get(id);

            if(existe != null){
                return existe;
            }
            ts = ts.ant;
        }
        return null;
    }
}