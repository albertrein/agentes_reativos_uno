class Agente{
	constructor(uno, nome = 'Smith'){
		this.cartasNaMao = [];
		this.nomeAgente = nome;

		//pega 7 cartas do baralho
		//this.pegaCartaDoBaralho();
		
	}

	pegaCartaDoBaralho(quantidade = 7){
		for(let i = 0; i < quantidade; i++){

			uno.retiraCartaDoBaralho().then( (carta) => {
				//Executa promise, resolve retorna a última carta do baralho
				this.cartasNaMao.push(uno.retiraCartaDoBaralho());
			}).catch( (error) => {
				//Reject erro. Acabou as cartas do baralho.
				throw error;
			});			

		}
	}

	mostrarCartasNaMao(){ this.pegaCartaDoBaralho(); console.log(this.cartasNaMao); }

	async realizaJogada(){
		//Observa ambiente
			//Observa ultima carta jogada e realiza operação de acordo com ela

		if(this.cartasNaMao.length <= 0){
			thrown this.nomeAgente + ' Ganhou!';
		}

	}

	/*
	todo list		
		- realizaJogada
			- observar ambiente
			- Jogar de acordo
	*/

}