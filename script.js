// Create a popup message element
const popup = document.createElement('div');
popup.style.position = 'fixed';
popup.style.top = '50%';
popup.style.left = '50%';
popup.style.transform = 'translate(-50%, -50%)';
popup.style.padding = '20px';
popup.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
popup.style.color = 'white';
popup.style.fontSize = '18px';
popup.style.borderRadius = '10px';
popup.style.textAlign = 'center';
popup.style.zIndex = '1000';
popup.style.opacity = '0';
popup.style.transition = 'opacity 1s ease-in-out';
popup.textContent = "Warning: This game contains music! Make sure your sound is on!";

// Add the popup to the body
document.body.appendChild(popup);

// Show the popup with a fade-in effect
setTimeout(() => {
  popup.style.opacity = '1';
}, 100);

// Hide the popup after 4 seconds and remove it
setTimeout(() => {
  popup.style.opacity = '0';
  setTimeout(() => {
    popup.remove();
  }, 1000);
}, 4000);


let questStage = 0;
let currentRoll = 0;
let currentAudio = null;  // Global variable to track the currently playing audio

document.getElementById('startButton').addEventListener('click', startQuest);
document.getElementById('rollButton').addEventListener('click', rollDice);

const rollDiceButton = document.getElementById('rollButton');
const content = document.getElementById('content');
const button = document.getElementById('startButton');
const text = document.getElementById('text');
const sprite = document.getElementById('sprite');
const burgerSprite = document.getElementById('mystery-image');
const cubeContainer = document.getElementById('cube-container');

const dialogueText = document.getElementById('dialogue-text');
const imageTextContainer = document.getElementById('image-text-container');
const monologue = document.getElementById('monologue');
const dialogueBox = document.getElementById('dialogue-box');

function startQuest() {


  // Fade out the content
  content.classList.add('hidden');

  setTimeout(() => {
    // Update content based on the quest stage
    if (questStage === 0) {
        imageTextContainer.classList.remove('hidden');
        dialogueText.textContent = "................";
        text.textContent = "A very evil, oily burger has jumped behind your back. You start recalling this burger. It was the last burger from Haltern Burger Place. Your mind is getting clouded, and the world around you is blurred. The Burger... You only want a burger right now...";      sprite.src = 'sprite-scared.png'; // Default sprite
      button.innerText = "Grab it";
    } 
    else if (questStage === 1) {
        dialogueText.textContent = "NO! Carfool, don't you see it's trying to pull us apart?! RESIST!";
        text.textContent = "You are stretching out your arm...";
      sprite.src = 'sprite-scared.png'; 
      button.innerText = "Try to dodge";
    } 
    else if (questStage === 2) {

        currentRoll = 2;
        showRollScreen();
      
    currentAudio = new Audio('your-audio-file.mp3');  
    currentAudio.play();  
    } 
    else if (questStage === 3) {
        showDialogue();

        dialogueText.textContent = "Oh no, you suck at dexterity, darling! Be careful!";
        text.textContent = "After spinning and performing monk-like moves, you hit the Burger with your ponytail. It slaps him unpleasantly but doesnt do any damage. The Burger deals 1 damage by slicing your foot with a pickle.";
        button.innerText = "Continue";
    } 
    else if (questStage === 4) {
        dialogueText.textContent = "Try to insult it, darling! I've heard burgers cannot handle insults.";
        button.innerText = "Try to insult";
    } 
    else if (questStage === 5) {
        currentRoll = 3;
        showRollScreen();
    } 
    else if (questStage === 6) {
        showDialogue();
        dialogueText.textContent = "Maybe you can charm it and then kill it. Try to whistle something it might like; that's what you’re really good at!";
        text.textContent = "Your insults are insulting him—but not enough. The Burger is about to cry. Its tears are starting to show. It slaps your cheek, leaving a red spot there.";
        button.innerText = "Try to roll charisma";
        currentRoll = 5;
     
    } 
    else if (questStage === 7) {
        showRollScreen();
     
    } 
    else if (questStage === 8) {
        showDialogue();
        dialogueText.textContent = "No! You are better than that! Turn on your brain, Carlos!";
        text.textContent = "You whistled really well—in fact, so well that the Burger was inspired. You also buffed his charisma modifier by +5. It's getting too hard to resist. You spit onto your toe hair, immovably getting ready to be defeated.";
        button.innerText = "Try to be better than this";
     
    } 
    else if (questStage === 9) {
        dialogueText.textContent = "Carlos?...";
        text.textContent = "You slightly remember that you are a human and you have a brain.";
        button.innerText = "Roll for intelligence";
        currentRoll = 6;
      
    } 
    else if (questStage === 10) {

        showRollScreen();
      
    } 
    else if (questStage === 11) {
        showDialogue();
        sprite.src = 'sprite-neutral.png';
        dialogueText.textContent = ".........";
        text.textContent = "You look at your amazing girlfriend and then back at the burger. You take a deep breath and shout—";
        button.innerText = "Do a cool move";
    } 
    else if (questStage === 12) {
        sprite.src = 'sprite-happy.png';
        burgerSprite.src = 'evil-burger2.jpg';
        dialogueText.textContent = "Thank you for sharing the last meal on earth with me. I always knew our love was big enough for it.";
        text.textContent = "...—I LOVE HER MORE THAN FOOD!—you said and cut the burger in half.";
        button.innerText = "LOVE YOU";
    } 
     else if (questStage === 14) {
      playCredits(); // Handle the credits scene
    }

    // Increment quest stage
   // questStage = (questStage + 1) % 15; // Loop through 0 to 14
   questStage = (questStage + 1)
   
    // Fade back in
    content.classList.remove('hidden');
  }, 500); // Delay for the fade-out animation
}

function rollDice() {
    const cube = document.getElementById('cube');
    const result = document.getElementById('result');
    const frontFace = document.querySelector('.front');
  
    // Reset animation by forcing reflow
    cube.style.animation = 'none';
    cube.offsetHeight; // Trigger reflow
    cube.style.animation = 'spin 3s ease-out';
  
    let diceRoll = currentRoll;
    frontFace.textContent = '';  
    rollDiceButton.classList.add('hidden');
    // Show result after 3 seconds (when animation ends)
    setTimeout(() => {
      frontFace.textContent = diceRoll;  // Show the rolled number on the front face
      result.textContent = `You rolled a ${diceRoll}!`;
      // Wait 2 more second before transitioning to the next stage
      setTimeout(() => {
        startQuest(); // Move to the next stage

         // Clean up the animation style to allow the animation to reset
      cube.style.animation = '';
      frontFace.textContent = '';  // Show the rolled number on the front face
      result.textContent = ``;
      }, 2000);
  
    }, 3000); // Wait for the cube animation to finish
  }
  

  function playCredits() {
    stopCurrentAudio();
    currentAudio = new Audio('credits.mp3');
    currentAudio.play();

    monologue.classList.add('hidden');
    dialogueBox.classList.add('hidden');
    imageTextContainer.classList.add('hidden');
    button.classList.add('hidden');

    showHearts();

    const screenshots = [
        '2023-05-11 13.08.56.JPG',
        '2023-05-12 14.24.22.JPG',
        '2023-05-12 14.30.38.JPG',
        '2023-05-13 20.36.23.JPG',
        '2023-05-20 02.34.18.JPG',
        '2023-05-26 00.45.56 (7).JPG',
        '2023-05-26 17.32.58.JPG',
        '2023-05-28 09.45.30.JPG',
        '2023-08-03 15.44.34.JPG',
        '2023-08-09 18.10.28.JPG',
        '2023-08-11 00.53.58.JPG',
        '2023-08-12 22.37.27.JPG',
        '2023-08-23 18.53.26.JPG',
        '2023-09-10 17.20.20.JPG',
        '2023-09-10 17.36.11.JPG',
        '2023-09-19 12.43.38.JPG',
        '2023-10-25 22.49.35.JPG',
        '2023-11-23 23.46.14.JPG',
        '2023-11-25 22.09.40.JPG',
        '2023-12-03 21.06.48.JPG',
        '2023-12-31 19.18.46.JPG',
        '2024-01-05 01.59.29.JPG',
        'photo_2025-02-14_05-16-38.jpg',
        'photo_2025-02-14_05-16-55.jpg',
        'photo_2025-02-14_05-17-34 (2).jpg',
        'photo_2025-02-14_05-17-34.jpg',
        'photo_2025-02-14_05-17-34 (3).jpg'

    ];
    let index = 0;

    function showImage() {
        if (index >= screenshots.length) {
                // Fade to black and show final text after the last image
    setTimeout(() => {
        fadeToBlack();
    }, 3000);
    return;
        }

        const img = document.createElement('img');
        img.src = screenshots[index];
        img.classList.add('fade-image');
        
// Random rotation for that polaroid look
const randomRotation = Math.floor(Math.random() * 20 - 10);
img.style.transform += ` rotate(${randomRotation}deg)`;

// Randomized position, spread more evenly across the center area
const randomVerticalOffset = Math.floor(Math.random() - 40); // Between -20% and +20%
const randomHorizontalOffset = Math.floor(Math.random() * 20 - 20); // Between -10% and +10%

img.style.top = `${50 + randomVerticalOffset}%`;  // Centered around 50% with ±20% variation
img.style.left = `${45 + randomHorizontalOffset}%`; // Centered around 45% with ±10% variation


        document.body.appendChild(img);

        // Fade in the image
        setTimeout(() => {
            img.style.opacity = 1;
        }, 100);

        // Darken after 3 seconds and move to the next image
        setTimeout(() => {
            img.classList.add('darkened');
            index++;
            showImage(); // Recursively show the next image
        }, 4000);
    }

    showImage(); // Start the sequence
}


function stopCurrentAudio() {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null; // Reset the global audio variable
    }
}
function showHearts() {
    const hearts = document.getElementById('credits-hearts');
    hearts.classList.remove('hidden');
  
/*    setTimeout(() => {
      hearts.classList.add('hidden'); // Hide hearts after 10 seconds (adjust as needed)
    }, 10000); */
  }
  function fadeToBlack() {
    const blackout = document.createElement('div');
    blackout.style.position = 'fixed';
    blackout.style.top = 0;
    blackout.style.left = 0;
    blackout.style.width = '100vw';
    blackout.style.height = '100vh';
    blackout.style.backgroundColor = 'black';
    blackout.style.opacity = 0;
    blackout.style.transition = 'opacity 3s';
    blackout.style.zIndex = 10001;
    document.body.appendChild(blackout);

    setTimeout(() => {
        blackout.style.opacity = 1;
        showFinalText();
    }, 100); // Delay to ensure the transition works
}

function showFinalText() {
    const finalText = document.createElement('div');
    finalText.innerText = "I want to thank you for all you support and care. I don't want us to forget that we are a team and people who love each other anymore. Let's live more and have tons of photos for the next Valentine's Day ❤️  ";
    finalText.style.position = 'fixed';
    finalText.style.top = '50%';
    finalText.style.left = '50%';
    finalText.style.transform = 'translate(-50%, -50%)';
    finalText.style.color = 'white';
    finalText.style.fontSize = '2rem';
    finalText.style.textAlign = 'center';
    finalText.style.opacity = 0;
    finalText.style.transition = 'opacity 5s';
    finalText.style.zIndex = 10002;
    document.body.appendChild(finalText);

    setTimeout(() => {
        finalText.style.opacity = 1;
    }, 500); // Fade in the text after the screen turns black
}
function showRollScreen() {
    monologue.classList.add('hidden');
    dialogueBox.classList.add('hidden');
    imageTextContainer.classList.add('hidden');
    button.classList.add('hidden');

  cubeContainer.classList.remove('hidden');
  rollDiceButton.classList.remove('hidden');
}

function showDialogue() {
    cubeContainer.classList.add('hidden');
    rollDiceButton.classList.add('hidden');

    monologue.classList.remove('hidden');
    dialogueBox.classList.remove('hidden');
    imageTextContainer.classList.remove('hidden');
    button.classList.remove('hidden');
}