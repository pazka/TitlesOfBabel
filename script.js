
phrases = []
i = 0
nb_combination_found = 0
animation = null

function add_node(phrase, special_css) {
    let p = document.createElement('p')
    p.appendChild(document.createTextNode(phrase))
    p.classList = ['text']

    if (special_css)
        p.classList.add('special')

    document.querySelector("#text").appendChild(p)

    setTimeout(() => {
        p.classList.add('visible')
    }, 10)
}

(compile_words = async () => {
    document.querySelector("#text").innerHTML = ""
    i = 0
    nb_combination_found = 0
    if (animation)
        clearTimeout(animation)

    await browseAllPossibilities((phrase) => {
        nb_combination_found++
    })
    add_node(`${new Intl.NumberFormat().format(nb_combination_found)} combination compiled... Have fun :) `)

    special_index = 50


    animation = setInterval(() => {
        add_node(generateNewPhrase(), i++ % special_index == 0)
    }, 2000)
})()

function precise(x) {
    return Number.parseFloat(x).toPrecision(4);
}
var slider = document.getElementById("myRange");
slider.oninput = function () {
    document.getElementById("spawntime").innerText = `a new title every ${precise(this.value / 1000, 2)} second`
    clearTimeout(animation)
    animation = setInterval(() => {
        add_node(generateNewPhrase(), i++ % special_index == 0)
    }, this.value)
}