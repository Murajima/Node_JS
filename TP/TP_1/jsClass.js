 class Hello {
     constructor (message) {
        this.message = message
     }
     // La fonction => conserve le contexte (donc le this)
     waitAndLogMessage () {
         setTimeout(() => {
         console.log(this.message)
         }, 1000)
     }
     // Ici pas d'utilisation de la fonction fléchée, this.message n'existe pas dans le nouveau contexte
     waitAndTryToLogMessage () {
        setTimeout(function () {
            console.log(this.message || 'No message to log...')
        }, 1000)
    }
 }

 const hello = new Hello('Hey !')
 hello.waitAndLogMessage()
 hello.waitAndTryToLogMessage()
