tofind = ""
status = ""
object = []

function preload()
{
}

function setup()
{
    canvas = createCanvas(480,380)
    canvas.position(470,170)
    video = createCapture(VIDEO)
    video.size(480,380)
    video.hide()
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status: Detecting objects"
tofind = document.getElementById("gucci").value
}

function modelLoaded()
{
    console.log("model is loaded deal with it")
    status = true;
}

function gotResult(error,results)
{
    if(error)
    {
        console.log(error)
    }
    else
    {
                console.log(results)
                object = results
    }
}

function draw()
{
    image(video,0,0,480,360)
    if(status == "true")
{
    objectDetector.detect(video, gotResult)
    for(i=0;i<object.length;i++)
    {
        document.getElementById("status").innerHTML = "Status: Finding your object"
        document.getElementById("number_of_objects").innerHTML = "There are "+object.length+ " objects"
        fill("#FF0000");
        var percent = floor(object[i].confidence * 100);
        text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
        noFill();
        stroke("#FF0000");
        rect(object[i].x, object[i].y, object[i].width, object[i].height);
        if(object[i].label == tofind)
        {
document.getElementById("status").innerHTML = "Status: Your object is found!"
video.stop()
        }
    }
}}