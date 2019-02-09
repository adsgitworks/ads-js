function getXML(url){
		return new Promise( (resolve,reject) => {
			let xhr = new XMLHttpRequest()
			xhr.open('get',url,true)
			xhr.onreadystatechange = function(){
				if(xhr.status == 200 && xhr.readyState == 4){
					let parser = new DOMParser()
					let xmldoc = parser.parseFromString(xhr.responseText,'text/xml')
					resolve(xmldoc)
				}
			}
		xhr.send()
		}
	)}
	getXML('https://raw.githubusercontent.com/ryganon/linguagens-script/master/projetos/dashboard-lite/tecnologia_uol.xml')
	.then(doc => 
		document.body.appendChild(doc.getElementsByTagName('channel')[0])
	)