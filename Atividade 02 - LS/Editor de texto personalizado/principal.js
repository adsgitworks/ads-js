var str = ''

function getstring(){
    const element = document.getElementsByClassName('results')[0]
    document.getElementsByClassName('results')[0].onchange = () => {
        str = element.value
        document.getElementById('length').textContent = str
    }
}
function changeDiv(result){
    const element = document.getElementById('txt')
    element.textContent = result

}
function addEventsListeners(method){
    const Tags = document.getElementsByTagName('button')
    Array.from(Tags).forEach((e,index) => {
        e.onclick = function(){
            changeDiv(method[index](str))
        }
    }) 

}
function events(){
    getstring()
    addEventsListeners([(str) => toLowerCase(str),(str) => toUpperCase(str),(str) => countCarac(str),(str) => countWords(str),(str) => rowCount(str)])
}

{
    window.addEventListener('load',events)
}