let game = {

    technologies: [
        "bootstrap",
        "css",
        "electron",
        "firebase",
        "html",
        "javascript",
        "jquery",
        "mongo",
        "node",
        "react",
    ],

    cards: null,

    createCardsFromTecnologies: function() {
        this.cards = []

        for (let technology of this.technologies) {
            this.cards.push(
                {
                    id: technology + "_1",
                    icon: technology,
                    flipped: false,
                },
            
                {
                    id: technology + "_2",
                    icon: technology,
                    flipped: false,
                }
            )
        }

        game.shuffleCards()
        return this.cards
    },

    shuffleCards: function() {
        let currentIndex = this.cards.length
        let randomIndex = 0
    
        while (currentIndex !== 0) {
            randomIndex = Math.round(Math.random() * currentIndex)
            currentIndex--
    
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        }
    },

    lockMode: false,

    firstCard: null,
    secondCard: null,

    setCard: function(id) {

        let card = this.cards.filter(card => card.id === id)[0]
        console.log(card)

        if (card.flipped || this.lockMode) {

            return false

        }

        if (!this.firstCard) {

            this.firstCard = card
            this.firstCard.flipped = true
            return true

        } else {

            this.secondCard = card
            this.secondCard.flipped = true
            this.lockMode = true
            return true
                
        }

    },

    checkPair: function() {
        if (!this.firstCard || !this.secondCard) {
            return false
        }

        return this.firstCard.icon === this.secondCard.icon

    },

    clearCards: function() {
        this.firstCard = null
        this.secondCard = null
        this.lockMode = false
    },

    unflipCards: function() {
        this.firstCard.flipped = false
        this.secondCard.flipped = false

        this.clearCards()
    },

    checkGameOver: function() {
        return this.cards.filter(card => !card.flipped).length === 0 ? true : false
    },

}
