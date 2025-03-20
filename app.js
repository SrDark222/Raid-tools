document.getElementById('login-btn').addEventListener('click', () => {
    const botToken = document.getElementById('bot-token').value;

    if (botToken) {
        // Verificar se o token é válido com uma chamada API (simulada aqui)
        checkBotToken(botToken);
    } else {
        alert("Por favor, insira um token válido.");
    }
});

document.getElementById('next-screen-btn').addEventListener('click', () => {
    document.getElementById('bot-info-screen').classList.add('hidden');
    document.getElementById('servers-screen').classList.remove('hidden');
});

document.getElementById('load-servers').addEventListener('click', () => {
    // Simular o carregamento dos servidores do bot
    loadServers();
});

document.getElementById('confirm-server-btn').addEventListener('click', () => {
    document.getElementById('servers-screen').classList.add('hidden');
    document.getElementById('action-screen').classList.remove('hidden');
});

// Funções principais

function checkBotToken(token) {
    // Simulação de uma verificação de token
    console.log("Verificando token...");

    // Aqui você pode adicionar uma chamada de API para validar o token do bot

    // Após a validação do token, carregar informações do bot
    loadBotInfo(token);
}

function loadBotInfo(token) {
    // Exemplo de dados do bot, você pode puxar isso via API ou com dados do próprio bot
    setTimeout(() => {
        document.getElementById('bot-name').innerText = "Nome do Bot";
        document.getElementById('bot-nickname').innerText = "Apelido do Bot";
        document.getElementById('bot-creation-date').innerText = "01/01/2022";
        document.getElementById('bot-id').innerText = "1234567890";
        document.getElementById('bot-token-info').innerText = token;
        document.getElementById('bot-servers-count').innerText = "5";
        document.getElementById('bot-info-screen').classList.remove('hidden');
    }, 3000);
}

function loadServers() {
    // Aqui você pode pegar os servidores do bot via API
    setTimeout(() => {
        const servers = [
            { name: 'Servidor 1', id: '123' },
            { name: 'Servidor 2', id: '456' },
            { name: 'Servidor 3', id: '789' }
        ];

        const serverList = document.getElementById('servers-list');
        serverList.innerHTML = ''; // Limpar lista existente

        servers.forEach(server => {
            const li = document.createElement('li');
            li.textContent = server.name;
            li.addEventListener('click', () => {
                document.getElementById('confirm-server-btn').classList.remove('hidden');
            });
            serverList.appendChild(li);
        });
    }, 3000);
}
