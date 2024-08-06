// Obtém o nível do usuário armazenado no atributo data-nivel do <body>
const nivel = document.body.getAttribute('data-nivel');

// Função para mostrar/ocultar botões com base no nível de usuário
function controlarBotoes() {
    // Seleciona todos os botões de dashboard
    const botoes = document.querySelectorAll('.dashboard');

    // Oculta todos os botões por padrão
    botoes.forEach(dashboard => {
        dashboard.style.display = 'none';
    });

    // Exibe os botões com base no nível de permissão
    switch (nivel) {
        case 'diretor':
            // O diretor vê todos os botões
            botoes.forEach(dashboard => {
                dashboard.style.display = 'block';
            });
            break;
        case 'gerente':
            // O gerente vê todos os botões, exceto Ata Vendedor
            document.querySelectorAll('.dashboard').forEach(dashboard => {
                if (dashboard.id !== 'ata-vendedor') {
                    dashboard.style.display = 'block';
                }
            });
            break;
        case 'vendedor':
            // O vendedor vê apenas o botão Ata Vendedor
            document.getElementById('ata-vendedor').style.display = 'block';
            break;
        default:
            // Caso o nível não seja reconhecido, oculta todos os botões
            break;
    }
}

// Chama a função para aplicar as regras de visibilidade
controlarBotoes();
