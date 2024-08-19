const apiKey = 'YOUR_OPENAI_API_KEY'; // Substitua pela sua chave da API do OpenAI

async function askNPC() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput.trim()) {
        alert('Por favor, digite uma pergunta.');
        return;
    }

    const response = await getNPCResponse(userInput);
    document.getElementById('npc-dialog').innerText = response;
}

async function getNPCResponse(question) {
    const endpoint = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
    const prompt = `Você é um NPC em um jogo de RPG. O jogador pergunta: "${question}". Dê uma resposta útil e amigável.`;

    try {
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                prompt: prompt,
                max_tokens: 100,
                temperature: 0.7
            })
        });

        const data = await res.json();
        return data.choices[0].text.trim();
    } catch (error) {
        console.error('Erro ao obter resposta do NPC:', error);
        return 'Desculpe, não consegui responder no momento.';
    }
}
