// Pegar o input e o botão para liberar o play
const input = document.querySelector('.input-login');
const button = document.querySelector('.btn-login');
// Pegar o form para enviar o nome do usuário
const form = document.querySelector('.form-login');

// Função que irá validar se possui algo escrito no campo de input
const validateInput = ({ target }) => {
    // Se a quantidade de caracteres for > 3, retira o atributo 'disabled'
    if (target.value.length > 3)
        button.removeAttribute('disabled');
    // Se não, permanece desabilitado, colocando o atributo novamente
    else
        button.setAttribute('disabled', '');
}

// Função responsável por enviar o form e ir para a página do jogo
const handleSubmit = (event) => {
    event.preventDefault();

    // Salvando o input no localStorage do navegador
    localStorage.setItem('player', input.value);
    // Redirecionando para a tela do jogo
    window.location = 'pages/game.html';

}

// Adicionar evento quando o campo input for alterado
input.addEventListener('input', validateInput);
// Adicionar evento quando o formulário for enviado
form.addEventListener('submit', handleSubmit);