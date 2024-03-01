//Jamie and Ry
let facemesh;
let video;
let predictions = [];
let img;
let img1;

function preload() {
  img = loadImage('/static/Unknown.png');
  img1 = loadImage('/static/air.png');
}
function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  facemesh = ml5.facemesh(video, modelReady);

  facemesh.on("predict", results => {
    predictions = results;
  });
  video.hide();

}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  image(video, 0, 0, width, height);

  drawKeypoints();
  printAnnotations();
}
function printAnnotations(){
  if (predictions.length > 0) {
    console.log(Object.keys(predictions[0].annotations))

    const midEyes = predictions[0].annotations.midwayBetweenEyes[0];
    console.log(midEyes)
    let x= predictions[0].annotations.midwayBetweenEyes[0][0];
    let y= predictions[0].annotations.midwayBetweenEyes[0][0];

    fill(100,0,250);




  }
}

function drawKeypoints() {
  //Thanks to the web for helping!
  for (let i = 0; i < predictions.length; i += 1) {
    const keypoints = predictions[i].scaledMesh;
    // Draw facial keypoints.
    const [betweenEyesX, betweenEyesY] = keypoints[168];

    image(img,betweenEyesX-100, betweenEyesY-190,200,150);
    image(img1,betweenEyesX-100, betweenEyesY-70,200,110);
//     for (let j = 0; j < keypoints.length; j += 1) {
//       const [x, y] = keypoints[j];
//       fill(0, 255, 0);
//       // ellipse(x, y, 5, 5);


    }

}
