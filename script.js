const projects = [
    { 
        title: "Duri Tropic", 
        tag: "Marketing Strategy", 
        img: "duritropic.png", 
        file: "strategie_de_lancement_marketing.pdf", 
        desc: "Analyse et stratégie complète pour le lancement d'une boisson énergisante au Durian.", 
        tools: "Canva, Photoshop",
        team: "Équipe (5 personnes)",
        role: "Chef de projet & réalisation de supports de communication visuelle"
    },
    { 
        title: "Le Fou du Bus", 
        tag: "Audiovisuel", 
        img: "bus.png", 
        file: "fou du bus.pdf", 
        desc: "Dossier de production cinématographique.", 
        tools: "Canva",
        team: "Équipe (5 personnes)",
        role: "Directeur artistique"
    },
    { 
        title: "Désiré Doué Edit", 
        tag: "Audiovisuel", 
        img: "edit doue.png", 
        file: "edit doue.png", 
        desc: "Montage vidéo dynamique.", 
        tools: "Capcut",
        team: "Solo",
        role: "Monteur vidéo"
    },
    { 
        title: "Biolink", 
        tag: "Création numérique", 
        img: "biolink.png", 
        file: "BIOLINK.pdf", 
        desc: "Interface de liens optimisée.", 
        tools: "Canva",
        team: "Solo",
        role: "Graphiste"
    },
    { 
        title: "Neymar Edit", 
        tag: "Création numérique", 
        img: "edit neymar.png", 
        file: "ney.mp4",
        desc: "Edit vidéo réalisé sur CapCut mettant en scène le célèbre joueur de football Neymar.", 
        tools: "CapCut",
        team: "Solo",
        role: "Monteur"
    },
    { 
        title: "GANTT", 
        tag: "Gestion de projet", 
        img: "GANTT mairie.png", 
        file: "Gestion de projet Mairie de Villedémo.pdf", 
        desc: "Planification et gestion d'un projet de mairie.", 
        tools: "GANTT, Google Drive",
        team: "Équipe (2 personnes)",
        role: "Gestionnaire de planning"
    },
    { 
        title: "Projet audiovisuel", 
        tag: "Production vidéo", 
        img: "sae104.png", 
        file: "SAE104_2025_GH_Andre_Romain_Dolon_Laureen_Soares_Enzo_Durville_Enzo_InterviewSAE104.mp4", 
        desc: "Production d'une vidéo (interview) avec sous-titres en anglais dans le cadre d'un projet universitaire.", 
        tools: "GANTT, Google Drive",
        team: "Équipe",
        role: "Acteur & technicien son"
    }
];

// --- AFFICHAGE DES CARTES ---
function displayProjects() {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;
    
    gallery.innerHTML = projects.map((p, index) => `
        <div class="project-card" onclick="openModal(${index})">
            <div class="project-img-container">
                <img src="images/${p.img}" class="project-img" onerror="this.src='${p.img}'">
            </div>
            <div class="project-content" style="padding: 15px;">
                <span style="color:var(--accent); font-size:0.7rem; font-weight:bold; text-transform: uppercase;">${p.tag}</span>
                <h3 style="font-size:1.1rem; margin-top:5px; color: white;">${p.title}</h3>
            </div>
        </div>
    `).join('');
}

// --- OUVERTURE DE LA MODALE ---
function openModal(index) {
    const p = projects[index];
    const modal = document.getElementById('projectModal');
    
    document.getElementById('modalTitle').innerText = p.title;
    document.getElementById('modalDesc').innerText = p.desc;
    document.getElementById('modalTag').innerText = p.tag;
    document.getElementById('modalTools').innerText = p.tools;
    
    // Nouveaux éléments
    document.getElementById('modalTeam').innerText = p.team || "Non précisé";
    document.getElementById('modalRole').innerText = p.role || "Non précisé";
    
    const modalImg = document.getElementById('modalImg');
    modalImg.src = "images/" + p.img;
    modalImg.onerror = function() { this.src = p.img; };

    const modalLink = document.getElementById('modalLink');
    if (p.file) {
        modalLink.style.display = 'inline-block';
        modalLink.href = p.file; 
        modalLink.setAttribute('download', p.file);
    } else {
        modalLink.style.display = 'none';
    }

    modal.style.display = 'flex';
}

function closeModal() { 
    document.getElementById('projectModal').style.display = 'none'; 
}

// --- SYSTÈME DE FOND ANIMÉ (PARTICULES) ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = Math.random() * 1.5 - 0.75;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = 'rgba(138, 43, 226, 0.5)';
        ctx.beginPath(); 
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); 
        ctx.fill();
    }
}

function connect() {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 150) {
                ctx.strokeStyle = `rgba(138, 43, 226, ${1 - (distance / 150) * 0.2})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}

function init() {
    resizeCanvas();
    particles = [];
    for (let i = 0; i < 80; i++) particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    connect();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', init);
init(); 
animate(); 
displayProjects();