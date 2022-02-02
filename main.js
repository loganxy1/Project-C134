status = "";
objectList = [];

function preload(){
    
}

function setup(){
    canvas = createCanvas(400, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(400, 400);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status Detecting Object";
}

function modelLoaded(){
    console.log("Model loaded");
    status = true;
    objectDetector.detect(video, gotResults);
}

function draw(){
    image(video, 0, 0, 640, 420);
    if(status!=""){
    objectDetector.detect(video, gotResults);
    r = floor(random(255));
    g = floor(random(255));
    b = floor(random(255));
        for(var i=0;i<objectList.length;i++){
            stroke(r,g,b);
            noFill();
            rect(objectList[i].x, objectList[i].y, objectList[i].width, objectList[i].height);
            fill("black");
            stroke("black");
            textSize(20);
            percent = Math.floor(objectList[i].confidence * 100);
            text(objectList[i].label +"  "+ percent+"%", objectList[i].x + 18, objectList[i].y + 18);
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("objectsNum").innerHTML = objectList.length+" object/s detected";
        }
    }
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objectList = results;
    }
}