let mic;
let alrightComputer = false;
let transcript;
let lastUpdateTime = 0;
let bCircle = 150;
let idkPlaceHolder = false;
var video = document.createElement('video');
      video.src = 'https://alrightcomputer.s3.us-east-2.amazonaws.com/ModernManFinal-1.mp4';
      video.controls = false;
      video.autoplay = false;
      video.pause();
      video.style.position = 'fixed';
      video.style.top = '0';
      video.style.left = '0';
      video.style.width = '0' + 'px';
      video.style.height = '0' + 'px';
      video.style.zIndex = '-90';
      document.body.appendChild(video);


function preload() {
  orbLight = loadImage('assets/light.png');
  soncaloLogo = loadImage('assets/soncaloLogo.png');
}

p5.AudioIn();

let 
function setup() {
  createCanvas(windowWidth, windowHeight);


// create a new style element
var style = document.createElement('style');

// set up alrightArial font
style.appendChild(document.createTextNode('@font-face { font-family: "alrightArial"; src: url("../Assets/alrightArial.ttf"); }'));

// set up alrightArialAgain font
style.appendChild(document.createTextNode('@font-face { font-family: "alrightArialAgain"; src: url("../Assets/alrightArialAgain.ttf"); }'));

// append the style element to the document head
document.head.appendChild(style);



  // establish audio
  mic = new p5.AudioIn();
  
  // establish recognition
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  // recognition parameters
  recognition.lang = 'en-US';
  recognition.continuous = true;
  recognition.interimResults = false;

  // start recognition
  recognition.start();

    }
  
function draw() {
  //call the orb
  lordOrb();

  //dark mode
  alrightListening();
  
}

// function to make links clickable
function link(x, y, w, h, url) {
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    cursor(HAND);
    if (mouseIsPressed) {
      window.open(url, '_blank');
    }
  } else {
    //adjust for the 2 boxes
    if (mouseX > width - 100 && mouseX < width - 100 + 100 && mouseY > height - 50 && mouseY < height - 50 + 50){
    }else{
      cursor(ARROW);
    }
  }
}


function lordOrb(){

  let circleClicked = false
  let cSize = 150 
  let circleY = windowHeight / 2 - 75 * 0.1 * Math.sin(frameCount * 0.05)
  let circleHover = (dist(mouseX, mouseY, windowWidth / 2, circleY) < (cSize / 2))
  let alrightComputerTimeout;
//foundation


  //circleHover
  if (circleHover){
    // alrightReply();
    mic.start();
    background('white');
    fill('black');
    textSize(85);
    textFont('alrightArial');
    text('Hello!', width/2, 90);
    textSize(16);
    textFont('alrightArialAgain');
    text('How may I assist you?', width/2, 180);
    cSize = Math.min(300, 150 + mic.getLevel() * 1000)
    
    recognition.continuous = true;
    recognition.interimResults = false;
    clearTimeout(alrightComputerTimeout);
    //log all speech
    recognition.onresult = function(event) {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript = event.results[i][0].transcript;
        console.log(transcript);

        //phraseDetection
        if (transcript.includes("alright computer") || transcript.includes("all right computer")) { 
        transcript = ""
        //enable darkmode alrightListening
        alrightComputer = true 
        //reset lordOrb & all after 20 seconds
        if (modernMan){}
        else{
    alrightComputerTimeout = setTimeout(() => {
      alrightComputer = false;
    }, 20000); // set a 20 second delay
  }
    //clearTimeout(alrightComputerTimeout);

        //reset recognition
        recognition.stop();
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.start();

        
      }else{
    mic.stop();
  
  }}}


 //detecting circleClicked
  if (mouseIsPressed && dist(mouseX, mouseY, width / 2, circleY) <= cSize / 2) {
    circleClicked = true;
  } else {
    circleClicked = false;
  }


  //circleClicked (cSize, background, text, phraseDetection)
  textAlign(CENTER, TOP);
  if(circleClicked){
    background('white');
    fill('black');
    textSize(16);
    textFont('alrightArialAgain');
    text('Start prompt by saying...', width/2, 105)
    textSize(64);
    textFont('alrightArial');
    text('"Alright, Computer"', width/2, 140);
    circleHover = true;
    }
        
  }else{
    if(alrightComputer){
      //nothing if mouse is still holding
    } else{
      //remain the same / foundation
    fill('black');
    background('white');
    textAlign(CENTER, TOP);
    textSize(85);
    textFont('alrightArial');
    text('Hello!', windowWidth/2, 90);
    textSize(16);
    textFont('alrightArialAgain');
    text('How may I assist you?', windowWidth/2, 180);
    
  }}



  //lordOrb flesh
  circle(width / 2, circleY, cSize);

  //orbLight
  const centerX = width / 2;
  const circleRadius = cSize / 2;
  const distance = dist(mouseX, mouseY, centerX, circleY);

  if (distance > circleRadius) {
    const angle = atan2(mouseY - circleY, mouseX - centerX);
    innerX = centerX + cos(angle) * circleRadius;
    innerY = circleY + sin(angle) * circleRadius;
  } else {
    // If the distance is within the radius, use the current mouse position
    innerX = mouseX;
    innerY = mouseY;
  }
 
  let opacity = map(distance-80, 0, cSize/2, 80, 0);
  tint(255, opacity);

  // draw the white circle within the black circle
  blendMode(LIGHTEST);
  imageMode(CENTER);
  //adjust for orb idle movement
  image(orbLight,innerX, innerY, 50 + (50 * (0.02*cSize)), 50 + (50 * (0.02*cSize)));
  blendMode(BLEND);
  noTint();

  //self-attribution
      fill('black');
      rect(width - 100, height - 50, 100, 100, 50, 0, 0, 0);
      
      link(width - 100, height - 50, 50, 50, 'https://www.soncalo.com/modernman');

      image(soncaloLogo, width - 25, height - 24, 9, 20);
      link(width - 50, height - 50, 50, 50, 'https://www.soncalo.com');

      textFont('alrightArialAgain');
      textSize(16);
      fill('white');
      text('?', width - 60, height - 30);
      fill('black');
}



function alrightListening() {
  recognition.interimResults = true;
  let cSize = 150;
  if (alrightComputer) {
    mic.start();
    //type text behind
    background('black');
    fill('white');
    textSize(64);
    textAlign(CENTER, TOP);
    textFont('alrightArial');
    text("Alright, Computer, " + transcript, width/2, 140);
// Check if the transcript exceeds the window width
    if (textWidth('Alright, Computer, ' + transcript) > windowWidth) {
      // Add a new line by appending a line break to the transcript
      transcript += '\n';
    }

    
    
    // reincarnate lordOrb i guess
    cSize = Math.min(300, 150 + mic.getLevel() * 5000);
    let circleY = windowHeight / 2 - 75 * 0.1 * Math.sin(frameCount * 0.05);
    let circleHover = (dist(mouseX, mouseY, windowWidth / 2, circleY) < (cSize / 2));
    fill('white');
    circle(width / 2, circleY, cSize);
    if (circleHover){
    }else{
      alrightComputer = false};
    
    //update transcript
    recognition.continuous = true;
    recognition.onresult = event => {
         transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
      }
    //detect for BA project 'Modern Man' phrases
    if (transcript.includes("Modern Man") || transcript.includes("project") || transcript.includes("modern man")) { 
      modernMan();
    }else{};
  }
};

  function modernMan(){
    noStroke();
    
    //white circle expands until big enough
    if (bCircle < windowWidth + 400) {
      if (millis() - lastUpdateTime > 1000/100) {
        bCircle += 10;
        lastUpdateTime = millis();
      }
    }else{
      if (idkPlaceHolder){}
      else{
      //big boy becomes tiny (and uh black)
      bCircle = 150.5;
      idkPlaceHolder = true;
      }
    }
    
    if (idkPlaceHolder){
      background('white');
      fill('black');
    }{}
    
    circle(width/2, height/2, bCircle);

    if (bCircle >= windowWidth + 100.5 && idkPlaceHolder){
      video.style.zIndex = '99999';
      video.style.width = window.innerWidth + 'px';
      video.style.height = window.innerHeight + 'px';
      video.play();
      alrightComputer = true;
    //1 minute and 30 seconds
    setTimeout(() => {
      alrightComputer = false;
      video.style.zIndex = '-90';
    }, 90000);
  };
}
  
// function alrightReply(){
// //Eleven Labs voices
// }
