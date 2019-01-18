function countWords(string){
    const array = string.split(' ')
    let countCode = 0
    let count = 0
    array.forEach(e => {if(e.length > 1) {
        countCode = 0
        e.split('').forEach((el,i) => {
            let code = e.charCodeAt(i)
            if(code >= 65 && code <= 90 || code >= 97 && code <= 122){
                countCode ++
            }
        })
        if(countCode != 0) count ++
    }})
    return count;
}