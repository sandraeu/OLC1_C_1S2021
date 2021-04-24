
/* Ejemplo clase 7. */

/* Definicion lexica */
%lex
%options case-insensitive
%option yylineno

/* Expresiones regulares */
num     [0-9]+
id      [a-zñA-ZÑ_][a-zñA-ZÑ0-9_]*
//--> Cadena
escapechar  [\'\"\\ntr]
escape      \\{escapechar}
aceptacion  [^\"\\]+
cadena      (\"({escape} | {aceptacion})*\")

//--> Caracter
escapechar2  [\\ntr]
escape2      \\{escapechar2}
aceptada2    [^\'\\]
caracter     (\'({escape2}|{aceptada2})\')

%%

/* Comentarios */
"//".*              {/* Ignoro los comentarios simples */}
"/*"((\*+[^/*])|([^*]))*\**"*/"     {/*Ignorar comentarios con multiples lneas*/}  


/* Simbolos del programa */

"++"                    { console.log("Reconocio : "+ yytext); return 'INCRE'}
"("                    { console.log("Reconocio : "+ yytext); return 'PARA'}
")"                    { console.log("Reconocio : "+ yytext); return 'PARC'}
"["                    { console.log("Reconocio : "+ yytext); return 'CORA'}
"]"                    { console.log("Reconocio : "+ yytext); return 'CORC'}

";"                    { console.log("Reconocio : "+ yytext); return 'PYC'}
","                    { console.log("Reconocio : "+ yytext); return 'COMA'}
"=="                    { console.log("Reconocio : "+ yytext); return 'IGUALIGUAL'}
"="                    { console.log("Reconocio : "+ yytext); return 'IGUAL'}
"?"                    { console.log("Reconocio : "+ yytext); return 'INTERROGACION'}
":"                    { console.log("Reconocio : "+ yytext); return 'DSPNTS'}
"{"                    { console.log("Reconocio : "+ yytext); return 'LLAVA'}
"}"                    { console.log("Reconocio : "+ yytext); return 'LLAVC'}

/* Operadores Aritmeticos */
"+"                    { console.log("Reconocio : "+ yytext); return 'MAS'}
"-"                   { console.log("Reconocio : "+ yytext); return 'MENOS'}
"*"                   { console.log("Reconocio : "+ yytext); return 'MULTI'}
"/"                   { console.log("Reconocio : "+ yytext); return 'DIV'}

/* Operadores Relacionales */
"<"                    { console.log("Reconocio : "+ yytext); return 'MENORQUE'}
">="                   { console.log("Reconocio : "+ yytext); return 'MAYORIGUAL'}
">"                   { console.log("Reconocio : "+ yytext); return 'MAYORQUE'}

/* Operadores Logicos */
"&&"                    { console.log("Reconocio : "+ yytext); return 'AND'}
"!"                   { console.log("Reconocio : "+ yytext); return 'NOT'}

/* Palabras reservadas */
"evaluar"               { console.log("Reconocio : "+ yytext); return 'EVALUAR'}
"true"               { console.log("Reconocio : "+ yytext); return 'TRUE'}
"false"               { console.log("Reconocio : "+ yytext); return 'FALSE'}
"int"               { console.log("Reconocio : "+ yytext); return 'INT'}
"double"               { console.log("Reconocio : "+ yytext); return 'DOUBLE'}
"string"               { console.log("Reconocio : "+ yytext); return 'STRING'}
"char"               { console.log("Reconocio : "+ yytext); return 'CHAR'}
"boolean"               { console.log("Reconocio : "+ yytext); return 'BOOLEAN'}
"print"               { console.log("Reconocio : "+ yytext); return 'PRINT'}
"if"               { console.log("Reconocio : "+ yytext); return 'IF'}
"while"               { console.log("Reconocio : "+ yytext); return 'WHILE'}
"else"               { console.log("Reconocio : "+ yytext); return 'ELSE'}
"void"               { console.log("Reconocio : "+ yytext); return 'VOID'}
"ejecutar"               { console.log("Reconocio : "+ yytext); return 'EJECUTAR'}
"break"               { console.log("Reconocio : "+ yytext); return 'BREAK'}

/* SIMBOLOS ER */
[0-9]+("."[0-9]+)?\b        { console.log("Reconocio : "+ yytext); return 'DECIMAL'}
{num}                    { console.log("Reconocio : "+ yytext); return 'ENTERO'}
{id}                    { console.log("Reconocio : "+ yytext); return 'ID'}
{cadena}                    { console.log("Reconocio : "+ yytext); return 'CADENA'}
{caracter}                    { console.log("Reconocio : "+ yytext); return 'CHAR'}

/* Espacios */
[\s\r\n\t]                  {/* skip whitespace */}


<<EOF>>               return 'EOF'

/* Errores lexicos */
.                     { console.log("Error Lexico "+yytext
                        +" linea "+yylineno
                        +" columna "+(yylloc.last_column+1));

                        new errores.default('Lexico', 'El caracter ' + yytext 
                                + ' no forma parte del lenguaje', 
                                yylineno+1, 
                                yylloc.last_column+1); 
                                      
                        }

/lex

/* Area de imports */
%{
    const evaluar = require('../Clases/Evaluar');
    const aritmetica = require('../Clases/Expresiones/Operaciones/Aritmetica');
    const logica = require('../Clases/Expresiones/Operaciones/Logica');
    const relacional = require('../Clases/Expresiones/Operaciones/Relacional');
    const primitivo = require('../Clases/Expresiones/Primitivo');


    const ast = require('../Clases/Ast/Ast');
    const declaracion = require('../Clases/Instrucciones/Declaracion');
    const asignacion = require('../Clases/Instrucciones/Asignacion');
    const simbolo = require('../Clases/TablaSimbolos/Simbolos');
    const tipo = require('../Clases/TablaSimbolos/Tipo');

    const identificador = require('../Clases/Expresiones/Identificador');
    const ternario = require('../Clases/Expresiones/Ternario');

    const Print = require('../Clases/Instrucciones/Print');
    const Ifs = require('../Clases/Instrucciones/SentenciaControl/Ifs');
    const While = require('../Clases/Instrucciones/SentenciaCiclica/While');

    const funcion = require('../Clases/Instrucciones/Funcion');
    const llamada = require('../Clases/Instrucciones/Llamada');

    const ejecutar = require('../Clases/Instrucciones/Ejecutar');

    const detener = require('../Clases/Instrucciones/SentenciaTransferencia/Break');
    const errores = require('../Clases/Ast/Errores');

%}

/* Precedencia de operadores de mayor a menor */

%right 'INTERROGACION'
%left 'AND'
%right 'NOT'
%left 'MENORQUE' 'MAYORQUE' 'IGUALIGUAL' 'MAYORIGUAL'
%left 'MAS' 'MENOS'
%left 'MULTI' 'DIV'
%right 'UNARIO'


%start inicio

%% /* Gramatica */


inicio
    : instrucciones EOF { console.log($1); $$= new ast.default($1);  return $$; }
    ;

instrucciones : instrucciones instruccion   { $$ = $1; $$.push($2); }
            | instruccion                   {$$= new Array(); $$.push($1); }
            ;

instruccion : declaracion   {$$ = $1; }
            | asignacion    { $$ = $1; }
            | print         { $$ = $1; }
            | sent_if       { $$ = $1; }
            | sent_while    { $$ = $1; } 
            | funciones     { $$ = $1; }
            | llamada PYC   { $$ = $1; }
            | EJECUTAR llamada PYC { $$ = new ejecutar.default($2, @1.first_line, @1.last_column); }
            | BREAK PYC     { $$ = new detener.default(); }
            | error         { console.log("Error Sintactico" + yytext 
                                    + "linea: " + this._$.first_line 
                                    + "columna: " + this._$.first_column); 
                        
                                new errores.default("Lexico", "No se esperaba el caracter "+ yytext , 
                                                this._$.first_line ,this._$.first_column);            
                            }
 
            ;

declaracion : tipo lista_simbolos PYC   { $$ = new declaracion.default($1, $2, @1.first_line, @1.last_column); }
            ; 

tipo : INT      { $$ = new tipo.default('ENTERO'); }
    | DOUBLE    { $$ = new tipo.default('DOBLE'); }
    | STRING    { $$ = new tipo.default('STRING'); }
    | CHAR      { $$ = new tipo.default('CHAR'); }
    | BOOLEAN   { $$ = new tipo.default('BOOLEAN'); }
    ;
/**
    lista de simbolos
    p1, p2 =90, p3 =190
    p1 
    p2 = 19
**/
lista_simbolos : lista_simbolos COMA ID          { $$ = $1; $$.push(new simbolo.default(1,null,$3, null)); }
            | lista_simbolos COMA ID IGUAL e    { $$ = $1; $$.push(new simbolo.default(1,null,$3, $5)); }
            | ID               { $$ = new Array(); $$.push(new simbolo.default(1,null,$1, null)); }
            | ID IGUAL e      { $$ = new Array(); $$.push(new simbolo.default(1,null,$1, $3)); }
            ;

asignacion : ID IGUAL e PYC   { $$ = new asignacion.default($1,$3, @1.first_line, @1.last_column); }
            ; 

sent_if : IF PARA e PARC LLAVA instrucciones LLAVC { $$ = new Ifs.default($3, $6, [], @1.first_line, @1.last_column); }
        | IF PARA e PARC LLAVA instrucciones LLAVC ELSE LLAVA instrucciones LLAVC { $$ = new Ifs.default($3, $6, $10, @1.first_line, @1.last_column); }
        | IF PARA e PARC LLAVA instrucciones LLAVC ELSE sent_if { $$ = new Ifs.default($3, $6, [$9], @1.first_line, @1.last_column); }
        ;
 
sent_while : WHILE PARA e PARC LLAVA instrucciones LLAVC { $$ = new While.default($3, $6, @1.first_line, @1.last_column); }
            ; 

print : PRINT PARA e PARC PYC  {$$ = new Print.default($3, @1.first_line, @1.last_column); }
    ; 

funciones : VOID ID PARA PARC LLAVA instrucciones LLAVC     { $$ = new funcion.default(3, new tipo.default('VOID'), $2, [], true, $6, @1.first_line, @1.last_column ); }
        | VOID ID PARA lista_parametros PARC LLAVA instrucciones LLAVC  { $$ = new funcion.default(3, new tipo.default('VOID'), $2, $4, true, $7, @1.first_line, @1.last_column ); }
        ;

lista_parametros : lista_parametros COMA tipo ID    { $$ = $1; $$.push(new simbolo.default(6,$3, $4, null)); }
                | tipo ID                           { $$ = new Array(); $$.push(new simbolo.default(6,$1,$2, null)); }
                ;

llamada : ID PARA PARC              { $$ = new llamada.default($1, [],@1.first_line, @1.last_column ); }
        | ID PARA lista_exp PARC    { $$ = new llamada.default($1, $3 ,@1.first_line, @1.last_column ); }
        ;

lista_exp : lista_exp COMA e        { $$ = $1; $$.push($3); }
        | e                         { $$ = new Array(); $$.push($1); }
        ;

e :   e MAS e             {$$ = new aritmetica.default($1, '+', $3, $1.first_line, $1.last_column, false);}
    | e MENOS e         {$$ = new aritmetica.default($1, '-', $3, $1.first_line, $1.last_column, false);}
    | e MULTI e         {$$ = new aritmetica.default($1, '*', $3, $1.first_line, $1.last_column, false);}
    | e DIV e           {$$ = new aritmetica.default($1, '/', $3, $1.first_line, $1.last_column, false);}
    | e AND e           {$$ = new logica.default($1, '&&', $3, $1.first_line, $1.last_column, false);}
    | NOT e             {$$ = new logica.default($2, '!', null, $1.first_line, $1.last_column, true);}
    | e MAYORQUE e      {$$ = new relacional.default($1, '>', $3, $1.first_line, $1.last_column, false);}
    | e MAYORIGUAL e      {$$ = new relacional.default($1, '>=', $3, $1.first_line, $1.last_column, false);}
    | e MENORQUE e      {$$ = new relacional.default($1, '<', $3, $1.first_line, $1.last_column, false);}
    | e IGUALIGUAL e      {$$ = new relacional.default($1, '==', $3, $1.first_line, $1.last_column, false);}
    | MENOS e %prec UNARIO {$$ = new aritmetica.default($2, 'UNARIO', null, $1.first_line, $1.last_column, true);}
    | PARA e PARC       {$$ = $2;}
    | DECIMAL           {$$ = new primitivo.default(Number(yytext), $1.first_line, $1.last_column);}
    | ENTERO            {$$ = new primitivo.default(Number(yytext), $1.first_line, $1.last_column);}
    | CADENA            {$1 = $1.slice(1, $1.length-1); $$ = new primitivo.default($1, $1.first_line, $1.last_column);}
    | CHAR              {$1 = $1.slice(1, $1.length-1); $$ = new primitivo.default($1, $1.first_line, $1.last_column);}
    | TRUE              {$$ = new primitivo.default(true, $1.first_line, $1.last_column);}
    | FALSE             {$$ = new primitivo.default(false, $1.first_line, $1.last_column);}
    | ID                {$$ = new identificador.default($1, @1.first_line, @1.last_column); }
    | e INTERROGACION e DSPNTS e {$$ = new ternario.default($1, $3, $5, @1.first_line, @1.last_column); } 
    | ID INCRE          {$$ = new aritmetica.default(new identificador.default($1, @1.first_line, @1.last_column), '+', new primitivo.default(1, $1.first_line, $1.last_column), $1.first_line, $1.last_column, false);}
    ;


//--> La siguiente produccion solo sirvio para fines de ejemplo en la clase 8
instruccion_clase8 : EVALUAR CORA e CORC PYC { $$ = new evaluar.default($3); }
            ;