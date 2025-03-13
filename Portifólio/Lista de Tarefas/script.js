class Tarefa {
	constructor() {
		this.input = document.getElementById('input-lista')
		this.lista = document.getElementById('li-lista')
		this.botaoAdicionar = document.querySelector('.btn-custom')

		this.botaoAdicionar.addEventListener('click', (e) => this.adicionarTarefa(e))
		document.addEventListener('DOMContentLoaded', () => this.carregarTarefasLocalStorage())
		this.lista.addEventListener('click', (e) => this.deletarTarefa(e))
	}

	adicionarTarefa(e) {
		e.preventDefault()

		// recupera a tarefa digitada pelo usuário em uma variável
		let textoTarefa = this.input.value.trim()

		// não adiciona tarefas vazias
		if (textoTarefa === '') {
			// modal de erro 
			document.querySelector('#modal-titulo').innerHTML = 'Erro na inclusão da tarefa!'
			document.querySelector('#modal-titulo-div').className = 'modal-header text-danger'
			document.querySelector('#modal-conteudo').innerHTML = 'Erro na gravação da tarefa, verifique se o campo foi preenchido corretamente.'
			document.querySelector('#btn-modal').innerHTML = 'Voltar e corrigir'
			document.querySelector('#btn-modal').className = 'btn btn-danger'

			$('#modalRegistraTarefa').modal('show')
			return

		} else {
			// modal sucesso
			document.querySelector('#modal-titulo').innerHTML = 'Sucesso na inclusão da tarefa!'
			document.querySelector('#modal-titulo-div').className = 'modal-header text-success'
			document.querySelector('#modal-conteudo').innerHTML = 'A tarefa foi salva com sucesso.'
			document.querySelector('#btn-modal').innerHTML = 'Voltar'
			document.querySelector('#btn-modal').className = 'btn btn-success'

			$('#modalRegistraTarefa').modal('show')

		}

		let li = document.createElement("li")
		li.textContent = textoTarefa

		// adiciona um botão para excluir uma tarefa 
		let btnExcluir = document.createElement("button")
		btnExcluir.innerHTML = '<img src="./imagens/trash.png" width="18px">'
		btnExcluir.classList.add('delete-btn')
		btnExcluir.className = 'btn btn-danger'
		
		li.appendChild(btnExcluir)
		this.lista.appendChild(li)

		// limpar campos após a gravação
		this.input.value = ''

		// salvar a tarefa no local storage
		this.salvarTarefaLocalStorage(textoTarefa)

	}

	salvarTarefaLocalStorage(textoTarefa) {
		let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
		tarefas.push(textoTarefa)
		localStorage.setItem('tarefas', JSON.stringify(tarefas))
	}

	carregarTarefasLocalStorage() {
		let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
		tarefas.forEach(textoTarefa => {
			let li = document.createElement("li")
			li.textContent = textoTarefa
			

			let btnExcluir = document.createElement("button")
			btnExcluir.innerHTML = '<img src="./imagens/trash.png" width="18px">'
			btnExcluir.classList.add('delete-btn')
			btnExcluir.className = 'btn btn-danger'

			li.appendChild(btnExcluir)
			this.lista.appendChild(li)
		})
	}

	deletarTarefa(e) {
		if (e.target.tagName === 'IMG') {
			let itemTarefa = e.target.parentElement.parentElement
			this.lista.removeChild(itemTarefa)

			let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
			tarefas = tarefas.filter(tarefa => tarefa !== itemTarefa.textContent)
			localStorage.setItem('tarefas', JSON.stringify(tarefas))
		}
	}

}

let tarefa = new Tarefa()