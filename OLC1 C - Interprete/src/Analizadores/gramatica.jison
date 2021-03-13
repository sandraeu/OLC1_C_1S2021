
/* Ejemplo clase 7. */

/* Definicion lexica */
%lex
%options case-insensitive

num     [0-9]+

%%

/* Comentarios */
"//".*              {/* Ignoro los comentarios simples */}

/* Simbolos del programa */
"*"                   { console.log("Reconocio : "+ yytext); return 'MULTI'}
"/"                   { console.log("Reconocio : "+ yytext); return 'DIV'}
"-"                   { console.log("Reconocio : "+ yytext); return 'RESTA'}
"++"                    { console.log("Reconocio : "+ yytext); return 'INCRE'}
"+"                    { console.log("Reconocio : "+ yytext); return 'SUMA'}
"("                    { console.log("Reconocio : "+ yytext); return 'PARA'}
")"                    { console.log("Reconocio : "+ yytext); return 'PARC'}
"["                    { console.log("Reconocio : "+ yytext); return 'CORA'}
"]"                    { console.log("Reconocio : "+ yytext); return 'CORC'}
";"                    { console.log("Reconocio : "+ yytext); return 'PYC'}


/* Palabras reservadas */
"evaluar"               { console.log("Reconocio : "+ yytext); return 'EVALUAR'}

/* SIMBOLOS ER */
[0-9]+("."[0-9]+)?\b  { console.log("Reconocio : "+ yytext); return 'DECIMAL'}
"{num}"                    { console.log("Reconocio : "+ yytext); return 'ENTERO'}

/* Espacios */
[\s\r\n\t]                  {/* skip whitespace */}


<<EOF>>               return 'EOF'

/* Errores lexicos */
.                     return 'ERROR'

/lex

/* Area de imports */
%{
    const evaluar = require('../Clases/Evaluar');
%}

/* Precedencia de operadores */

%left 'SUMA' 'RESTA'
%left 'MULTI' 'DIV'
%left UNARIO

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

e : e SUMA e {$$ = $1+$3;}
    | e RESTA e {$$ = $1-$3;}
    | e MULTI e {$$ = $1*$3;}
    | e DIV e {$$ = $1/$3;}
    | RESTA e %prec UNARIO {$$ = -$2;}
    | PARA e PARC {$$ = $2;}
    | DECIMAL {$$ = Number(yytext);}
    | ENTERO {$$ = Number(yytext);}
    ;

