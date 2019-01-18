const convert = function(i,txt){
    document.getElementsByClassName('results')[i].textContent = txt 
}

{
    const button = document.getElementById('send')
    button.onclick = () => {
        const insert = document.getElementById('insert')
        const value = parseFloat(insert.value)
        convert(0,value.toString('16'))
        convert(1,value.toString('8'))
        convert(2,value.toString('2'))
        insert.value = ''
        
    }
}