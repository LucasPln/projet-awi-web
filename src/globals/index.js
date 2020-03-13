export const cipher = salt => {
    let textToChars = text => text.split('').map(c => c.charCodeAt(0))
    let byteHex = n => ("0" + Number(n).toString(16)).substr(-2)
    let applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code)

    return text => text.split('')
        .map(textToChars)
        .map(applySaltToChar)
        .map(byteHex)
        .join('')
}

export const decipher = salt => {
    let textToChars = text => text.split('').map(c => c.charCodeAt(0))
    let applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code)
    return encoded => encoded.match(/.{1,2}/g)
        .map(hex => parseInt(hex, 16))
        .map(applySaltToChar)
        .map(charCode => String.fromCharCode(charCode))
        .join('')
}

export const formatDate = date => {
        let diff = Date.now() - Date.parse(date)
        let days = diff / 86400000
        let hours = diff / 3600000
        let minutes = diff / 60000
        
        if (days < 1) {
            if (hours < 1) {
                return `Il y a ${Math.floor(minutes)} minute${Math.floor(minutes) === 1 ? '' : 's'}`
            }
            return `Il y a ${Math.floor(hours)} heure${Math.floor(hours) === 1 ? '' : 's'}`
        } 
        return `Il y a ${Math.floor(days)} jour${Math.floor(days) === 1 ? '' : 's'}`
}