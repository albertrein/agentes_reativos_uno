class Agente{
	constructor(uno, nome = "Smith"){
		this.cartasNaMao = [];
		this.nomeAgente = nome;
		this.uno = uno;		
	}

	timer = () => 
		(new Promise((resolve,reject) => {
			setTimeout(()=>{
				resolve();
			},5000);
		}))

	async pegaCartaDoBaralho(quantidade = 7){
		for(let i = 0; i < quantidade; i++){
			try{
				let carta = await this.uno.retiraCartaDoBaralho();
				this.cartasNaMao.push(carta);
				//console.log('Carta Capturada:',carta);
			}catch(erro){
				console.warn('Acabaram as cartas');
				throw erro;
			}

		}
	}

	mostrarCartasNaMao(){
		return new Promise((resolve, reject) => {
			console.log(this.nomeAgente, this.cartasNaMao);
			resolve();
		});
	}

	isUltimaCartaJogadaCoringa(ultimaCartaJogada){
		return new Promise( async (resolve, reject) => {
			//Verifica se a última carta foi uma coringa e retorna
			if(ultimaCartaJogada.tipo === 'coringa'){
				switch(ultimaCartaJogada.acao){
					case 'pular':
						break;
					case 'reverter':
						break;
					case '+2':
						await this.pegaCartaDoBaralho(2);
						break;
					case '+4':
						await this.pegaCartaDoBaralho(4);					
				}
				resolve();
			}
			reject();
		});
	}

	jogaCartaNaMao(ultimaCartaJogada){
		return new Promise((resolve, reject) => {
			//Encontra uma carta para jogar
			this.cartasNaMao.forEach(async (carta, chave) => {
				if( (carta.tipo == 'numerada' && ((carta.cor == ultimaCartaJogada.cor) || (carta.id == ultimaCartaJogada.id)))  || carta.tipo == 'coringa' ){
					await this.uno.insereCartaNoAmbiente(carta); //Inserindo carta
					this.cartasNaMao.splice(chave, chave); //Remove carta da mão
					this.verificaGanhador(); // retorna throw se acabou as cartas
					console.log(this.nomeAgente+' jogou:',carta);
					resolve(true);
				}
			});
			//reject();
		});
	}

	compraCartaNoBaralho(ultimaCartaJogada){
		return new Promise(async (resolve, reject) => {
			//Não encontrou cartas na mão
			//retirar cartas do baralho até encontrar
			while(this.uno.cartas.length > 0){
				let novaCarta = await this.uno.retiraCartaDoBaralho();

				if( (novaCarta.tipo == 'numerada' && ((novaCarta.cor == ultimaCartaJogada.cor) || (novaCarta.id == ultimaCartaJogada.id)))  || novaCarta.tipo == 'coringa' ){
					await this.uno.insereCartaNoAmbiente(novaCarta); //Inserindo carta
					console.log(this.nomeAgente+' jogou:',novaCarta);
					this.verificaGanhador();			
					resolve();
				}else{
					this.insereCartaNaMao(novaCarta);
				}
			}
		});
	}

	async realizaJogada(){
		let ultimaCartaJogada = await this.uno.getUltimaCartaJogadaNoAmbiente();
		console.warn(this.nomeAgente,' está jogando');
		
		this.isUltimaCartaJogadaCoringa(ultimaCartaJogada).then(() => {
			return;
		}).catch(() =>{
			this.jogaCartaNaMao(ultimaCartaJogada).then(() => {
				return;
			}).catch(() => {
				this.compraCartaNoBaralho(ultimaCartaJogada).then(() => {
					return;
				}).catch(()=>{
					throw 'Aconteceu algo que nao devia!';
				});
			});
		});


		// await this.isUltimaCartaJogadaCoringa(ultimaCartaJogada);
		// await this.jogaCartaNaMao(ultimaCartaJogada);
		// await this.compraCartaNoBaralho(ultimaCartaJogada);
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