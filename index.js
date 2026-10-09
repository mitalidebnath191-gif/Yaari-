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

// Birthday (Start Magic) er function
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

// Smooth Screen Transition Logic (Common Function)
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
