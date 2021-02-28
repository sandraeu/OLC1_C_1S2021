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
public class Error {
    public String tipo;
    public String descripcion;
    public int fila, columna;
    
    public Error(String tipo, String descripcion, int fila, int columna){
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.fila = fila;
        this.columna = columna;
    }
    
    public String getTipo(){
        return tipo;
    }
    
    public String getDescripcion(){
        return descripcion;
    }
    
    public int getFila(){
        return fila;
    }
    public int getColumna(){
        return columna;
    }
    
    
}
