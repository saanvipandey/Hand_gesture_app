prediction_1 = ""

Webcam.set(
    {
        width:350,
        height:300,
        image_format:'png',
        png_quality:90
    }
);
camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot()
{
        Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
    console.log('ml5_version:', ml5.version);
    classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/P5lOCT9o-/model.json',modelLoaded);

    function modelLoaded()
    {
        console.log('Model Loaded !');
    }
}


function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img , gotResult);
}


function speak()
{
    var synth = window.speechsynthesis;
    var utterThis = new SpeechSynthesisUtterance(prediction_1);
    utterThis.rate = 0.8;
    synth.speak(utterThis);
}



function gotResult(error , results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        speak();
        if(results[0].label == "Keep it Up")
        {
            document.getElementById("update_emoji").innerHTML = "&#128077;" ;
        }
        if(results[0].label == "Fist")
        {
            document.getElementById("update_emoji").innerHTML = "&#128071;";
        } 
        if(results[0].label == "Gun")
        {
            document.getElementById("update_emoji").innerHTML = "&#128079;";
        }
        if(results[0].label = "Bad")
        {
            document.getElementById("update_emoji").innerHTML = "&#9995;";
        }
        if(results[0].label = "Rock")
        {
            document.getElementById("update_emoji").innerHTML  = "&#129304;";
        }
    }
}