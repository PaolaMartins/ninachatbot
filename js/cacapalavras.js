"use strict";

/** as diferentes direções/orientações que uma palavra pode fluir na grade de palavras!
 *
 * note: vertical - left -> right
 *		 horizontal - top > bottom
 *		 primary diagonal - upper left corner -> lower right corner
 * 		 secondary diagonal - upper right corner -> lower left corner
 *
 * 'backwards' at the end of the string refers to it going the opposite direction (so
 *  bottom -> top or lower left -> upper right)
 */
var paths = { 

	vert: "vertical",
	horizon: "horizontal",
	priDiag: "primaryDiagonal",
	secDiag: "secondaryDiagonal",

	vertBack: "verticalBackwards",
	horizonBack: "horizonBackwards",
	priDiagBack: "primaryDiagonalBackwards",
	secDiagBack: "secondaryDiagonalBackwards",

};

/** este objeto configura os limites da matriz para cada orientação (apenas para garantir ao inserir
 * uma palavra no quadro em um determinado camiho, a palavra não excede o tamanho da matriz)
 *
 * @param {Number} x linha do índice da matriz atual
 * @param {Number} y coluna do índice da matriz atual
 * @param {Number} s tamanho (largura ou altura, tanto um como devem ser iguais) da matriz de letras
 */
var bounds = { 

	[paths.vert]: (x, y, s) => (x < s),
	[paths.horizon]: (x, y, s) => (y < s),
	[paths.priDiag]: (x, y, s) => (x < s) && (y < s),
	[paths.secDiag]: (x, y, s) =>  (x < s) && (y >= 0),

	[paths.vertBack]: (x, y, s) => (x >= 0),
	[paths.horizonBack]: (x, y, s) => (y >= 0),
	[paths.priDiagBack]: (x, y, s) => (x >= 0) && (y >= 0),
	[paths.secDiagBack]: (x, y, s) => (x >= 0) && (y < s)

};

/** este objeto pega a linha/coluna da matriz e a incrementa na 
 * direção do caminho dado
 *
 * @param {Number} x linha da matriz a ser incrementada
 * @param {Number} y coluna da matriz a ser incrementada
 * @return incrementa as coordenadas x e y (por um fator de 1)
 */
var incr = { 

	[paths.vert]: (x, y) => ({x: x+1, y: y}),
	[paths.horizon]: (x, y) => ({x: x, y: y+1}),
	[paths.priDiag]: (x, y) => ({x: x+1, y: y+1}),
	[paths.secDiag]: (x, y) => ({x: x+1, y: y-1}),

	[paths.vertBack]: (x, y) => ({x: x-1, y: y}),
	[paths.horizonBack]: (x, y) => ({x: x, y: y-1}),
	[paths.priDiagBack]: (x, y) => ({x: x-1, y: y-1}),
	[paths.secDiagBack]: (x, y) => ({x: x-1, y: y+1})

};