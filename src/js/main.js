// Configuração do canvas para fogos de artifício
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Classe para partículas dos fogos
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = {
            x: (Math.random() - 0.5) * 8,
            y: (Math.random() - 0.5) * 8
        };
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.015;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.velocity.y += 0.1;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= this.decay;
    }
}

let particles = [];
const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];

function createFirework(x, y) {
    const particleCount = 50;
    const color = colors[Math.floor(Math.random() * colors.length)];

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(x, y, color));
    }
}

function animate() {
    ctx.fillStyle = 'rgba(10, 10, 46, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
        if (particle.alpha <= 0) {
            particles.splice(index, 1);
        } else {
            particle.update();
            particle.draw();
        }
    });

    requestAnimationFrame(animate);
}

setInterval(() => {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.5;
    createFirework(x, y);
}, 1000);

canvas.addEventListener('click', (e) => {
    createFirework(e.clientX, e.clientY);
});

animate();

// Botão revelar mensagem
const revealBtn = document.getElementById('revealBtn');
const hiddenMessage = document.getElementById('hiddenMessage');

revealBtn.addEventListener('click', () => {
    if (hiddenMessage.classList.contains('show')) {
        hiddenMessage.classList.remove('show');
        revealBtn.textContent = '✨ Revelar Mensagem ✨';
    } else {
        hiddenMessage.classList.add('show');
        revealBtn.textContent = '✨ Ocultar Mensagem ✨';
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                createFirework(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height * 0.5
                );
            }, i * 200);
        }
    }
});

// Slider de imagens
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
let currentSlide = 0;
const slideInterval = 5000; // 5 segundos

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    slides[index].classList.add('active');
    indicators[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Auto-play do slider
setInterval(nextSlide, slideInterval);

// Clique nos indicadores
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const btnAudio = document.getElementById("btn-audio");
    const audioBg = document.getElementById("audio-bg");
    const sliderSection = document.querySelector(".right-section");

    btnAudio.addEventListener("click", () => {
        audioBg.play()
            .then(() => {
                // Mostra o slider
                sliderSection.classList.remove("slider-hidden");
                sliderSection.classList.add("slider-visible");

                // Some o botão (opcional)
                btnAudio.style.display = "none";
            })
            .catch(error => {
                console.log("Navegador bloqueou o áudio:", error);
            });
    });
});
const btnAudio = document.getElementById("btnAudio");
const audio = document.getElementById("audio-narracao");
const sliderContainer = document.querySelector(".right-section");

let sliderRevelado = false;
const tempoAlvo = 15; // SEGUNDOS

btnAudio.addEventListener("click", () => {
    audio.play();

    // Evita múltiplos gatilhos
    if (!sliderRevelado) {
        audio.addEventListener("timeupdate", () => {
            if (audio.currentTime >= tempoAlvo && !sliderRevelado) {
                sliderContainer.style.opacity = "1";
                sliderContainer.style.pointerEvents = "auto";
                sliderRevelado = true;
            }
        });
    }
});
