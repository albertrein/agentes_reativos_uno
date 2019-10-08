var cartas = [];

function inicializaCartasBaralho(corCarta){
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

cartas = cartas.concat(inicializaCartasBaralho('vermelho'));
cartas = cartas.concat(inicializaCartasBaralho('amarelo'));
cartas = cartas.concat(inicializaCartasBaralho('verde'));
cartas = cartas.concat(inicializaCartasBaralho('azul'));

//--metodos--
//inicia jogo _construct(embaralha)
//embaralhar
//RemoveCarta (remove carta do baralho)