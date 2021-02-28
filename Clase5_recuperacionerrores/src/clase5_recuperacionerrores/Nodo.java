/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package clase5_recuperacionerrores;

import java.util.ArrayList;

/**
 *
 * @author sandr
 */
public class Nodo {
    public String token;
    public String lexema;
    public int id;
    public Nodo hijoIzq;
    public Nodo hijoDer;
    
    public ArrayList<Nodo> hijos = new ArrayList<Nodo>();
    
    public Nodo(String token, String lexema, int id, Nodo hijoIzq, Nodo hijoDer){
        this.hijoDer = hijoDer;
        this.hijoIzq = hijoIzq;
        this.id =id;
        this.lexema = lexema;
        this.token = token;
        
        if(hijoIzq != null){
            this.hijos.add(hijoIzq);
        }
        if(hijoDer != null){
            this.hijos.add(hijoDer);
        }
                
    }
    
}
