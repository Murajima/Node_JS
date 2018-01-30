

console.log('Written first')

// Promesse: Attends que les instructions passées en paramètre soit exécutées.
// 3 états: Resolved, Rejected => error, en cours

function test () {
	let promiseOK = Promise.resolve('OK') // Promesse pré-résolue
	let promiseError = Promise.reject('ERROR') // Promesse rejettée

	// Si la promesse est résolue, le code passe dans le .then((result)=>{})
	// Autrement elle passe dans le .catch((result)=>{})
	// result correspond aux données envoyées par la promesse.
	// Par exemple pour le promiseOK, le code passe dans le .then avec msg = OK
	// pour promiseError, le code passe dans le .catch avec msg = ERROR

	promiseOK.then((msg) => {
		console.log('success:', msg)
	}).catch((msg) => {
		console.log('error:', msg)
	})

	promiseError.then((msg) => {
		console.log('success:', msg)
	}).catch((msg) => {
		console.log('error:', msg)
	})
}

function test2 () {
	// Création d'une nouvelle Promesse, instantanément résolue
	let promiseOK = new Promise((resolve, reject) => {
		resolve('ok')
	})

	// Création d'une nouvelle promesse instantanément rejettée. Renvoie une erreur car l'erreur n'est pas gérée.
	// Bonne pratique: Toujours utiliser un .catch pour gérer les erreurs
	let promiseError = new Promise((resolve, reject) => {
		reject('error')
	})
}


test()
test2()

// await: attends que la promesse soit resolue
// async: Obligatoire devant une fonction qui contient un await, rend le fonction asynchrone

function resolveAfter2Seconds() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

async function asyncCall() {
  console.log('calling');
  var result = await resolveAfter2Seconds(); // Bloque l'éxecution du code jusqu'à ce que la fonction resolveAfter2Seconds retourne resolved ou rejected
  console.log(result);
  // expected output: "resolved"
}

asyncCall();