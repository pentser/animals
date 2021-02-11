const $board = document.getElementById('board'),
    $language = document.getElementById('language'),
    animals=['🐶','🐱','🦍','🦆','🐸','🐝','🐔','🐴','🐘','🐏'];

    $audioTag = document.getElementById('audio'),
    soundsUrls = {
    wrong: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/wronganswer.mp3',
    correct: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/rightanswer.mp3',
   
    animals: {
      who: './sounds/who.mp3',
      '🐶': './sounds/dog.mp3',
      '🐱': './sounds/cat.mp3',
      '🦍': './sounds/gorilla.mp3',
      '🦆': './sounds/duck.mp3',
      '🐸': './sounds/frogs.mp3',
      '🐝': './sounds/bee.mp3',
      '🐔': './sounds/chicken.mp3',
      '🐴': './sounds/horse.mp3',
       '🐘': './sounds/elefant.mp3',
       '🐏': './sounds/sheep.mp3',   
    
    }
};

const playSound = (language, sound) => {
    $audioTag.src = soundsUrls[language][sound];
    $audioTag.play();
  
   
};
const playSounds = (animal) => {
   
    playSound($language.value, 'who');

    setTimeout(() => {
        playSound($language.value, animal);
    }, 4000)
}

const selectedAnswer = ($event) => {

    const isLiElement = $event.target.localName === "li";
    if (!isLiElement) { return false; }

    const currentSelectedAnswer = $event.target.dataset.id;
    const correctAnswer = $board.dataset.answer;

    const isPlayButton = $event.target.dataset.id === 'play-sound';
    if (isPlayButton) {
        return playSounds(correctAnswer);
    }


    if (currentSelectedAnswer === correctAnswer) {
        $board.classList.add('correct');

        $audioTag.src = soundsUrls.correct;
        $audioTag.play();

        setTimeout(() => {
            $board.classList.remove('correct');
            createLevel();
        }, 1300);

    } else {
        $board.classList.add('wrong');

        $audioTag.src = soundsUrls.wrong;
        $audioTag.play();

        setTimeout(() => {
            playSound($language.value, currentSelectedAnswer);
        }, 1100);

        setTimeout(() => {
            $board.classList.remove('wrong');
        }, 1300);
    }
}

const shuffle = (animalArray) => {
    let counter = animalArray.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = animalArray[counter];
        animalArray[counter] = animalArray[index];
        animalArray[index] = temp;
    }
    return animalArray;
}
const createLevel = () => {


    $board.innerHTML = '';
    const random = Math.floor(Math.random() * 10);
    $board.dataset.answer =  animals[random];
    playSounds(animals[random]);

    const randomAnimals = shuffle(animals); // return array of shuffled animals
    randomAnimals.forEach((number) => {
        const liElement = document.createElement('li');
        liElement.innerText = number;
        liElement.dataset.id = number;
        $board.appendChild(liElement);
    });

    const playButton = document.createElement('li');
    playButton.classList.add('play-sound');
    playButton.dataset.id = 'play-sound';
    $board.appendChild(playButton);
}

createLevel();

$board.addEventListener('click', selectedAnswer);
