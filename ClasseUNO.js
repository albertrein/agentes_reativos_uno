class UNO{
	constructor(){
		this.cartas = [];

		this.cartas = this.cartas.concat(this.inicializaCartasBaralho('vermelho'));
		this.cartas = this.cartas.concat(this.inicializaCartasBaralho('amarelo'));
		this.cartas = this.cartas.concat(this.inicializaCartasBaralho('verde'));
		this.cartas = this.cartas.concat(this.inicializaCartasBaralho('azul'));

		this.ambiente = [];
	}

	inicializaCartasBaralho(corCarta){
		let arrCartas = [];
		let i = 0;
		for(i = 0; i < 10; i++){
			arrCartas.push({
				'id': i,
				'cor': corCarta,
			});
		}

		arrCartas.push({
			'id': i++,
			'cor': corCarta,
			'tipo': 'pular'
		});
		arrCartas.push({
			'id': i++,
			'cor': corCarta,
			'tipo': 'reverter'
		});
		arrCartas.push({
			'id': i++,
			'cor': corCarta,
			'tipo': '+2'
		});
		

		for(let i = 1; i < 10; i++){
			arrCartas.push({
				'id': i,
				'cor': corCarta,
			});
		}


		arrCartas.push({
			'id': i++,
			'cor': corCarta,
			'tipo': 'pular'
		});
		arrCartas.push({
			'id': i++,
			'cor': corCarta,
			'tipo': 'reverter'
		});
		arrCartas.push({
			'id': i++,
			'cor': corCarta,
			'tipo': '+2'
		});
		arrCartas.push({
			'id': i++,
			'cor': 'preta',
			'tipo': 'coringa'
		});
		
		return arrCartas;
	}

	getRandomNumero(){
		//Retorna um numero randomico
		return Math.floor(Math.random() * (this.cartas.length));
	}

	trocaCartasDePosicao(id1, id2){
		return new Promise((resolve, reject) => {
			//Captura objetos
			let carta1 = this.cartas[id1];
			let carta2 = this.cartas[id2];

			//Altera objetos
			this.cartas[id1] = carta2;
			this.cartas[id2] = carta1;
			resolve('OK');
		});
	}

	//trocaCartasDePosicao(id1, id2){}

	async embaralharCartas(){
		//Executa um troca de cartas pela posição gerada aleatóriamente
		for(let i = 0; i < 999999; i++){
			await this.trocaCartasDePosicao(this.getRandomNumero(), this.getRandomNumero());
		}
	}

	retiraCartaDoBaralho(){
		if((this.inicializaCartasBaralho.length - 1) < 0){
			throw new Exception('Acabou as cartas!');
			return null;
		}
		let carta = this.cartas[this.cartas.length-1];
		this.cartas.pop();
		return carta;
	}

}// Fim da classe
