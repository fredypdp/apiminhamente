const left = document.querySelector(".fa-angle-left")
const right = document.querySelector(".fa-angle-right")
const setaEsquerda = document.getElementById("setaEsquerda")
const setaDireita = document.getElementById("setaDireita")
const assuntosBar = document.querySelector(".assuntos-bar-area")
// const perfil = document.querySelector(".perfil-icon")
const body = document.querySelector("body")

// perfil.addEventListener("click", () => {
//     document.querySelector(".nav-container").classList.toggle("perfil-active")
// })

// document.querySelector(".nav-container").addEventListener("click", () => {
//     document.querySelector(".nav-container").classList.remove("perfil-active")
// })

function sumirSeta(){
    const posicao = assuntosBar.scrollLeft
    console.log(posicao)
    
    if(posicao == 0){
        setaEsquerda.style.display = "none"
    } else {
        setaEsquerda.style.display = "flex" 
    }

    if(posicao == 515 || posicao == 1640){
        setaDireita.style.display = "none"
    } else {
        setaDireita.style.display = "flex" 
    }
    
}

sumirSeta()

// left.addEventListener("click", () => {
//     assuntosBar.scrollBy(-400, 0)
//     sumirSeta()
// })

right.addEventListener("click", () => {
    assuntosBar.scrollBy(400, 0)
    sumirSeta()
})