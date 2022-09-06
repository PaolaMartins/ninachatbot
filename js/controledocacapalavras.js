"use strict";

/** Este objeto configura o jogo de caça-palavras, assim como as funções dos botões (para resolver
 * e para atualizar/configurar um novo jogo).
 *
 * @author Noor Aftab
 *	
 * @param {String} gameId ID da div do jogo de busca de palavras (onde vai a grade real de de letras)
 * @param {String} listId ID do div onde vai a lista de palavras a serem encontradas
 * @param {String} solveId ID do button para resolver o quebra-cabeça
 * @param {String} newGameId ID do button para iniciar um novo jogo
 * @param {String} instructionsId ID para o h2 (para nos permitir atualizar seu texto com facilidade)
 * @param {String} themeId ID da parte do h3 (para mostrar o tema do caça-palavras)
 */

function WordSearchController(gameId, listId, solveId, newGameId, instructionsId, themeId) {

	//um objeto contendo vários tema/palavras para o jogo
	var searchTypes = {

		"Char!": [["bug", "drive", "void"],
			["string", "hardware", "software"]]

	};

	//variáveis para armazenar a lógica do jogo e sua visão
	var game;
	var view;

	//instruções para exibir no cabeçalho da h2
	var mainInstructions = "Procure a lista de palavras dentro da caixa e arraste para selecionar!";

	//chamada de função para iniciar o jogo de caça-palavras
	setUpWordSearch();

	/** escolhe aleatoriamente um tema de palavra e configura a matriz do jogo e o jogo 
	 * vista para refletir esse tema
	 */
	function setUpWordSearch() {

		//gera um tema aleatório 
		var searchTypesArray = Object.keys(searchTypes); //converte o objeto do tema em array
		var randIndex = Math.floor(Math.random()*searchTypesArray.length); //gera número/index
		var listOfWords = searchTypes[searchTypesArray[randIndex]]; //recupera a matriz de palavras do index

		//converte letras para maiúsculas
		convertToUpperCase(listOfWords); 

		//configura os títulos para refletir as instruções e temas
		updateHeadings(mainInstructions, searchTypesArray[randIndex]);

		//executa a lógica do jogo usando um close da lista de palavras (para evitar que o objeto real seja alterado)
		game = new WordSearchLogic(gameId, listOfWords.slice());
		game.setUpGame();

		//gera a visão do jogo e configura eventos do mouse para clicar e arrastar
		view = new WordSearchView(game.getMatrix(), game.getListOfWords(), gameId, listId, instructionsId);
		view.setUpView();
		view.triggerMouseDrag();

	}

	/** converter um determinado array 2D de palavras para todas as letras maiúsculas 
	 *
	 * @param {String[][]} wordList uma matriz de palavras para converter em maiúsculas
	 */
	function convertToUpperCase(wordList)  {

		for (var i = 0; i < wordList.length; i++) {

			for(var j = 0; j < wordList[i].length; j++) {

				wordList[i][j] = wordList[i][j].toUpperCase();

			}

		}

	}

	/** atualiza os títulos das instrunções (h2) e do tema (h3) de acordo com o
	 * parâmetros de texto
	 *
	 * @param {String} instructions texto de instrunções para definir o h2
	 * @param {String} theme texto do tema para definir o elemento do tema h3
	 */
	function updateHeadings(instructions, theme) {

		$(instructionsId).text(instructions);
		$(themeId).text(theme);

	}

	/** resolve o quebra-cabeça de busca de palavras quando o botão resolver é clicado
	 *
	 * @event WordSearchController#click
	 * @param {function} function a ser executada no clique do mouse
	 */
	$(solveId).click(function() {

		view.solve(game.getWordLocations(), game.getMatrix());

	});

	/** esvazia o jogo e lista divs e os  substitui por uma nova configuração, modelagem
	 * um efeito de 'atualização' quando o botão é clicado
	 *
	 * @param {function} function a ser executada no clique do mouse para um novo quebra-cabeça
	 */
	$(newGameId).click(function() {

		//esvazia os elementos do jogo e da lista, bem como o elemento span do tema h3
		$(gameId).empty();
		$(listId).empty();
		$(themeId).empty();

		//chama a configuração para criar um novo jogo de caça-palavras
		setUpWordSearch();

	})

}