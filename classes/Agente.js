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
			resolve('false');
		});
	}

	jogaCartaDaMao = (ultimaCartaJogadaNoAmbiente) => new Promise(async (resolve, reject) => {
		let cartaEncontrada = await this.verificaCartaNaMao(ultimaCartaJogadaNoAmbiente);
		if(cartaEncontrada){
			await this.uno.insereCartaNoAmbiente(cartaEncontrada);
			await this.removeCartaDaMao(cartaEncontrada);
			resolve('carta inserida no ambiente!');
		}else{
			console.warn(this.nomeAgente+' nao encontrou carta na mão');
			resolve('carta nao encontrada');
		}
	})

	jogaCartaDoBaralho = (ultimaCartaJogadaNoAmbiente) => new Promise(async (resolve, reject) => {
		if(await this.verificaCartaDoBaralho(ultimaCartaJogadaNoAmbiente) == true){
			resolve(true);		
		}else{
			console.error('Carta não econtrada no Baralho');
			resolve(false);
		}
	})

	verificaCartaDoBaralho = (ultimaCartaJogada) => new Promise(async (resolve, reject) => {
		const loopVerificacaoCartasDoBaralho = this.uno.cartas.map(async _=> {
			
			let ultimaCartaDoBaralho = await this.uno.retiraCartaDoBaralho();			
			await this.insereCartaNaMao(ultimaCartaDoBaralho);
			if(await this.verificaCarta(ultimaCartaDoBaralho, ultimaCartaJogada) == true){
				resolve(true);
			}

			// if(await this.verificaCarta(objetoCarta, ultimaCartaJogada) == true){
			// 	resolve(objetoCarta);
			// }else{
			// 	await this.insereCartaNaMao(objetoCarta);
			// }
		});

		await Promise.all(loopVerificacaoCartasDoBaralho);
		resolve(false);		
	})

	verificaCartaNaMao = (ultimaCartaJogada) =>  
		new Promise(async (resolve, reject) => {			
			
			const loopVerificacao = this.cartasNaMao.map(async (objetoCarta) => {
				if(await this.verificaCarta(objetoCarta, ultimaCartaJogada) == true){resolve(objetoCarta);}
			});

			await Promise.all(loopVerificacao);
			resolve();
		});
		

	verificaCarta = (carta, ultimaCartaJogada) =>
		new Promise((resolve, reject) => {
			if( carta.tipo == "coringa" ||	(carta.cor == ultimaCartaJogada.cor || carta.id == ultimaCartaJogada.id) ){
				resolve(true);
			}else{
				resolve(false);
			}
		});




	realizaJogada = () => 
		new Promise(async (resolve, reject) => {
			let ultimaCartaJogada = await this.uno.getUltimaCartaJogadaNoAmbiente();
			console.warn(this.nomeAgente,' está jogando');

			// if(await this.isUltimaCartaJogadaCoringa(ultimaCartaJogada) == true){
			// 	return ;
			// }
			if(await this.jogaCartaDaMao(ultimaCartaJogada) == 'carta inserida no ambiente!'){
				resolve();
			}else{
				console.warn('Buscando carta no Baralho ... ');
				if( await this.jogaCartaDoBaralho(ultimaCartaJogada) == true){
					if(await this.jogaCartaDaMao(ultimaCartaJogada) == 'carta inserida no ambiente!'){
						resolve();
					}
				}else{
					reject();
				}
			}
		})


	verificaGanhador = _ => new Promise((resolve, reject) => {
			if(this.cartasNaMao.length <= 0){
				throw this.nomeAgente + ' Ganhou!';
			}else{
				resolve(false);
			}
		})
		

	removeCartaDaMao = (carta) => 
		new Promise((resolve, reject) => {
			this.cartasNaMao = this.cartasNaMao.filter(item => item !== carta);
			resolve(true);
		})

	insereCartaNaMao = (carta) => 
		new Promise((resolve, reject) => {
			this.cartasNaMao.push(carta);
			resolve(true);
		})

}
	/** TodoList:
		* verificaCartaDoBaralho problema no if de validação da carta
			* Senão é a carta ideal para o ambiente a carta do baralho deve ser removida do baralho e inserida na mão
			* A carta é apenas inserida na mão.
	*/