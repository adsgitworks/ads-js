function colocarValues () {
	var botoes = document.getElementsByClassName('elementoEscrito')
	Array.from(botoes).forEach(function (e) {
		e.value = e.innerHTML
	})
}

function colocarEventos () {
	var botoes = document.getElementsByClassName('elementoEscrito')
	Array.from(botoes).forEach(function (e) {
		e.addEventListener('click', function () {
			document.getElementById('telaResposta').innerHTML = document.getElementById('telaResposta').innerHTML.toString() + e.value.toString()
		})
	})
}

function inicializar () {
	colocarEventos()
	colocarValues()
}

function limparTela () {
	document.getElementById('telaResposta').innerHTML = ''
}

function tratamentoDeEntrada (entrada) {
	var alvos = ['-(','+(']
	alvos.forEach(function (alvo) {
		var localAlvo = entrada.indexOf(alvo)
		while (localAlvo != -1) {
			entrada = entrada.replace(alvo,alvo.charAt(0) + '1x' + alvo.charAt(1))
			localAlvo = entrada.indexOf(alvo)
		}
	})
	var alvos2 = ['0(','1(','2(','3(','4(','5(','6(','7(','8(','9(']
	alvos2.forEach(function (alvo) {
		var localAlvo = entrada.indexOf(alvo)
		while (localAlvo != -1) {
			entrada = entrada.replace(alvo,alvo.charAt(0) + 'x' + alvo.charAt(1))
			localAlvo = entrada.indexOf(alvo)
		}
	})
	return entrada
}

function tratamentoDeSaida (saida) {
	if (saida.charAt(0) == '+') {
		saida = saida.slice(1, saida.length)
	}
	return saida
}

/* PARTE LÓGICA */

function ordemDeOperacoes (questao) {
	questao = tratamentoDeMultiplicacaoDivisao(questao)
	questao = tratamentoDeSomas(questao)
	return questao
}

function funcionalidade () {
	var operacao = tratamentoDeEntrada(document.getElementById('telaResposta').innerHTML)
	var primeiroFinal = operacao.indexOf(')');
	while (primeiroFinal != -1) {
		var parDoPrimeiroFinal = operacao.lastIndexOf('(', primeiroFinal - 1)
		var resumo = operacao.slice(parDoPrimeiroFinal + 1, primeiroFinal)
		var resposta = ordemDeOperacoes(resumo)
		operacao = operacao.replace('(' + resumo +')', resposta.toString())
		primeiroFinal = operacao.indexOf(')')
	}
	operacao = ordemDeOperacoes(operacao)
	operacao = tratamentoDeSaida(operacao)
	document.getElementById('telaResposta').innerHTML = operacao
}

function tratamentoDeMultiplicacaoDivisao (problema) {
	var operadores = ['x','/']
	var pontoDeParada = ['x','/','+','-']
	operadores.forEach(function (operador) {
		var local = problema.indexOf(operador)
		while (local != -1){
			var inicio = pontoDeParada.map(function (aux) {
				return problema.lastIndexOf(aux, local - 1)
			}).reduce(function (maior, e) {
				if(e > maior) {
					maior = e
				}
				return maior
			})
			if (inicio != -1) {
				switch (problema.charAt(inicio)) {
					case 'x':
					case '/':
					inicio++
					break
					default:
				}
			}else {
				inicio++
			}
			var final = pontoDeParada.map(function (aux) {
				return problema.indexOf(aux, local + 2)
			}).reduce(function (menor, e) {
				if(menor == -1){
					menor = e
				}else {
					if((e != -1) && (e < menor)) {
						menor = e
					}
				}
				return menor
			})
			if(final == -1) {
				final = problema.length
			}
			var resultado = multiplicacaoDivisao(problema.slice(inicio, final))
			if (resultado < 0) {
				problema = problema.replace(problema.slice(inicio, final), resultado)
			}else {
				problema = problema.replace(problema.slice(inicio, final), '+' + resultado)
			}
			local = problema.indexOf(operador)
		}
	})
	return problema
}

function multiplicacaoDivisao (atividade) {
	var operadores = ['x','/']
	var operador = operadores.map(function (e) {
		return atividade.indexOf(e)
	}).find(function (aux) {
		if (aux > -1) {
			return aux
		}
	})
	var operando1 = parseFloat(atividade.slice(0,operador))
	var operando2 = parseFloat(atividade.slice(operador + 1,))
	var resposta
	switch (atividade.charAt(operador)) {
		case 'x':
		resposta = operando1 * operando2
		break;

		case '/':
		resposta = operando1 / operando2
		break

		default:
	}
	return resposta
}

function tratamentoDeSomas (atividade) {
	var sinais = ['+','-']
	sinais.forEach(function (sinal) {
		var local = atividade.indexOf(sinal, 1)
		while (local != -1) {
			var inicio = sinais.map(function (aux) {
				return atividade.lastIndexOf(aux, local -1)
			}).reduce(function (maior, e) {
				if(e > maior) {
					maior = e
				}
				return maior
			})
			if (inicio == -1) {
				inicio = 0
			}
			var final = sinais.map(function (aux) {
				return atividade.indexOf(aux, local + 1)
			}).reduce(function (menor, e) {
				if (menor == -1) {
					menor = e
				}else {
					if((e != -1) && (e < menor)) {
						menor = e
					}
				}
				return menor
			})
			if (final == -1) {
				final = atividade.length
			}
			var resposta = preEscolar(atividade.slice(inicio,final), local)
			if (resposta < 0) {
				atividade = atividade.replace(atividade.slice(inicio,final), resposta)
			}else {
				atividade = atividade.replace(atividade.slice(inicio,final), '+' + resposta)
			}
			local = atividade.indexOf(sinal, 1)
		}
	})
	return atividade
}

function preEscolar (problema, separacao) {
	var operando1 = parseFloat(problema.slice(0,separacao))
	var operando2 = parseFloat(problema.slice(separacao,problema.length))
	return operando1 + operando2
}