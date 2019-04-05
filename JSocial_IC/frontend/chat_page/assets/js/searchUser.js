
function searchUsers(selector){
    function settingSearcheds(){

    }
    id('search_input').onkeydown = function(e)
    {
        var searcheds = []
        var no_searched = []

        if(e.keyCode == 13) {

            if(e.target.value != '') {
                selector.forEach(element => {
                
                    if(element.textContent == e.target.value){
                        searcheds[searcheds.length] = element
                    }else {
                        no_searched[no_searched.length] = element.parentElement
                    }
                })
                
               
                    if(no_searched.length == selector.length) {
                        jqueryAnimate('warning', 'Não foi encontrado','nenhum usuário com esse nome')
                    }else {
                        no_searched.forEach(e => {
                            e.style.display = 'none'
                        })
                    }
                
            }else {
                Array.from(document.querySelectorAll('[friends] > div')).forEach(e => {
                    e.style.display = ''
                })
            }
        }
    }
}