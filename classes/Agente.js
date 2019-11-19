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

	jogaCartaDaMao = (ultimaCartaJogadaNoAmbiente) => new Promise(async (resolve, reject) => {
		let cartaEncontrada = await this.verificaCartaNaMao(ultimaCartaJogadaNoAmbiente);
		if(cartaEncontrada){
			await this.uno.insereCartaNoAmbiente(cartaEncontrada);
			await this.removeCartaDaMao(cartaEncontrada);
			resolve('carta inserida no ambiente!');
		}else{
			reject('carta nao encontrada');
		}
	})

	jogaCartaDoBaralho = (ultimaCartaJogadaNoAmbiente) => new Promise(async (resolve, reject) => {
		let cartaEncontrada = await this.verificaCartaDoBaralho(ultimaCartaJogadaNoAmbiente);
		if(cartaEncontrada){
			await this.uno.insereCartaNoAmbiente(cartaEncontrada);
			resolve('carta inserida');
		}else{
			reject('Carta não econtrada no Baralho');
		}
	})

	verificaCartaDoBaralho = (ultimaCartaJogada) => new Promise(async (resolve, reject) => {
		const loopVerificacaoCartasDoBaralho = this.uno.cartas.map(async (objetoCarta) => {
			if(await this.verificaCarta(objetoCarta, ultimaCartaJogada) == true){
				resolve(objetoCarta);
			}else{
				await this.insereCartaNaMao(objetoCarta);
			}
		});

		await Promise.all(loopVerificacaoCartasDoBaralho);
		resolve();		
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
				console.warn('Carta')
				// if( await this.jogaCartaDoBaralho(ultimaCartaJogada) == 'carta inserida'){
				// 	resolve();
				// }
			}
		})


	verificaGanhador = () => 
		new Promise((resolve, reject) => {
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
		* Re-visar lógica do jogaCartaDoBaralho que não está funcionando
			*Algum problema está gerando após jogaCartaNaMao quando não encontra uma carta
	*/