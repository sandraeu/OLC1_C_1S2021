
/* Ejemplo clase 7. */

/* Definicion lexica */
%lex
%options case-insensitive
%option yylineno

/* Expresiones regulares */
num     [0-9]+

//--> Cadena
escapechar  [\'\"\\ntr]
escape      \\{escapechar}
aceptacion  [^\"\\]+
cadena      (\"({escape} | {aceptacion})*\")

//--> Char
caracter     (\'({escape} | {aceptacion})*\')

%%

/* Comentarios */
"//".*              {/* Ignoro los comentarios simples */}

/* Simbolos del programa */


"++"                    { console.log("Reconocio : "+ yytext); return 'INCRE'}
"("                    { console.log("Reconocio : "+ yytext); return 'PARA'}
")"                    { console.log("Reconocio : "+ yytext); return 'PARC'}
"["                    { console.log("Reconocio : "+ yytext); return 'CORA'}
"]"                    { console.log("Reconocio : "+ yytext); return 'CORC'}
";"                    { console.log("Reconocio : "+ yytext); return 'PYC'}

/* Operadores Aritmeticos */
"+"                    { console.log("Reconocio : "+ yytext); return 'MAS'}
"-"                   { console.log("Reconocio : "+ yytext); return 'MENOS'}
"*"                   { console.log("Reconocio : "+ yytext); return 'MULTI'}
"/"                   { console.log("Reconocio : "+ yytext); return 'DIV'}

/* Operadores Relacionales */
"<"                    { console.log("Reconocio : "+ yytext); return 'MENORQUE'}
">"                   { console.log("Reconocio : "+ yytext); return 'MAYORQUE'}

/* Operadores Logicos */
"&&"                    { console.log("Reconocio : "+ yytext); return 'AND'}
"!"                   { console.log("Reconocio : "+ yytext); return 'NOT'}

/* Palabras reservadas */
"evaluar"               { console.log("Reconocio : "+ yytext); return 'EVALUAR'}
"true"               { console.log("Reconocio : "+ yytext); return 'TRUE'}
"false"               { console.log("Reconocio : "+ yytext); return 'FALSE'}

/* SIMBOLOS ER */
[0-9]+("."[0-9]+)?\b        { console.log("Reconocio : "+ yytext); return 'DECIMAL'}
"{num}"                    { console.log("Reconocio : "+ yytext); return 'ENTERO'}
"{cadena}"                    { console.log("Reconocio : "+ yytext); return 'CADENA'}
"{caracter}"                    { console.log("Reconocio : "+ yytext); return 'CHAR'}

/* Espacios */
[\s\r\n\t]                  {/* skip whitespace */}


<<EOF>>               return 'EOF'

/* Errores lexicos */
.                     return 'ERROR'

/lex

/* Area de imports */
%{
    const evaluar = require('../Clases/Evaluar');
    const aritmetica = require('../Clases/Expresiones/Operaciones/Aritmetica');
    const logica = require('../Clases/Expresiones/Operaciones/Logica');
    const relacional = require('../Clases/Expresiones/Operaciones/Relacional');
    const primitivo = require('../Clases/Expresiones/Primitivo');

%}

/* Precedencia de operadores de mayor a menor */

%left 'AND'
%right 'NOT'
%left 'MENORQUE' 'MAYORQUE' 
%left 'MAS' 'MENOS'
%left 'MULTI' 'DIV'
%right 'UNARIO'


%start inicio

%% /* Gramatica */


inicio
    : instrucciones EOF { $$ = $1;  return $$; }
    ;

instrucciones : instrucciones instruccion   { $$ = $1; $$.push($2); }
            | instruccion                   {$$= new Array(); $$.push($1); }
            ;

instruccion : EVALUAR CORA e CORC PYC { $$ = new evaluar.default($3); }
            ;

e : e MAS e             {$$ = new aritmetica.default($1, '+', $3, $1.first_line, $1.last_column, false);}
    | e MENOS e         {$$ = new aritmetica.default($1, '-', $3, $1.first_line, $1.last_column, false);}
    | e MULTI e         {$$ = new aritmetica.default($1, '*', $3, $1.first_line, $1.last_column, false);}
    | e DIV e           {$$ = new aritmetica.default($1, '/', $3, $1.first_line, $1.last_column, false);}
    | e AND e           {$$ = new logica.default($1, '&&', $3, $1.first_line, $1.last_column, false);}
    | NOT e             {$$ = new logica.default($2, '!', null, $1.first_line, $1.last_column, true);}
    | e MAYORQUE e      {$$ = new relacional.default($1, '>', $3, $1.first_line, $1.last_column, false);}
    | e MENORQUE e      {$$ = new relacional.default($1, '<', $3, $1.first_line, $1.last_column, false);}
    | MENOS e %prec UNARIO {$$ = new aritmetica.default($2, 'UNARIO', null, $1.first_line, $1.last_column, true);}
    | PARA e PARC       {$$ = $2;}
    | DECIMAL           {$$ = new primitivo.default(Number(yytext), $1.first_line, $1.last_column);}
    | ENTERO            {$$ = new primitivo.default(Number(yytext), $1.first_line, $1.last_column);}
    | CADENA            {$1 = $1.slice(1, $1.length-1); $$ = new primitivo.default($1, $1.first_line, $1.last_column);}
    | CHAR              {$1 = $1.slice(1, $1.length-1); $$ = new primitivo.default($1, $1.first_line, $1.last_column);}
    | TRUE              {$$ = new primitivo.default(true, $1.first_line, $1.last_column);}
    | FALSE             {$$ = new primitivo.default(false, $1.first_line, $1.last_column);}
    ;

