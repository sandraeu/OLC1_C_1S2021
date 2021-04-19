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
  entrada : string = `  //Archivo de entrada del ejemplo del interprete realizado en laboratorio

  /* DECLARACIONES DE VARIABLES 
  	podemos visualizar que guardamos las declaraciones al dar click en ejecutar 
    y despues dar click en la pestaña de abajo que dice "Tabla de Simbolos"
  	podremos visualizar las variables e informacion importante como su valor */
  
  int entero = 30, edad =18;
  double decimal = 10.9999;
  string cadena = "Hola Mundo", concat = 'a' + 'b' + 'c';
  boolean verdadero = true, falso = false, bandera = false;
  
  //EJECUCION DEL CODIGO
	ejecutar main();
	
  //METODOS 
  void main(){
    print("** Inicia la ejecucion del codigo del programa **");
    
    //Llamadas de metodos
    asignacion_a_var_globales();
    operador_ternario();
    sentencia_elseif();
    sentencia_else();
    ciclo_while();
    sentencias();
  }

  void asignacion_a_var_globales(){
    // ASIGNACIONES DE VARIABLES 
	 entero = 7 - (5 + 10 * (20 / 5 - 2 + 4 * (5 + 2 * 3)) - 8 * 3 * 2) + 50 * (6 * 2); // entero = 190
     decimal = 22.99 + 243.18 + 16.5 - 153.21; //129.46
     cadena = "Si sale compi 1" + ":D";
     verdadero = !!!!!!!!!!!!true; //true
     falso = (78 < 78 && TRUE); //false
  }

	void operador_ternario(){
      // Operador ternario 
      bandera = edad > 17 ? true : false;
      //prueba de if y operador ternario
      if(bandera){
          print("Ternario funciona correctamente.");
      }else{
          print("No funciono el ternario");
      }
    }
	
	void sentencia_elseif(){
      //Prueba de else if
      if(2>3){
          print("Error en la validacion del if.");
      }else if(bandera){
          print("Funciona el else if :D");
      }
    }
	
	void sentencia_else(){
      //Prueba else 
      if(2>3){
          print("Error en la validacion del if.");
      }else if(edad < 10){
          print("Error en la validacion del else if.");
      }else if(edad < 11){
          print("Error en la validacion del else if.");
      }else{
          print("Funciona el Else :D");
      }
    }
	
	void ciclo_while(){
      //ciclo while
      int cont = 0;
      while(cont < 2){
          print("Esto se imprime 2 veces");
          cont = cont + 1;
      }
    }
	
	void sentencias(){
	//Prueba if dentro de ciclo while
      double index = 0;
      while (index >= 0) {
          if (index == 0) {
              index = index + 100;
          } else if (index > 50) {
              index = index / 2 - 25;
          } else {
              index = (index / 2) - 1;
          }

          print(index);
      }
    }
/* Salida del programa 
  ** Inicia la ejecucion del codigo del programa **	
  Ternario funciona correctamente.
  Funciona el else if :D
  Funciona el Else :D
  Esto se imprime 2 veces
  Esto se imprime 2 veces
  100
  25
  11.5
  4.75
  1.375
  -0.3125 
*/
  
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
