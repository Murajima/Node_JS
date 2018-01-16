const rl = require('readline').createInterface({
    input: process.stdin, output: process.stdout
})
// Retourne un nombre entre 0 et 10
const solution = Math.floor(Math.random() * 10)
const compteur = 1

function play (compteur) {
    rl.question('Question ?', (answer) => {
        process.stdout.write("Tu as répondu : " + answer +"\n")
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
    })
}

play(compteur)


