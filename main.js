var song = "";
var leftY = 0;
var leftX = 0;
var rightY = 0;
var rightX = 0;
var scoreleft = 0;
var scoreright = 0;

function preload(){

song = loadSound("Think.mp3");

}


function setup(){

canvas = createCanvas(600,500);
canvas.center();

video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);

}

function modelLoaded(){

console.log("wow such load");

}

function gotPoses(results){

if(results.length > 0){

console.log(results);
scoreright = results[0].pose.keypoints[10].score;
scoreleft = results[0].pose.keypoints[9].score;
console.log("left score is" + scoreleft);
console.log( "right score is" + scoreright);

leftY = results[0].pose.leftWrist.y;
leftX = results[0].pose.leftWrist.x;
rightY = results[0].pose.rightWrist.y;
rightX = results[0].pose.rightWrist.x;

console.log("left y = " + leftY  + " left x = " + leftX);
console.log(" right x = " + rightX + " right y = " + rightY)

}

}

function draw(){

image(video, 0, 0, 600, 500);

fill("#38a0e0");
stroke("#7af2ff");

if(scoreright > 0.2){

circle(rightX, rightY, 20);

if(rightY > 0 && rightY <= 100){

document.getElementById("speed").innerHTML = "Speed = 0.5x";
song.rate(0.5);

}
else if(rightY > 100 && rightY <= 200){

document.getElementById("speed").innerHTML = "Speed = 1x";
song.rate(1);

}
else if(rightY > 200 && rightY <= 300){

document.getElementById("speed").innerHTML = "Speed = 1.5x";
song.rate(1.5);

}
else if(rightY > 300 && rightY <= 400){

document.getElementById("speed").innerHTML = "Speed = 2x";
song.rate(2);

}
else if(rightY > 400 && rightY <= 500){

document.getElementById("speed").innerHTML = "Speed = 2.5x";
song.rate(2.5);

}

}




if(scoreleft > 0.2){
    circle(leftX, leftY, 20);
    inumberleftwrist = Number(leftY);
    decimaldeleted = floor(inumberleftwrist);
    volume = decimaldeleted/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
    }

}

function play(){

song.play();
song.setVolume(1);
song.rate(1);

}
