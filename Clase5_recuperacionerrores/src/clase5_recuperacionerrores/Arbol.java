/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package clase5_recuperacionerrores;

import java.awt.Desktop;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

/**
 *
 * @author sandr
 */
public class Arbol {
    
    public Nodo raiz;
    
    public Arbol(Nodo raiz){
        this.raiz = raiz;
    }
    
    public void GraficarSintactico(){
        String grafica = "Digraph Arbol_Sintactico{\n\n" + GraficaNodos(this.raiz, "0") + "\n\n}";        
        GenerarDot(grafica);

    }
    
    private String GraficaNodos(Nodo nodo, String i){
        int k=0; 
        String r = "";
        String nodoTerm = nodo.token;
        nodoTerm = nodoTerm.replace("\"", "");
        r= "node" + i + "[label = \"" + nodoTerm + "\"];\n";
        
        for(int j =0 ; j<=nodo.hijos.size()-1; j++){
            r = r + "node" + i + " -> node" + i + k + "\n";
            r= r + GraficaNodos(nodo.hijos.get(j), ""+i+k);
            k++;
        }
        
        if( !(nodo.lexema.equals("")) ){
            String nodoToken = nodo.lexema;
            nodoToken = nodoToken.replace("\"", "");
            r += "node" + i + "c[label = \"" + nodoToken + "\"];\n";
            r += "node" + i + " -> node" + i + "c\n";
        }
        
        return r;
    }
    
    private void GenerarDot(String cadena){
        FileWriter fichero = null;
        PrintWriter escritor = null;
        try{
            fichero = new FileWriter("Arbol_Sintactico.dot");
            escritor = new PrintWriter(fichero);
            escritor.println(cadena);
            escritor.close();
            fichero.close();
            reportar();
        } catch (Exception e) {
            System.out.println("error en generar dot");
            e.printStackTrace();
        }
    }
    
    public void reportar() throws IOException {
        
        String file_input_path = "Arbol_Sintactico.dot";
        String do_path = "C:\\Program Files (x86)\\Graphviz2.38\\bin\\dot.exe";
        
        String file_get_path =  "Arbol_Sintactico.jpg" ;
        try {
            ProcessBuilder pBuilder;
            pBuilder = new ProcessBuilder(do_path, "-Tjpg", "-o", file_get_path, file_input_path);
            pBuilder.redirectErrorStream(true);
            pBuilder.start();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
       
     
       Desktop.getDesktop().open(new File(file_get_path));
    }
    
}
