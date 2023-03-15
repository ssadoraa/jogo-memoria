// Variáveis para veficação de igualdade de imagens
let firstCard = '';
let secondCard = '';

// Pegando o grid, que é onde vão ficar os cards
const grid = document.querySelector('.grid');

// Lista contendo todas as imagens que serão utilizadas (colocar mesmo nome do arq)
const characters = [
    'beth',
    'jerry',
    'jessica',
    'meeseeks',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'scroopy',
    'summer',
];

// Função para criação de um elemento qualquer
const createElement = (tag, className) => {
    // Cria o elemento passando o tipo de tag e em seguida aciona as classes nele
    const element = document.createElement(tag);
    element.className = className;
    
    return element;
}

// Função para verificar se o jogo acertou todas, final do jogo
const checkedEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    // Procura todos os elementos que possui a classe e verifica se é igua a 20
    if (disabledCards.length === 20)
        alert('Parabéns!! Você venceu o jogo');
}

// Função para verificar se as cartas clicadas são iguais
const checkedCards = () => {
    // Pegando o valor do atributo das duas cartas para comparação
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    // Se acertou adiciona a classe que muda a cor
    if (firstCharacter === secondCharacter){
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');
        firstCard = '';
        secondCard = '';

        // Chama a função que verifica se o jogo acabou
        checkedEndGame();
    }else {
        // Coloca um delay para desaparecer e remove as classes
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
            firstCard = '';
            secondCard = '';
        }, 500);
    }
}

// Função para revelar a carta
const revealCard = ({ target }) => {
    // Verifica se a carta já está virada
    if (target.parentNode.className.includes('reveal-card'))
        return;

    // Verifica se a primeira carta está vazia
    if (firstCard === '') {
        // Revela a carta e armazena na variável
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === '') {// A primeira estando preenchida, verifica se a segunda está vazia
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
    }

    // Ambas preenchidas, a função vê se são iguais
    checkedCards();
}

// Função para criar os cards do jogo, parâmetro que indicará o personagem
const createCard = (character) => {
    // Chama a função de criar elemento, passando as tags e classes de cada elemento 
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    // Atribuindo a imagem do personagem a carta
    front.style.backgroundImage = `url('../images/${character}.png')`;

    // Acrescendo o front e o back a div card, tornando eles filhos do card
    card.appendChild(front);
    card.appendChild(back);

    // Adicionando o evento de clique para revelar a carta
    card.addEventListener('click', revealCard);

    // Criando o atributo que indicará o nome do personagem que apareceu quando clicou na carta
    card.setAttribute('data-character', character);

    return card;
}

// Função para carregar o jogo, gerar tudo
const loadGame = () => {
    // Array para duplicar o array dos personagens
    const duplicateCharacters = [ ...characters, ...characters ];

    // Embaralhar o array duplicado
    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    // Percorrendo o array emabaralhado de cards
    shuffledArray.forEach((character) => {
        // Crio uma carta (em branco), passando o personagem e adiciono ao grid
        const card = createCard(character);
        grid.appendChild(card);
    });
}

loadGame();