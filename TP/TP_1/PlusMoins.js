const rl = require('readline').createInterface({
    input: process.stdin, output: process.stdout
})
// Retourne un nombre entre 0 et 10
const solution = Math.floor(Math.random() * 10)
const compteur = 1

function play (compteur) {
    rl.question('Entrez un nombre entre 0 et 10 \n', (answer) => {
        console.log("Tu as répondu : " + answer +"\n")
        if (/^\d{1,3}$/.test(answer)){
            if (answer == solution) {
                console.log('gagné en ' + compteur + " coups")
                restart()
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

function restart () {
    let solution = Math.floor(Math.random() * 10)
    let compteur = 1
    rl.question('Voulez vous rejouer? Y/n\n', (answer) => {
        if(answer == 'Y') {
            play(compteur)
        } else if(answer == 'n') {
            process.exit(1)
        } else {
            console.log('Répondez par Y ou n')
            restart()
        }
    })
}


