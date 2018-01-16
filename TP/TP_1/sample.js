const sampleTab = ['case1', 'case2', 'case3', 'case4']
const length = sampleTab.length

var test = 'a'
var func = function () {
    var test = 'b'

    if (test === 'b') {
        var test = 'c'
        console.log(1, test)
    }
    console.log(2, test)
}

func()
console.log(3, test)


const test2 = 'a'
const func2 = function () {
    let test2 = 'b'

    if (test2 === 'b') {
        let test2 = 'c'
        console.log(11, test2)
    }
    console.log(12, test2)
}

func2()
console.log(13, test2)