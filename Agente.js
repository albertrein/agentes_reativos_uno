class Agente{
	constructor(uno, nome = "Smith"){
		this.cartasNaMao = [];
		this.nomeAgente = nome;
		this.uno = uno;		
	}

	async pegaCartaDoBaralho(quantidade = 7){
		for(let i = 0; i < quantidade; i++){
			try{
				let carta = await this.uno.retiraCartaDoBaralho();
				this.cartasNaMao.push(carta);				
			}catch(erro){
				console.warn('Acabaram as cartas');
				throw erro;
			}

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
			let novaCarta = await this.uno.retiraCartaDoBaralho();

			if( (novaCarta.tipo === 'numerada' && ((novaCarta.cor === ultimaCartaJogada.cor) || (novaCarta.id === ultimaCartaJogada.id)))  || novaCarta.tipo === 'coringa' ){
				this.uno.insereCartaNoAmbiente(novaCarta); //Inserindo carta				
				return;
			}else{
				this.insereCartaNaMao(novaCarta);
			}

		}
	}

	verificaGanhador(){
		if(this.cartasNaMao.length <= 0){
			throw this.nomeAgente + ' Ganhou!';
		}
	}

	insereCartaNaMao(carta){
		this.cartasNaMao.push(carta);
	}
}

	/** TodoList:
		* Re-visar lógica do ganhador	
	*/