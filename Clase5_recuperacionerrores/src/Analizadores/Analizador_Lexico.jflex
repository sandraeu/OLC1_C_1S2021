/*--------------------------------------------------
 ------------  1ra Area: Codigo de Usuario ---------
 ---------------------------------------------------*/

//------> Paquetes,importaciones
package Analizadores;
import java_cup.runtime.*;
import javax.swing.JOptionPane;

/*----------------------------------------------------------
  ------------  2da Area: Opciones y Declaraciones ---------
  ----------------------------------------------------------*/
%%
%{
    //----> Codigo de usuario en sintaxis java
%}

//-------> Directivas
%public 
%class Analizador_Lexico
%cupsym Simbolos
%cup
%char
%column
%full
%ignorecase     
%line
%unicode

//------> Expresiones Regulares
digito              = [0-9]+
letra               = [a-zA-ZÑñ]+
id                  = {letra}({letra}|{digito}|"_")*
cadena              = [\"][^\"\n]+[\"]

LineTerminator = \r|\n|\r\n
InputCharacter = [^\r\n]

comentariosimple    = "//" {InputCharacter}* {LineTerminator}?
//------> Estados

%%

/*------------------------------------------------
  ------------  3ra Area: Reglas Lexicas ---------
  ------------------------------------------------*/

//-----> Simbolos

"%"         { System.out.println("Reconocio "+yytext()+" porc"); return new Symbol(Simbolos.porc, yycolumn, yyline, yytext()); }
"="         { System.out.println("Reconocio "+yytext()+" igual"); return new Symbol(Simbolos.igual, yycolumn, yyline, yytext()); }
";"         { System.out.println("Reconocio "+yytext()+" pyc"); return new Symbol(Simbolos.pyc, yycolumn, yyline, yytext()); }
"."         { System.out.println("Reconocio "+yytext()+" pnt"); return new Symbol(Simbolos.pnt, yycolumn, yyline, yytext()); }
"*"         { System.out.println("Reconocio "+yytext()+" kleen"); return new Symbol(Simbolos.kleen, yycolumn, yyline, yytext()); }
"|"         { System.out.println("Reconocio "+yytext()+" or"); return new Symbol(Simbolos.or, yycolumn, yyline, yytext()); }
"("         { System.out.println("Reconocio "+yytext()+" para"); return new Symbol(Simbolos.para, yycolumn, yyline, yytext()); }
")"         { System.out.println("Reconocio "+yytext()+" parc"); return new Symbol(Simbolos.parc, yycolumn, yyline, yytext()); }
""         { System.out.println("Reconocio "+yytext()+" or"); return new Symbol(Simbolos.or, yycolumn, yyline, yytext()); }

//-----> Palabras reservadas

"er"         { System.out.println("Reconocio "+yytext()+" e_r"); return new Symbol(Simbolos.e_r, yycolumn, yyline, yytext()); }

//-------> Simbolos ER
{digito}    { System.out.println("Reconocio "+yytext()+" digito"); return new Symbol(Simbolos.digito, yycolumn, yyline, yytext()); }
{id}        { System.out.println("Reconocio "+yytext()+" id"); return new Symbol(Simbolos.id, yycolumn, yyline, yytext()); }
{cadena}    { System.out.println("Reconocio "+yytext()+" cadena"); return new Symbol(Simbolos.cadena, yycolumn, yyline, yytext()); }

//------> Espacios
{comentariosimple}      {System.out.println("Comentario: "+yytext()); }
[ \t\r\n\f]             {/* Espacios en blanco, se ignoran */}

//-------> Errores Lexicos 
.           {System.out.println("Error Lexico " + yytext() + "Linea: " + yyline + "Columna: " + yycolumn); }

