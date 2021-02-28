/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package clase5_recuperacionerrores;

/**
 *
 * @author sandr
 */
public class Expresiones {
    public String id;
    public Arbol raiz;
    
    public Expresiones(String id, Arbol raiz){
        this.raiz = raiz;
        this.id = id;
    }
    
    public String getId(){
        return id;
    }
    
    public void setId(String id){
        this.id = id;
    }
    
    public Arbol getArbol(){
        return raiz;
    }
    
}
