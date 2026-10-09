// Chobi set korar jonno common function
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

// ==========================================
// 1. BIRTHDAY THEME (Start Magic)
// ==========================================
function startJourney() {
    let userName = document.getElementById('inputName').value;
    if(userName === "") userName = "Friend";
    let relation = document.getElementById('inputRelation').value;
    
    // Birthday Text Set Kora
    document.getElementById('top-text-1').innerText = "it's officially your day";
    document.getElementById('display-name-1').innerHTML = "Happy Birthday,<br>" + userName;
    document.getElementById('sub-text-1').innerText = "and just like that, you're turning a year older ✨";
    
    document.getElementById('top-text-2').innerText = "First things first 🎂";
    document.getElementById('icon-2').innerText = "🎂";
    document.getElementById('display-name-2').innerText = "Happy Birthday, " + userName;
    document.getElementById('sub-text-2').innerText = "Make a wish 🕯️";
    
    document.getElementById('display-name-3').innerText = "Dear " + userName + ",";
    document.getElementById('letter-text').innerText = "Every year I try to find the perfect words and every year I fall short. You make my most ordinary days feel special. Thank you for being you!";

    let customMsg = "I wish you a very happy birthday ✨";
    if(relation === "Best Friend") {
        customMsg = "Because you are the Best Friend anyone could ask for! 💖";
    } else if(relation === "Di Di Bhai") {
        customMsg = "Because you are the sweetest Di Di Bhai! Love you! 🌸";
    }
    document.getElementById('dynamic-msg').innerText = customMsg;

    setupImage();
    nextScreen(1);
}

// ==========================================
// 2. YAARI (FRIENDSHIP) THEME
// ==========================================
function startYaari() {
    let userName = document.getElementById('inputName').value;
    if(userName === "") userName = "Dost"; // Yaari te default nam "Dost"
    
    // Yaari Text Set Kora
    document.getElementById('top-text-1').innerText = "cheers to our bond";
    document.getElementById('display-name-1').innerHTML = "Happy Friendship,<br>" + userName;
    document.getElementById('sub-text-1').innerText = "our Yaari gets stronger every single day 🤝✨";
    
    document.getElementById('top-text-2').innerText = "A toast to us 🍕";
    document.getElementById('icon-2').innerText = "🍕"; // Cake er bodole pizza
    document.getElementById('display-name-2').innerText = "Cheers, " + userName;
    document.getElementById('sub-text-2').innerText = "Friends forever 🤞";
    
    document.getElementById('display-name-3').innerText = "Dear " + userName + ",";
    document.getElementById('letter-text').innerText = "Having you as a friend is like having a constant source of happiness. Thanks for dealing with my craziness and being my partner in crime. Cheers to our Yaari!";

    document.getElementById('dynamic-msg').innerText = "Because our Yaari is simply the best! 🤝💖";

    setupImage();
    nextScreen(1);
}

// ==========================================
// Smooth Screen Transition Logic
// ==========================================
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

// ==========================================
// Balloon Pop Logic
// ==========================================
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
