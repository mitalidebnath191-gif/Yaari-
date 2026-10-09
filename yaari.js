// 1. Yaari HTML Code JavaScript diye page-e add kora hocche
const yaariHTML = `
    <!-- Yaari Creator Screen (1st Photo er UI) -->
    <div id="screen-yaari-creator" class="screen" style="background: white; padding:0; justify-content: flex-start; display:none;">
        
        <!-- Top Blue Section -->
        <div style="background: #e1effe; width: 100%; padding: 50px 20px; box-sizing: border-box; position: relative;">
            <!-- Music Button -->
            <button style="position: absolute; left: 20px; top: 20px; width: 45px; height: 45px; background: white; border: 2px solid #3b82f6; border-radius: 10px; color: #3b82f6; font-size: 20px; cursor:pointer; font-weight: bold;">🎵</button>
            
            <!-- Upload Photo Circle -->
            <div onclick="document.getElementById('yaariImage').click()" style="width: 180px; height: 180px; border: 4px dashed #93c5fd; border-radius: 50%; margin: 0 auto; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; background: transparent;">
                <span style="color: #3b82f6; font-size: 60px;">⬆️</span>
            </div>
            <h2 style="color: #60a5fa; margin-top: 20px;">Upload Photo</h2>
            <input type="file" id="yaariImage" style="display:none;" accept="image/*">
        </div>

        <!-- Form Section -->
        <div style="width: 100%; padding: 30px; box-sizing: border-box; text-align: left; background: white; flex-grow: 1;">
            
            <input type="text" id="yaariMsg" placeholder="Write your message here" style="width: 100%; padding: 15px 0; font-size: 18px; border: none; border-bottom: 2px solid #333; outline: none; margin-bottom: 30px; font-family: serif; color: #333;">
            
            <input type="text" id="yaariName" placeholder="Your name" style="width: 100%; padding: 15px 10px; font-size: 18px; border: none; border-bottom: 2px solid #333; background: #f0f4f8; outline: none; margin-bottom: 40px; font-family: serif; box-sizing:border-box; color: #333;">

            <button style="width: 100%; padding: 15px; background: white; border: 1px solid #ddd; border-radius: 25px; font-size: 18px; color: #a3a3a3; margin-bottom: 15px; font-family: sans-serif;">Settings</button>
            
            <button id="yaariCreateBtn" style="width: 100%; padding: 15px; background: #d1d5db; border: none; border-radius: 25px; font-size: 18px; color: white; font-weight: bold; font-family: sans-serif; cursor: pointer;" onclick="generateYaariLink()">Create Gifft</button>
        </div>
    </div>

    <!-- Link Show Korar Popup Modal -->
    <div id="link-modal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:999; justify-content:center; align-items:center; flex-direction:column; padding:20px; box-sizing:border-box;">
        <div style="background:white; padding:30px; border-radius:15px; text-align:center; width:90%; max-width:400px;">
            <h3 style="color:#333;">Your Link is Ready!</h3>
            <p style="color:#666; font-size:14px;">Ei link ta apnar bondhuke pathan. Se sudhu gift dekhte pabe.</p>
            <textarea id="generated-link" style="width:100%; padding:10px; margin:15px 0; border-radius:8px; border:1px solid #ccc; font-size:12px;" rows="4" readonly></textarea>
            <button onclick="copyLink()" style="background:#3b82f6; color:white; padding:10px 20px; border:none; border-radius:20px; font-size:16px; cursor:pointer;">Copy Link</button>
            <button onclick="closeModal()" style="background:#ef4444; color:white; padding:10px 20px; border:none; border-radius:20px; font-size:16px; cursor:pointer; margin-top:10px;">Close</button>
        </div>
    </div>

    <!-- Yaari Receiver Screen (Kake pathale ja dekhabe) -->
    <div id="screen-yaari-receiver" class="screen" style="background: #40e0d0; color: black; display:none;">
        <h1 id="receiver-title" style="font-family: cursive; font-size: 36px; padding: 20px;">Name sent you a letter</h1>
        <div style="font-size: 60px; margin-top: 20px;">⬇️</div>
        <div style="font-size: 120px; margin-top: 20px; cursor: pointer;" onclick="openLetter()">✉️</div>
        <p style="font-weight: bold; margin-top: 20px;">Press to open</p>
    </div>

    <!-- Final Message Screen -->
    <div id="screen-yaari-final" class="screen" style="background: #ffcc00; color: black; display:none;">
        <div style="background: white; padding: 30px; border-radius: 15px; width: 80%; box-shadow: 0 10px 20px rgba(0,0,0,0.2);">
            <h3 id="final-from-name" style="margin: 0; font-size: 20px;">From Name</h3>
            <p id="final-message" style="font-size: 24px; margin: 20px 0;">Message here</p>
            <button style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 20px; background: white; margin-bottom: 10px; font-size: 16px;">💬 Reply</button>
            <button style="width: 100%; padding: 12px; border: none; border-radius: 20px; background: #16a34a; color: white; font-weight: bold; font-size: 16px;" onclick="location.href='index.html'">🎁 Create your own gifft</button>
        </div>
    </div>
`;

// HTML take body er sese jure deoa hocche
document.body.insertAdjacentHTML('beforeend', yaariHTML);


// ==============================================
// 2. JS LOGIC (Sob ekhane roilo)
// ==============================================

// Input gulo track korar event listener
document.getElementById('yaariName').addEventListener('input', checkYaariInputs);
document.getElementById('yaariMsg').addEventListener('input', checkYaariInputs);

// Yaari button click korle ei function cholbe
function startYaari() {
    nextScreen('yaari-creator'); 
}

function checkYaariInputs() {
    let name = document.getElementById('yaariName').value;
    let msg = document.getElementById('yaariMsg').value;
    let btn = document.getElementById('yaariCreateBtn');
    
    // Jodi duto box ei lekha thake tahole button color blue hobe
    if(name.trim() !== "" && msg.trim() !== "") {
        btn.style.background = "#3b82f6"; // Blue color
    } else {
        btn.style.background = "#d1d5db"; // Grey color
    }
}

// Create Gifft e click korle link toiri hobe
function generateYaariLink() {
    let name = document.getElementById('yaariName').value;
    let msg = document.getElementById('yaariMsg').value;
    
    if(name.trim() === "" || msg.trim() === "") {
        alert("Please nam ar message likhe din!");
        return;
    }
    
    let currentUrl = window.location.href.split('?')[0]; 
    let shareableLink = currentUrl + "?yaari=true&n=" + encodeURIComponent(name) + "&m=" + encodeURIComponent(msg);
    
    document.getElementById('generated-link').value = shareableLink;
    document.getElementById('link-modal').style.display = 'flex';
}

function copyLink() {
    let copyText = document.getElementById("generated-link");
    copyText.select();
    document.execCommand("copy");
    alert("Link Copied! Ebar apnar bondhuke pathan.");
}

function closeModal() {
    document.getElementById('link-modal').style.display = 'none';
}

function openLetter() {
    nextScreen('yaari-final');
}

// ==============================================
// 3. RECEIVER LINK CHECK (Keu link theke asle)
// ==============================================
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    if(urlParams.get('yaari') === 'true') {
        let senderName = urlParams.get('n');
        let senderMsg = urlParams.get('m');
        
        // Ektu delay kore prothom setup screen hide kore dicchi
        setTimeout(() => {
            document.querySelectorAll('.screen').forEach(s => {
                s.classList.remove('active');
                s.style.display = 'none';
                s.style.opacity = '0';
            });
            
            // Text gulo update kora
            document.getElementById('receiver-title').innerText = senderName + " sent\nyou a letter";
            document.getElementById('final-from-name').innerText = "From " + senderName;
            document.getElementById('final-message').innerText = senderMsg;
            
            // Receiver er letter screen ta show korabe
            showNext('yaari-receiver');
        }, 100); 
    }
});
    
