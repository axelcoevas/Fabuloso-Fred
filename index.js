if (document.readyState === 'complete') {
    const startButton = document.getElementById('startButton')
    const score = document.getElementById('score')
    const maxScore = document.getElementById('maxScore')
    const marron = document.getElementById('marron')
    const rosa = document.getElementById('rosa')
    const rojo = document.getElementById('rojo')
    const mostaza = document.getElementById('mostaza')
    const azul = document.getElementById('azul')
    const amarillo = document.getElementById('amarillo')
    const cyan = document.getElementById('cyan')
    const limon = document.getElementById('limon')
    const naranja = document.getElementById('naranja')
    const guinda = document.getElementById('guinda')
    const verde = document.getElementById('verde')
    const violeta = document.getElementById('violeta')
    
}

class Game {
    constructor() {
        this.init()
        setTimeout(this.nextLevel, 500)
    }

    init(){
        this.nextLevel = this.nextLevel.bind(this)
        this.chooseColor = this.chooseColor.bind(this)
        this.lightColor = this.lightColor.bind(this)
        this.turnOffColor = this.turnOffColor.bind(this)
        this.lightSecuence = this.lightSecuence.bind(this)

        this.addEventClick = this.addEventClick.bind(this)
        this.removeEventClick = this.removeEventClick.bind(this)

        this.colores = [
            marron,
            rosa,
            rojo,
            mostaza,
            azul,
            amarillo,
            cyan,
            limon,
            naranja,
            guinda,
            verde,
            violeta
        ]

        this.setMaxScore()
        this.level = 0;
        this.sublevel = 0;
        this.secuence = [];
        this.removeEventClick()
        this.toggleStartButton()
        score.innerHTML = 'SCORE: 0'
    }

    nextLevel() {
        score.innerHTML = 'SCORE: ' + this.level
        this.sublevel = 0;
        this.level++;
        const nextNum = this.getNextNumber()
        this.secuence.push(nextNum)
        this.lightSecuence()
        this.addEventClick()
    }

    toggleStartButton() {
        if(startButton.classList.contains('hide')){
            startButton.classList.remove('hide') 
        } else {
            startButton.classList.add('hide') 
        }
    }

    getNextNumber() {
        return Math.floor(Math.random()*12)
    }

    addEventClick() {
        this.colores.map(color => color.addEventListener('click', this.chooseColor)) 
    }

    removeEventClick() {
        this.colores.map(color => color.removeEventListener('click', this.chooseColor)) 
    }

    lightSecuence() {
        for(let i = 0; i<this.level ; i++) {
            setTimeout(() => this.lightColor(this.secuence[i]), 1000*i)
        }
    }

    chooseColor(ev) {
        const colorId = ev.target.dataset.number
        this.lightColor(colorId)
        if(colorId == this.secuence[this.sublevel]) {
            this.sublevel++
            if(this.sublevel === this.level) {
                this.removeEventClick()
                setTimeout(this.nextLevel, 1500)
            }
        }else {
            this.end()
        }
    }

    lightColor(color) {
        this.colores[color].classList.add('light')
        setTimeout(() => this.turnOffColor(color), 350)
    }

    turnOffColor(color) {
        this.colores[color].classList.remove('light')
    }

    end() {
        swal('Juego terminado', `Tu puntuación fue de ${score.innerHTML}`)
            .then(() => {
                this.removeEventClick()
                this.init()
            })
    }

    setMaxScore() {
        let mxs = 0;
        const score = this.level - 1
        mxs = score > mxs ? score : mxs
        const chain = 'MAX SCORE: ' + mxs
        maxScore.innerHTML = chain
    }
}

function startGame() {
    window.game = new Game()
}

