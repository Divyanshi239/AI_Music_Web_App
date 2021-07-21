song1 = "";
song2 = "";
ScoreLeftWrist = "";
SongStatus = "";

leftWristX = "";
leftWristY = "";
rightWristX = "";
rightWristY = "";
function preload() {
    song1 = loadSound("Butter.mp3");
    song2 = loadSound("No Roots.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("Posenet Is Initialized!");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + "  Left Wrist Y = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristX + "  Right Wrist Y = " + rightWristY);

        ScoreLeftWrist = results[0].pose.keypoints[9].score;
    }
}

function draw() {
    image(video, 0, 0, 600, 500);

    SongStatus = song1.isPlaying();

    fill("red");
    stroke("orange");

    if (ScoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song2.stop();


        if (SongStatus = "false") {
            song1.play();
            document.getElementById("song_name").innerHTML = "Butter";
        }
    }
}