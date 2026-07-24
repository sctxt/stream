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

// Bloqueia tentativas de abertura de novas janelas/abas na página principal
window.open = function() {
    console.warn("Pop-up bloqueado pelo sistema.");
    return null;
};