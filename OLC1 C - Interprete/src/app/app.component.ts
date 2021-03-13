import { Component } from '@angular/core';
import Evaluar from 'src/Clases/Evaluar';

import * as analizador from '../Clases/Analizar'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  

  //entrada : string = "";
  entrada : string = `//Realizar una gramatica que reconozca el siguiente archivo de entrada

  Evaluar[1+1];
  Evaluar[1+1*2];
  Evaluar[-(1+1*6/3-5+7)];
  Evaluar[-(1+1*6/3-5+1*-2)];
  Evaluar[-(1.6+1.45)];`
  consola : string = "";


  ejecutar():void{
    let ana = new analizador.Analizador();

    if(this.entrada != ""){
      let arreglo : Array<Evaluar> = ana.ejecutar(this.entrada);

      for(let num of arreglo){
        this.consola += "El valor de la expresion es: " + num.resultado + '\n';
      }
    }
  }
  
}
