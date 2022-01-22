
//For textarea to resize itself when text is very long
export const autoResize = event => {
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight - 18}px`
}

//So it won't cause an error when sending formData to the server
export function formDataEscaping(text){
    let escapedText = text.replaceAll('\\', '\\\\').replaceAll('"', '\\\"')
    return escapedText;
}

//Used to calculate how long ago were posts and comments posted
export function getTimeAmount(timestamp) {

    const seconds = (Date.now() - Date.parse(timestamp)) / 1000
    if (seconds < 60) {
        return `A l'instant`
    }
    if (seconds >= 60) {
        const minutes = Math.round(seconds / 60)
        if (minutes > 60) {
            const hours = Math.round(minutes / 60)
            if (hours > 24) {
                const days = Math.round(hours / 24)
                if (days > 365) {
                    const years = Math.round(days / 365)
                    return `Il y a ${years} ${years > 1 ? 'années' : 'an'}`
                } else if (days > 31) {
                    const months = Math.round(days / 30, 5)
                    return `Il y a ${months} mois`
                }

                return `Il y a ${days} jour${days > 1 ? 's' : ''}`
            }
            return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`
        }
        return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`
    }


}