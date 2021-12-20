song1="";
song2="";
song1_status="";
song2_status="";
rightWristX=0;
rightWristY=0;
leftWristX=0;
leftWristY=0;
ScoreRightWrist=0;
ScoreLeftWrist=0;

function preload(){
  song1=loadSound("music.mp3");  
  song2=loadSound("music1.mp3");
}
                                                                   

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
  console.log('Model is Loaded!!');
}
function gotPoses(results){
if(results.length>0){
  console.log(results);

  ScoreRightWrist=results[0].pose.keypoints[10].score;
  ScoreLeftWrist=results[0].pose.keypoints[9].score;
  leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    console.log("leftWrist_X= "+leftWristX+"leftWrist_Y=  "+leftWristY);

    rightWristX=results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;
    console.log("rightWrist_X= "+rightWristX+"rightWrist_Y=  "+rightWristY);

}
}
function draw(){
    image(video,0,0,600,500);
    image(video,0,0,600,500);
    fill("#f7adec");
    stroke("#f7adec");
    if(ScoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        song2.stop(); 
        if(song1_status==false){
          song1.play();
          document.getElementById("song").innerHTML="playing-HARRYPOTTER";
        }      
}

if(ScoreRightWrist > 0.2){
  circle(rightWristX,rightWristY,20);
  song1.stop(); 
  if(song2_status==false){
    song2.play();
    document.getElementById("song").innerHTML="playing-Christmas-Theme song";
  }      
}
}
