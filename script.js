// --- GLOBAL STATE ---
let currentUserRole = null;

// --- NAVIGATION LOGIC ---
function navigate(sectionId) {
    document.querySelectorAll('.section-view')
        .forEach(el => el.classList.remove('active-view'));

    document.getElementById(sectionId)
        .classList.add('active-view');

    document.querySelectorAll('nav a')
        .forEach(el => el.classList.remove('active'));

    const links = document.querySelectorAll('nav a');
    for (let link of links) {
        if (link.getAttribute('onclick')?.includes(sectionId)) {
            link.classList.add('active');
        }
    }

    if (sectionId === 'service') {
        updateServiceSectionPermissions();
    }
}

let monitorInterval;

function login(role) {
    currentUserRole = role;

    document.getElementById('login-selection').style.display = 'none';
    document.getElementById('live-monitor').style.display = 'block';

    const roleDisplay = document.getElementById('user-role-display');
    const docPanel = document.getElementById('doctor-panel');
    const famPanel = document.getElementById('family-panel');

    if (role === 'doctor') {
        roleDisplay.innerText = "Logged in as: Dr. Neha Gupta";
        docPanel.style.display = 'block';
        famPanel.style.display = 'none';
    } else {
        roleDisplay.innerText = "Logged in as: Family Member";
        docPanel.style.display = 'none';
        famPanel.style.display = 'block';
    }

    startSimulation();
}



function closeAlert() {
    document.getElementById('alert-modal').style.display = 'none';
}