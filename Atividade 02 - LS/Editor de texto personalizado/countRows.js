function rowCount(string){
    const max = 396
    const atual = document.getElementById('length').clientWidth;
    const count = Math.ceil(atual/max)
    return count
}