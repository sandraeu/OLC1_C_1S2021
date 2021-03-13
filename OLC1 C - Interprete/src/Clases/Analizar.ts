import * as sintactico from '../Analizadores/gramatica'

export class Analizador{

    public ejecutar(input):any{
        console.log("vamos a analizar la entrada");

        try {
            let salida = sintactico.parse(input);
            return salida;
        } catch (error) {
            console.log("Ocurrio un error al analizar");
            return "Ocurrio un error al analizar"
        }
    }

}