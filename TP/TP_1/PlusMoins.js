const rl = require('readline').createInterface({
    input: process.stdin, output: process.stdout
})
// Retourne un nombre entre 0 et 10
const solution = Math.floor(Math.random() * 10)
const compteur = 1

function play (compteur) {
    rl.question('Entrez un nombre entre 0 et 10 ', (answer) => {
        process.stdout.write("Tu as répondu : " + answer +"\n")
        if (/^\d{1,3}$/.test(answer)){
            if (answer == solution) {
                console.log('gagné en ' + compteur + " coups")
            } else if (answer < solution) {
                console.log('C\'est plus !')
                compteur += 1
                play(compteur)
            } else if (answer > solution) {
                console.log('C\'est moins')
                compteur += 1
                play(compteur)
            }
        } else {
            console.log('Ceci n\'est pas un nombre valide')
            play()
        }
    })
}

play(compteur)


