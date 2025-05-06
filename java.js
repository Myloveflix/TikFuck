document.addEventListener('DOMContentLoaded', function() {
    // Verificação de idade
    const ageVerification = document.getElementById('ageVerification');
    const appContainer = document.getElementById('appContainer');
    const confirmAgeBtn = document.getElementById('confirmAge');
    const denyAgeBtn = document.getElementById('denyAge');
    
    // Verificar se já confirmou a idade anteriormente
    if(localStorage.getItem('ageVerified') !== 'true') {
        ageVerification.style.display = 'flex';
    } else {
        appContainer.style.display = 'block';
    }
    
    confirmAgeBtn.addEventListener('click', function() {
        localStorage.setItem('ageVerified', 'true');
        ageVerification.style.display = 'none';
        appContainer.style.display = 'block';
    });
    
    denyAgeBtn.addEventListener('click', function() {
        window.location.href = 'https://www.google.com';
    });
    
    // Modal de upload
    const uploadBtn = document.getElementById('uploadBtn');
    const uploadModal = document.getElementById('uploadModal');
    const closeModal = document.getElementById('closeModal');
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const uploadSubmitBtn = document.getElementById('uploadSubmitBtn');
    
    uploadBtn.addEventListener('click', function() {
        uploadModal.style.display = 'flex';
    });
    
    closeModal.addEventListener('click', function() {
        uploadModal.style.display = 'none';
    });
    
    uploadArea.addEventListener('click', function() {
        fileInput.click();
    });
    
    fileInput.addEventListener('change', function(e) {
        if(e.target.files.length > 0) {
            const fileName = e.target.files[0].name;
            uploadArea.innerHTML = `
                <i class="fas fa-check-circle" style="color: #2ed573;"></i>
                <p>${fileName} pronto para upload</p>
                <button class="browse-btn">Alterar Arquivo</button>
            `;
        }
    });
    
    uploadSubmitBtn.addEventListener('click', function() {
        // Aqui você implementaria a lógica de upload real
        alert('Vídeo enviado com sucesso! (simulação)');
        uploadModal.style.display = 'none';
        // Resetar o formulário
        uploadArea.innerHTML = `
            <i class="fas fa-cloud-upload-alt"></i>
            <p>Arraste e solte seu vídeo aqui</p>
            <span>ou</span>
            <button class="browse-btn">Selecionar Arquivo</button>
        `;
        document.getElementById('videoTitle').value = '';
        document.getElementById('videoDescription').value = '';
        document.getElementById('videoTags').value = '';
        document.getElementById('videoPrivacy').value = 'public';
    });
    
    // Simulação de interação com vídeos
    const videoPlayers = document.querySelectorAll('.video-player');
    const likeButtons = document.querySelectorAll('.like-btn');
    
    videoPlayers.forEach(video => {
        // Play/pause ao clicar no vídeo
        video.addEventListener('click', function() {
            if(video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
    });
    
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = button.querySelector('i');
            const countSpan = button.querySelector('span');
            
            if(icon.classList.contains('fas')) {
                icon.classList.remove('fas');
                icon.classList.add('far');
                let count = parseInt(countSpan.textContent.replace(/\D/g, ''));
                countSpan.textContent = (count - 1).toLocaleString() + (countSpan.textContent.includes('K') ? 'K' : '');
            } else {
                icon.classList.remove('far');
                icon.classList.add('fas');
                let count = parseInt(countSpan.textContent.replace(/\D/g, ''));
                countSpan.textContent = (count + 1).toLocaleString() + (countSpan.textContent.includes('K') ? 'K' : '');
            }
        });
    });
    
    // Drag and drop para upload
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.borderColor = '#ff4757';
    });
    
    uploadArea.addEventListener('dragleave', function() {
        this.style.borderColor = '#57606f';
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.borderColor = '#57606f';
        
        if(e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            const event = new Event('change');
            fileInput.dispatchEvent(event);
        }
    });
});