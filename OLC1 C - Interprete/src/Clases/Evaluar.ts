export default class Evaluar{
    public resultado : number;

    constructor(resultado: number) {
        this.resultado = resultado;
    }

    get_Resultado():number{
        return this.resultado;
    }
}