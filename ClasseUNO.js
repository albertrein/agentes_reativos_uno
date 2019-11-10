class UNO{
	constructor(){
		this.cartas = [];
		this.ambiente = [];		
	}

	/**
	* Função inicializaCartasDoBaralho
	* Insere um array de cartas através de uma Promise criaCartasDoBaralho
	* Uma chamada da Promise para cada cor de carta
	* A concatenação é necessária, pois as cartas devem ficar todas em um array único e não um array de arrays
	*/
	async inicializaCartasDoBaralho(){
		this.cartas = this.cartas.concat( await this.criaCartasDoBaralho('vermelho'));
		this.cartas = this.cartas.concat( await this.criaCartasDoBaralho('amarelo'));
		this.cartas = this.cartas.concat( await this.criaCartasDoBaralho('verde'));
		this.cartas = this.cartas.concat( await this.criaCartasDoBaralho('azul'));
	}

	criaCartasDoBaralho(corCarta){
		return new Promise( (resolve, reject) => {
			let arrCartas = [];
			let i = 0;
			for(i = 0; i < 10; i++){
				arrCartas.push({
					'id': i,
					'cor': corCarta,
					'tipo': 'numerada'
				});
			}

			arrCartas.push({
				'id': i++,
				'cor': corCarta,
				'tipo': 'coringa',
				'acao': 'pular'
			});
			arrCartas.push({
				'id': i++,
				'cor': corCarta,
				'tipo': 'coringa',
				'acao': 'reverter'
			});
			arrCartas.push({
				'id': i++,
				'cor': corCarta,
				'tipo': 'coringa',
				'acao': '+2'
			});
			

			for(let i = 1; i < 10; i++){
				arrCartas.push({
					'id': i,
					'cor': corCarta,
					'tipo': 'numerada'
				});
			}


			arrCartas.push({
				'id': i++,
				'cor': corCarta,
				'tipo': 'coringa',
				'acao': 'pular'
			});
			arrCartas.push({
				'id': i++,
				'cor': corCarta,
				'tipo': 'coringa',
				'acao': 'reverter'
			});
			arrCartas.push({
				'id': i++,
				'cor': corCarta,
				'tipo': 'coringa',
				'acao': '+2'
			});
			arrCartas.push({
				'id': i++,
				'cor': 'preta',
				'tipo': 'coringa',
				'acao': '+4'
			});
			
			resolve(arrCartas); //Retorna com o Array de cartas

		}); //Fim da promise
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

	async embaralharCartas(){
		//Executa um troca de cartas pela posição gerada aleatóriamente
		for(let i = 0; i < 99999; i++){
			await this.trocaCartasDePosicao(this.getRandomNumero(), this.getRandomNumero());
		}
	}

	retiraCartaDoBaralho(){
		return new Promise( (resolve, reject) => {

			if((this.inicializaCartasBaralho.length - 1) < 0){
				reject('Acabou as cartas!');
			}

			let carta = this.cartas[this.cartas.length-1];
			this.cartas.pop();
			resolve(carta);

		}); //fim promise
	}

	getUltimaCartaJogadaNoAmbiente(){
		return this.ambiente[this.ambiente.length-1];
	}

	insereCartaNoAmbiente(carta){
		this.ambiente.push(carta);
	}

	
}// Fim da classe
