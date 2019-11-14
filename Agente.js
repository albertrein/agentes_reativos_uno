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
			},3000);
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
		console.log('isUltimaCartaJogadaCoringa');
		return new Promise( async (resolve, reject) => {
			//Verifica se a última carta foi uma coringa e retorna
			if(ultimaCartaJogada.tipo == 'coringa'){
				console.log('coringa!!');
				if(ultimaCartaJogada.acao == "+2"){
					await this.pegaCartaDoBaralho(2);
					resolve(true);
				}
				if(ultimaCartaJogada.acao == "+4"){
					await this.pegaCartaDoBaralho(4);
					resolve(true);
				}else{resolve(false);}
			}
			resolve('faslse');
		});
	}

	jogaCartaNaMao(ultimaCartaJogada){
		console.log('jogaCartaNaMao');
		return new Promise((resolve, reject) => {
			//Encontra uma carta para jogar
			this.cartasNaMao.forEach(async (carta, chave) => {
				if(await this.verificaCartaJogavel(carta, chave, ultimaCartaJogada) == true){
					resolve(true);
				}				
			});			
		});
	}

	compraCartaNoBaralho(ultimaCartaJogada){
		console.log('compraCartaNoBaralho');
		return new Promise(async (resolve, reject) => {
			//Não encontrou cartas na mão
			//retirar cartas do baralho até encontrar
			while(this.uno.cartas.length > 0){
				let novaCarta = await this.uno.retiraCartaDoBaralho();
				if(await this.verificaCartaJogavel(novaCarta,false,ultimaCartaJogada) == true){
					resolve(true);
				}
				continue;
			}
		});
	}

	verificaCartaJogavel(carta, chave = false, ultimaCartaJogada){
		return new Promise(async (resolve, reject) => {
			if((carta.tipo == 'numerada' && ((carta.cor == ultimaCartaJogada.cor) || (carta.id == ultimaCartaJogada.id)))  || carta.tipo == 'coringa'){
				await this.uno.insereCartaNoAmbiente(carta); //Inserindo carta no ambiente
				if(chave){
					await this.removeCartaDaMao(chave);
				}
				await this.verificaGanhador();
				resolve(true);
			}else{
				await this.insereCartaNaMao(carta);
				resolve(false);
			}
		})
	}

	async realizaJogada(){
		let ultimaCartaJogada = await this.uno.getUltimaCartaJogadaNoAmbiente();
		console.warn(this.nomeAgente,' está jogando');

		// if(await this.isUltimaCartaJogadaCoringa(ultimaCartaJogada) == true){
		// 	return ;
		// }
		if(await this.jogaCartaNaMao(ultimaCartaJogada) == true){
			return ;
		}
		if(await this.compraCartaNoBaralho(ultimaCartaJogada) == true){
			return ;
		}else{
			throw 'Aconteceu algo que nao devia!';
		}	
		
	}

	verificaGanhador = () => 
		new Promise((resolve, reject) => {
			if(this.cartasNaMao.length <= 0){
				throw this.nomeAgente + ' Ganhou!';
			}else{
				resolve(false);
			}
		})
		

	removeCartaDaMao = (chave) => 
		new Promise((resolve, reject) => {
			this.cartasNaMao.splice(chave, chave);
			resolve(true);
		})

	insereCartaNaMao = (carta) => 
		new Promise((resolve, reject) => {
			this.cartasNaMao.push(carta);
			resolve(true);
		})

}
	/** TodoList:
		* Re-visar lógica do ganhador	
	*/