class UNO{
	constructor(){
		this.cartas = [];

		this.cartas = this.cartas.concat(this.inicializaCartasBaralho('vermelho'));
		this.cartas = this.cartas.concat(this.inicializaCartasBaralho('amarelo'));
		this.cartas = this.cartas.concat(this.inicializaCartasBaralho('verde'));
		this.cartas = this.cartas.concat(this.inicializaCartasBaralho('azul'));
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

}// Fim da classe
