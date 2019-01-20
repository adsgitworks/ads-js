var genero = 'feminino'

function opcaoGenero (opcao) {
	genero = opcao.value
}

function base () {
	var altura = document.getElementById('altura').value
	var peso = document.getElementById('peso').value
	var imc = parseFloat(peso) / Math.pow(parseFloat(altura),2)
	var resposta
	switch (genero) {
		case 'masculino':
		if (imc < 19.1) {
			resposta = 'Abaixo do Peso'
		} else if (imc < 25.8) {
			resposta = 'Peso Normal'
		} else if (imc < 27.3) {
			resposta = 'Marginalmente Acima do Peso'
		} else if (imc <= 32.3) {
			resposta = 'Acima do Peso Ideal'
		} else {
			resposta = 'Obeso'
		}
		break;

		case 'feminino':
		if (imc < 20.7) {
			resposta = 'Abaixo do Peso'
		} else if (imc < 26.4) {
			resposta = 'Peso Normal'
		} else if (imc < 27.8) {
			resposta = 'Marginalmente Acima do Peso'
		} else if (imc <= 31.1) {
			resposta = 'Acima do Peso Ideal'
		} else {
			resposta = 'Obeso'
		}
		break;

		default:
	}
	document.getElementById('resultado').innerHTML = resposta
}