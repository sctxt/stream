const modal = document.getElementById('videoModal');
const video = document.getElementById('mainVideo');
const videoSource = document.getElementById('videoSource');
const iframe = document.getElementById('mainIframe');

function openPlayer(url) {
    modal.style.display = 'flex';

    // Se o link for da API (SuperFlix ou similar) ou um site HTTP/HTTPS que não seja MP4 direto
    if (url.includes('superflixapi') || (!url.endsWith('.mp4') && url.startsWith('http'))) {
        video.style.display = 'none';
        iframe.style.display = 'block';
        iframe.src = url;
    } 
    // Se for arquivo local ou direto em MP4
    else {
        iframe.style.display = 'none';
        video.style.display = 'block';
        videoSource.src = url;
        video.load();
        video.play();
    }
}

function closePlayer() {
    modal.style.display = 'none';
    
    // Para o vídeo local e limpa a fonte
    video.pause();
    videoSource.src = '';
    
    // Limpa a URL do iframe para parar o áudio/filme ao fechar a janela
    iframe.src = '';
}

// Fechar o player se pressionar a tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closePlayer();
    }
});

// FUNÇÃO DE BUSCA/FILTRO EM TEMPO REAL
function searchCards() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        // Pega o texto do título do card
        const titleElement = card.querySelector('.card-title');
        
        if (titleElement) {
            const titleText = titleElement.textContent || titleElement.innerText;
            
            // Verifica se o termo digitado está presente no título
            if (titleText.toLowerCase().indexOf(filter) > -1) {
                card.style.display = ""; // Mostra o card
            } else {
                card.style.display = "none"; // Esconde o card
            }
        }
    });
}