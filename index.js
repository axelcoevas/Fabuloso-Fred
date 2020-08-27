if (document.readyState === 'complete') {
    const startButton = document.getElementById('startButton')
}


class Game {
    constructor() {
        this.start()
    }

    start() {
        startButton.classList.add('hide')
        swal('Fabuloso Fred', 'Buenas tardes', 'success')
    }

    getNextNumber() {
        return Math.floor(Math.random*12);
    }
}

function startGame(){
    let game = new Game()
}