function deleteChildrens(init,parent){
    Array.from(parent.children).forEach((e,i) => {
        if(i >= init) e.remove()
        
    })
}