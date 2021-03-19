import * as sintactico from '../Analizadores/gramatica'

import * as sintactico_interprete from '../Analizadores/A_interprete'

/**
 * @class Esta clase manda a analizar la entrada 
 */
export class Analizador{

    public ejecutar(input):any{
        console.log("vamos a analizar la entrada");

        try {
            //let salida = sintactico.parse(input);
            let salida = sintactico_interprete.parse(input);
            return salida;
        } catch (error) {
            console.log("Ocurrio un error al analizar la entrada");
            return "Ocurrio un error al analizar"
        }
    }

}