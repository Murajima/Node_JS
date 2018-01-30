

console.log('Written first')

function test () {
	let promiseOK = Promise.resolve('OK')
	let promiseError = Promise.reject('ERROR')
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
	let promiseOK = new Promise((resolve, reject) => {
		resolve('ok')
	})

	let promiseError = new Promise((resolve, reject) => {
		reject('error')
	})
}

test()
test2()