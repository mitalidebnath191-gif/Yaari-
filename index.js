// Chobi set korar function
function setupImage() {
    const imageInput = document.getElementById('inputImage');
    const displayImage = document.getElementById('display-image');
    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            displayImage.src = e.target.result;
        }
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        displayImage.alt = "No image uploaded";
    }
}

// 1. Preview Birthday (Nije dekhar jonno)
function startJourney() {
    let userName = document.getElementById('inputName').value;
    if(userName === "") userName = "Friend";
    let relation = document.getElementById('inputRelation').value;
    
    document.getElementById('display-name-1').innerHTML = "Happy Birthday,<br>" + userName;
    document.getElementById('display-name-2').innerText = "Happy Birthday, " + userName;
    document.getElementById('display-name-3').innerText = "Dear " + userName + ",";

    let customMsg = "I wish you a very happy birthday ✨";
    if(relation === "Best Friend") {
        customMsg = "Because you are the Best Friend anyone could ask for! 💖";
    } else if(relation === "Di Di Bhai") {
        customMsg = "Because you are the sweetest Di Di Bhai! Love you! 🌸";
    }
    document.getElementById('dynamic-msg').innerText = customMsg;

    setupImage();
    nextScreen('1'); 
}

// 2. Birthday Link Generate Korar Function
function shareBdayLink() {
    let userName = document.getElementById('inputName').value;
    if(userName.trim() === "") {
        alert("Please nam likhun!");
        return;
    }
    let relation = document.getElementById('inputRelation').value;
    
    // URL e data pass kora hocche
    let currentUrl = window.location.href.split('?')[0]; 
    let shareableLink = currentUrl + "?bday=true&n=" + encodeURIComponent(userName) + "&r=" + encodeURIComponent(relation);
    
    // Jodi Yaari-er modal thake, seta use korbe, na hole default alert asbe
    if (document.getElementById('link-modal')) {
        document.getElementById('generated-link').value = shareableLink;
        document.getElementById('link-modal').style.display = 'flex';
    } else {
        prompt("Apnar Birthday Link! Eta copy kore bondhuke pathan:", shareableLink);
    }
}

// 3. Keu Birthday Link click kore asle direct page dekhano
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    if(urlParams.get('bday') === 'true') {
        let userName = urlParams.get('n') || "Friend";
        let relation = urlParams.get('r') || "Friend";

        // Setup UI bondho kore dewa
        document.querySelectorAll('.screen').forEach(s => {
            s.classList.remove('active');
            s.style.display = 'none';
            s.style.opacity = '0';
        });

        // Text gulo set kora
        document.getElementById('display-name-1').innerHTML = "Happy Birthday,<br>" + userName;
        document.getElementById('display-name-2').innerText = "Happy Birthday, " + userName;
        document.getElementById('display-name-3').innerText = "Dear " + userName + ",";

        let customMsg = "I wish you a very happy birthday ✨";
        if(relation === "Best Friend") {
            customMsg = "Because you are the Best Friend anyone could ask for! 💖";
        } else if(relation === "Di Di Bhai") {
            customMsg = "Because you are the sweetest Di Di Bhai! Love you! 🌸";
        }
        document.getElementById('dynamic-msg').innerText = customMsg;
        
        // Ektu delay kore Prothom Birthday Screen (screen-1) dekhano
        setTimeout(() => {
            showNext('1');
        }, 100);
    }
});

// Smooth Screen Transition Logic
function nextScreen(nextId) {
    const currentActive = document.querySelector('.screen.active');
    
    if(currentActive) {
        currentActive.style.opacity = '0';
        currentActive.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            currentActive.classList.remove('active');
            currentActive.style.display = 'none';
            showNext(nextId);
        }, 500);
    } else {
        showNext(nextId);
    }
}

function showNext(nextId) {
    const nextScreen = document.getElementById('screen-' + nextId);
    nextScreen.style.display = 'flex';
    
    setTimeout(() => {
        nextScreen.classList.add('active');
        nextScreen.style.opacity = '1';
        nextScreen.style.transform = 'scale(1)';
    }, 50);
}

// Balloon Pop Logic 
let poppedCount = 0;
function popBalloon(num, element) {
    if (element.style.visibility !== 'hidden') {
        element.style.visibility = 'hidden'; 
        document.getElementById('msg-' + num).style.display = 'block'; 
        poppedCount++;
        
        if(poppedCount === 3) {
            document.getElementById('more-reasons').style.display = 'block';
            document.getElementById('btn-3').style.display = 'block';
        }
    }
}

