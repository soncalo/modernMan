let mic;
let alrightComputer = false;
let transcript;
let lastUpdateTime = 0;
let bCircle = 150;
let idkPlaceHolder = false;

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
    background('white');
    fill('black');
    textSize(85);
    textFont('alrightArial');
    text('Hello!', width/2, 90);
    textSize(16);
    textFont('alrightArialAgain');
    text('How may I assist you?', width/2, 180);
    cSize = Math.min(300, 150 + mic.getLevel() * 1000)
    
    mic.start();
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
    alrightComputerTimeout = setTimeout(() => {
      alrightComputer = false;
    }, 20000); // set a 20 second delay
    
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
      
      link(width - 100, height - 50, 50, 50, 'https://www.project.alrightcomputer.com');

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

    if (bCircle === windowWidth + 100.5 && idkPlaceHolder){
    var video = document.createElement('video');
    video.src = 'https://rr1---sn-vgqskned.c.drive.google.com/videoplayback?expire=1681172862&ei=PnE0ZOeMOOfEjATv8qXICw&ip=2603:6000:b4f0:9240:8913:ab2f:e71c:2f34&cp=QVRNU0JfUVhUQ1hPOnVXclViWkRNakY3dlhXVGZXV3NyUzNIOTNiLVBOUkYxeTBOUnJ0bXpXZ1g&id=1e128ad718c5d6f7&itag=37&source=webdrive&requiressl=yes&mh=HI&mm=32&mn=sn-vgqskned&ms=su&mv=m&mvi=1&pl=35&ttl=transient&susc=dr&driveid=1iVDltURki2F5ZHgEX2kxw9WCcZ-ie_oU&app=explorer&mime=video/mp4&vprv=1&prv=1&dur=86.378&lmt=1681157846003621&mt=1681158057&subapp=DRIVE_WEB_FILE_VIEWER&txp=0011224&sparams=expire,ei,ip,cp,id,itag,source,requiressl,ttl,susc,driveid,app,mime,vprv,prv,dur,lmt&sig=AOq0QJ8wRAIgGV582u5gg6LrNt425kHKx2mu9vSwSbUfpq2aQa7Ru5QCIHAaIaKtbAT0Og1RhyNrUAO3r9VW8V4f4R4E0hLeRw-y&lsparams=mh,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIhALyxc9Fnhh0Xzw9HyML0JWVYHTQJbqolZOL0eq0nDn2-AiArl3p3Jc_pTrMFYKz0dr7riLIRQ4ia_JXxvcL3wc2rEQ==&cpn=WdsQYppe66HDu0-z&c=WEB_EMBEDDED_PLAYER&cver=1.20230402.00.00';
    video.controls = false;
    video.style.position = 'fixed';
video.style.top = '0';
video.style.left = '0';
video.style.width = window.innerWidth + 'px';
video.style.height = window.innerHeight + 'px';
video.style.zIndex = '9999'
    document.body.appendChild(video);
    video.play();
    
    setTimeout(() => {
      alrightComputer = false;
    }, 20000);
  };
}
  
// function alrightReply(){
// //Eleven Labs voices
// }
