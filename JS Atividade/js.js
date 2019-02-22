
(function(){

	function id(v){
		return document.getElementById(v)
	}

	let input = id('ipt')

	let user_infos = {}
	let c = 0

	id('sending').onclick = function(){


		let username = id('user').value
		let email = id('email').value
		let git = id('git').value
		let imglink = id('imglink').value
		
		if(imglink) id('img').src = imglink
		else imglink = id('img').src

		if(!localStorage.count) localStorage.count = 0
		else localStorage.count ++

		if(username && email && git){
			user_infos[localStorage.count] = {
				username,
				email,
				git,
				image: imglink
			}
		if(!localStorage.infos) localStorage.infos = JSON.stringify(user_infos)
		else{
			let infos = JSON.parse(localStorage.infos)
			user_infos = {...user_infos, ...infos}
			
			localStorage.infos = JSON.stringify(user_infos)
		}
		}else {
			alert('Por favor, verifique os campos e envie novamente')
		}
	}

	id('cadastrados').onclick = function(){
		if(localStorage.infos){
			let users = JSON.parse(localStorage.infos)
			if(id('userarea').childNodes.length != 0){
					id('userarea').remove()
				}
			id('formArea').insertAdjacentHTML('beforeend','<div id="userarea"><div id="usuarios"></div></div>')
			Object.keys(users).forEach(e => {

				let html = `<ul class="users">
								<span>Usuario ${e}:</span>
								<li>Email:${users[e].email}</li>
								<li>Nome:<span class="name">${users[e].username}</span></li>
							</ul>`
				id('usuarios').insertAdjacentHTML('beforeend',html)

			})
			id('userarea').insertAdjacentHTML('beforeend','<button id="end">Fechar</button>')
			id('userarea').style.visibility = 'visible'
			id('end').onclick = function(){
				id('userarea').style.visibility = 'hidden'
			}

			Array.from(document.getElementsByClassName('name')).forEach((e,i) => {
				e.onclick = function() {
					
					if(document.getElementsByClassName('users')[i].childNodes.length < 8){
						
						let uname = users[i].username
						let email = users[i].email
						let git = users[i].git
						let image = users[i].image

						let html = `<div class="userdiv">
										<div class="pc">
											<img class="min-img" src="${image}"/>
										</div>
										<div class="text">
											<span>git: ${git}</span>
											<span>Usuario: ${uname}</span>
											<span>Email: ${email}</span>
										</div>
										<div class="close"></div>
									</div>`
						document.getElementsByClassName('users')[i].insertAdjacentHTML('beforeend',html)

						let son = document.getElementsByClassName('users')[i].childNodes[7].childNodes[5].onclick = function(){
							this.parentNode.remove()
						}
						
					}

					
				}
				
			})




		}else{
			alert('Nao possui nenhum usuario cadastrado')
		}
	}
	
	
})()