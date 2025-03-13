var altura = 0 
var largura = 0
var vidas = 1
var tempo = 15

var criaMosquitoTempo = 1500

// configurando nível
var nivel = window.location.search
nivel = nivel.replace('?', '')

if (nivel === 'normal') {
	// tempo de 1.5 (1500) segundos
	criaMosquitoTempo = 1500
} else if (nivel === 'dificil') {
	// tempo de 1 (1000) segundo
	criaMosquitoTempo = 1000
} else if (nivel === 'chucknorris') {
	// tempo para 750 milisegundos (0,75 segundos)
	criaMosquitoTempo = 750
}

// função que recupera as medidas de largura e altura mesmo se o usuário redimensionar o jogo
function ajustaTamanhoPalcoJogo () {

	// recuperar altura e largura do navegador
	altura = window.innerHeight
	largura = window.innerWidth
	console.log(largura, altura)
}
ajustaTamanhoPalcoJogo()

// cronometro do jogo: tempo que o usuário tem para matar os mosquitos
var cronometro = setInterval(function () {

	tempo -= 1

	if(tempo < 0) {
		clearInterval(cronometro)
		clearInterval(criaMosquito)
		window.location.href = 'vitoria.html'
	} else {
		document.getElementById('cronometro').innerHTML = tempo
	}
	
	} , 1000)

// função para criar uma posição randômica
function posicaoRandomica() {

	// remover o mosquito anterior (caso exista)
	if (document.getElementById('mosquito')) {
		document.getElementById('mosquito').remove()

		// validação das vidas
		if(vidas > 3) {
			window.location.href = 'fim_de_jogo.html'
		} else {
			document.getElementById('v' + vidas).src = "./imagens/coracao_vazio.png"
			vidas++
		}
	}

	// posição randômica (aleatória)
	var posicaoX = Math.floor(Math.random() * largura) - 90
	var posicaoY = Math.floor(Math.random() * altura) - 90

	posicaoX = posicaoX < 0 ? 0 : posicaoX
	posicaoY = posicaoY < 0 ? 0 : posicaoY

	console.log(posicaoX, posicaoY)

	// criar o elemento HTML
	var mosquito = document.createElement('img')
	mosquito.src = './imagens/mosquito.png'
	mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
	mosquito.style.left = posicaoX + 'px'
	mosquito.style.top = posicaoY + 'px'
	mosquito.style.position = 'absolute'
	mosquito.id = 'mosquito'
	mosquito.onclick = function() {
		this.remove()
	}	

	document.body.appendChild(mosquito)
}

// tamanho da imagem dinâmico
function tamanhoAleatorio() {
	var classe = Math.floor(Math.random() * 3)
	
	switch (classe) {
		case 0:
			return 'mosquito1'
		case 1:
			return 'mosquito2'
		case 2:
			return 'mosquito3'
	}
}

// posicionando os mosquitos em lados diferentes da tela (lado A ou B)
function ladoAleatorio() {
	var classe = Math.floor(Math.random() * 2)
	
	switch (classe) {
		case 0:
			return 'ladoA'
		case 1:
			return 'ladoB'
	}
}