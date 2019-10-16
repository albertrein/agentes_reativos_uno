class Agente{
	constructor(uno){
		this.cartasNaMao = [];
		
		//pega 7 cartas do baralho
		this.pegaCartaDoBaralho();
		
	}

	pegaCartaDoBaralho(quantidade = 7){
		for(let i = 0; i < quantidade; i++){
			this.cartasNaMao.push(uno.retiraCartaDoBaralho());
		}
	}

	//realizaJogada
		//Observa ambiente
		//procura cartas na lista de cartasNaMao
	
	//pegaNumeroCartas especifico de cartas do baralho

	//--metodos-- dos agente
//inicia jogo _construct(embaralha)
//embaralhar
//RemoveCarta (remove carta do baralho)
}