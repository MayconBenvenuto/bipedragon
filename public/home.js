// home.js

// Obtém o nível do usuário armazenado no atributo data-nivel do <body>
const nivel = document.body.getAttribute('data-nivel');

// Função para mostrar/ocultar botões com base no nível de usuário
function controlarBotoes() {
    // Exibe ou oculta os botões com base no nível de permissão
    document.querySelectorAll('.dashboard').forEach(dashboard => {
        const id = dashboard.id;

        switch (nivel) {
            case 'diretor':
                // O diretor vê todos os botões
                dashboard.style.display = 'block';
                break;
            case 'gerente':
                // O gerente vê todos os botões, exceto Ata Vendedor
                if (id === 'ata-vendedor') {
                    dashboard.style.display = 'none';
                } else {
                    dashboard.style.display = 'block';
                }
                break;
            case 'vendedor':
                // O vendedor vê apenas o botão Ata Vendedor
                if (id === 'ata-vendedor') {
                    dashboard.style.display = 'block';
                } else {
                    dashboard.style.display = 'none';
                }
                break;
            default:
                // Oculta todos os botões se o nível não for reconhecido
                dashboard.style.display = 'none';
                break;
        }
    });
}

// Chama a função para aplicar as regras de visibilidade
controlarBotoes();
