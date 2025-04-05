class Question {
    constructor(questionText, answers, correctAnswer) {
        this.questionText = questionText;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }

    checkAnswer(answer){
        return answer === this.correctAnswer;
    }
}

let questions = [
    new Question("HTML est considéré comme ______ ?", {
        a: "Langage de programmation",
        b: "Langage POO",
        c: "Langage de haute niveau",
		d: "Langage de balisage"
    }, "d"),
    new Question("Quelle propriété CSS permet de positionner un élément par rapport à son élément parent qui a un position: relative;?", {
        a: "position: fixed;",
        b: "position: absolute;",
        c: "position: relative;",
		d: "position: sticky;"
    }, "b"),
    new Question("Quelle propriété Flexbox permet d’aligner les éléments au bas du conteneur ?", {
        a: "justify-content: flex-end;",
        b: "align-items: flex-end;",
        c: "align-self: flex-end; ",
		d: "justify-items: flex-end;"
    }, "b"),
    new Question("Que va afficher le code suivant ?  console.log(2 + '2');", {
        a: "4",
        b: "22",
        c: "NaN",
		d: "Erreur"
    }, "b")
    
];