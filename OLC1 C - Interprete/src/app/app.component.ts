import { Component } from '@angular/core';
import Controlador from 'src/Clases/Controlador';
import Evaluar from 'src/Clases/Evaluar';
import { TablaSimbolos } from 'src/Clases/TablaSimbolos/TablaSimbolos';

import * as analizador from '../Clases/Analizar'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  

  //entrada : string = "";
  entrada : string = `//Realizar una gramatica que reconozca el siguiente archivo de entrada

  //Operacion aritmetica
  Evaluar[7 - (5 + 10 * (20 / 5 - 2 + 4 * (5 + 2 * 3)) - 8 * 3 * 2) + 50 * (6 * 2)]; //190
  
  //Operacion relacional
  Evaluar[(44.399 > 44.4)]; //false
  
  //Operacion logica
  Evaluar[!!!!!!!!!!!!true]; //true
  Evaluar[(78 < 78 && TRUE)]; //false
  `
  consola : string = "";


  ejecutar():void{
    let ana = new analizador.Analizador();
    this.consola = "";

    if(this.entrada != ""){
      let ejecutar = ana.ejecutar(this.entrada);

      this.consola = ejecutar.consola;
      document.getElementById("tablasimbols").innerHTML = ejecutar.ts;
    }
    /**
     * Inicializamos la tabla de simbolos y controlador 
     * En este espacio solo nos sirve de ejemplo en la clase 8
     
    let ts = new TablaSimbolos(null);
    let cont = new Controlador();

    if(this.entrada != ""){
      let arreglo : Array<Evaluar> = ana.ejecutar(this.entrada);

      for(let num of arreglo){
        this.consola += "El valor de la expresion es: " + num.resultado.getValor(cont,ts) + '\n';
      }
    }
    */
  }

  
  openPage(pageName) {
    // Hide all elements with class="tabcontent" by default */
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Remove the background color of all tablinks/buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
  
    document.getElementById(pageName).style.display = "block";
  
  }
  
}
