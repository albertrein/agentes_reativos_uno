class Agente{
	constructor(uno, nome = 'Smith'){
		this.cartasNaMao = [];
		this.nomeAgente = nome;
		this.uno = uno;
		//pega 7 cartas do baralho
		//this.pegaCartaDoBaralho();
		
	}

	pegaCartaDoBaralho(quantidade = 7){
		for(let i = 0; i < quantidade; i++){

			this.uno.retiraCartaDoBaralho().then( (carta) => {
				//Executa promise, resolve retorna a última carta do baralho
				this.cartasNaMao.push(this.uno.retiraCartaDoBaralho());
			}).catch( (error) => {
				//Reject erro. Acabou as cartas do baralho.
				throw error;
			});			

		}
	}

	mostrarCartasNaMao(){ this.pegaCartaDoBaralho(); console.log(this.cartasNaMao); }

	async realizaJogada(){
		let ultimaCartaJogada = this.uno.getUltimaCartaJogadaNoAmbiente();

		//Verifica se a última carta foi uma coringa e retorna
		if(ultimaCartaJogada.tipo === 'coringa'){
			switch(ultimaCartaJogada.acao){
				case 'pular':
					break;
				case 'reverter':
					break;
				case '+2':
					this.pegaCartaDoBaralho(2);
					break;
				case '+4':
					this.pegaCartaDoBaralho(4);					
			}
			return;
		}

		
		//Encontra uma carta para jogar
		this.cartasNaMao.forEach((carta, chave) => {
			if( (carta.tipo === 'numerada' && ((carta.cor === ultimaCartaJogada.cor) || (carta.id === ultimaCartaJogada.id)))  || carta.tipo === 'coringa' ){
				this.uno.insereCartaNoAmbiente(carta); //Inserindo carta
				this.cartasNaMao.splice(chave, chave); //Remove carta da mão
				this.verificaGanhador(); // retorna throw se acabou as cartas
				return;
			}
		});

		//Não encontrou cartas na mão
		//retirar cartas do baralho até encontrar
		while(true){
			let novaCarta = await this.uno.retiraCartaDoBaralho().catch((erro) => {throw erro});

			if( (novaCarta.tipo === 'numerada' && ((novaCarta.cor === ultimaCartaJogada.cor) || (novaCarta.id === ultimaCartaJogada.id)))  || novaCarta.tipo === 'coringa' ){
				this.uno.insereCartaNoAmbiente(carta); //Inserindo carta				
				return;
			}else{
				insereCartaNaMao(novaCarta);
			}

		}
	}

	verificaGanhador(){
		if(this.cartasNaMao.length <= 0){
			thrown this.nomeAgente + ' Ganhou!';
		}
	}

	insereCartaNaMao(carta){
		this.cartasNaMao.push(carta);
	}

	/*
	todo list		
		verificar se a classe this.uno tem que usar o this
		inserir promises no realiza jogada
		testar
	*/

}