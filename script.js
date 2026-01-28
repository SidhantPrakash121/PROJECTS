<
        // --- GLOBAL STATE ---
        let currentUserRole = null; // 'doctor', 'family', or null

        // --- NAVIGATION LOGIC ---
        function navigate(sectionId) {
            // Hide all sections
            document.querySelectorAll('.section-view').forEach(el => el.classList.remove('active-view'));
            // Show target section
            document.getElementById(sectionId).classList.add('active-view');
            
            // Update Active Nav Link
            document.querySelectorAll('nav a').forEach(el => el.classList.remove('active'));
            // Use querySelector to find the link containing the text or href match
            // Simple approximation for this prototype
            const links = document.querySelectorAll('nav a');
            for(let link of links) {
                if(link.getAttribute('onclick') && link.getAttribute('onclick').includes(sectionId)) {
                    link.classList.add('active');
                }
            }

            // PERMISSION CHECK FOR SERVICE SECTION
            if (sectionId === 'service') {
                updateServiceSectionPermissions();
            }
        }

        // --- LOGIN & PERMISSIONS LOGIC ---
        let monitorInterval;

        function login(role) {
            currentUserRole = role; // Store role globally

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

        function logout() {
            currentUserRole = null; // Reset role
            clearInterval(monitorInterval);
            document.getElementById('live-monitor').style.display = 'none';
            document.getElementById('login-selection').style.display = 'block';
            document.getElementById('bpm-val').innerText = "--";
            document.getElementById('bp-val').innerText = "--/--";
        }

        // This function runs whenever the "Service" tab is opened
        function updateServiceSectionPermissions() {
            const addMedForm = document.getElementById('add-med-form');
            const guestMsg = document.getElementById('guest-med-msg');
            const roleIndicator = document.getElementById('service-role-indicator');

            if (currentUserRole === 'doctor') {
                addMedForm.style.display = 'block'; // Show form
                guestMsg.style.display = 'none';    // Hide warning
                roleIndicator.innerText = "Viewing as: Dr. Neha Gupta (Access Granted)";
                roleIndicator.style.color = "var(--primary-blue)";
                roleIndicator.style.fontWeight = "bold";
            } else {
                addMedForm.style.display = 'none';  // Hide form
                guestMsg.style.display = 'block';   // Show warning
                if (currentUserRole === 'family') {
                    roleIndicator.innerText = "Viewing as: Family Member (Read Only)";
                } else {
                    roleIndicator.innerText = "Viewing as: Guest (Read Only)";
                }
                roleIndicator.style.color = "#666";
            }
        }

        function addMedicine() {
            const input = document.getElementById('new-med-name');
            const medName = input.value.trim();
            
            if (medName) {
                const list = document.getElementById('med-list');
                const newItem = document.createElement('li');
                // Adding a doctor badge to the new item
                newItem.innerHTML = `<span>${medName}</span> <small style="color:var(--primary-blue); font-weight:bold;">(New)</small>`;
                list.appendChild(newItem);
                input.value = ''; // Clear input
            } else {
                alert("Please enter a medicine name.");
            }
        }

        // --- SIMULATION LOGIC ---
        function startSimulation() {
            monitorInterval = setInterval(() => {
                // Heart Rate: Random between 60 and 100
                const bpm = Math.floor(Math.random() * (100 - 60 + 1) + 60);
                
                // BP: Sys 110-130, Dia 70-85
                const sys = Math.floor(Math.random() * (130 - 110 + 1) + 110);
                const dia = Math.floor(Math.random() * (85 - 70 + 1) + 70);

                document.getElementById('bpm-val').innerText = bpm + " BPM";
                document.getElementById('bp-val').innerText = sys + "/" + dia + " mmHg";

                // Random Critical Alert Trigger (approx 5% chance every 2 seconds)
                if (Math.random() > 0.95) {
                    triggerAlert();
                }

            }, 2000);
        }

        function triggerAlert() {
            const modal = document.getElementById('alert-modal');
            modal.style.display = 'flex';
        }

        function closeAlert() {
            document.getElementById('alert-modal').style.display = 'none';
        }

