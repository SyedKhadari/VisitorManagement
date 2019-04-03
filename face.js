
const fr = require("face-recognition");
const fs = require("fs")
const exec = require("await-exec")
const detector = fr.FaceDetector()
const recognizer = fr.FaceRecognizer()
const Nodewebcam = require("node-webcam")
const path = require("path")

var opts = {
    callbackReturn:"location",
    quality: 1000,
    delay: 0
}


var model = fs.existsSync("./Trainedmodel/model.json")

if(model == false){
    console.log("Strats up no model found!!...creating a new one")

    var obama1 = fr.loadImage("./images/obama/obama1.jpg");
    var obama2 = fr.loadImage("./images/obama/obama2.jpg");


    var trump1 = fr.loadImage("./images/trump/trump1.jpg");
    var trump2 = fr.loadImage("./images/trump/trump2.jpg");

    var krishna1 = fr.loadImage("./images/krishna sir/krishna1.jpeg");
    //var krishna2 = fr.loadImage("./images/krishna sir/krishna2.jpg");

    //var naveen1 = fr.loadImage("./images/naveen/naveen1.jpg")

    var syed1 = fr.loadImage("./images/syed/syed3.jpg")

    var mani1 = fr.loadImage("./images/mani/mani3.jpg")

    console.log("detecting the faces in training images")

    var obamac1  = detector.detectFaces(obama1)[0]
    var obamac2  = detector.detectFaces(obama2)[0]


    var trumpc1 = detector.detectFaces(trump1)[0]
    var trumpc2 = detector.detectFaces(trump2)[0]

    var krishnac1 = detector.detectFaces(krishna1)[0]
    //var krishnac2 = detector.detectFaces(krishna2)[0]
 

    //var naveenc1 = detector.detectFaces(naveen1)[0]

    var syedc1 =detector.detectFaces(syed1)[0]  
     
    var manic1 =detector.detectFaces(mani1)[0]




    var obamafaces = [obamac1,obamac2]
    var trumpfaces = [trumpc1,trumpc2]
    var krishnafaces = [krishnac1]
    //var naveenfaces = [naveenc1]
    var syedfaces = [syedc1]
    var manifaces = [manic1]


    console.log("training the recognition model with the images")
    recognizer.addFaces(obamafaces,"obama",15);
    recognizer.addFaces(trumpfaces,"trump",15);
    recognizer.addFaces(krishnafaces,"krishna",15);
    //recognizer.addFaces(naveenfaces,"naveen",15);
    recognizer.addFaces(syedfaces,"syed",15);
    recognizer.addFaces(manifaces,"mani",15);

    const modelstate = recognizer.serialize()

    fs.writeFileSync("./Trainedmodel/model.json",JSON.stringify(modelstate))

}else{
    console.log("startup model found!!!!!!")
    const modestate = recognizer.load(require("./Trainedmodel/model.json"))
}


//detecting the faces 
module.exports = function(imag_pth){

    console.log("in")
    var temp = fr.loadImage(imag_pth);
    const croped_face = detector.detectFaces(temp)

    console.log("cropped")
    if(croped_face.length < 1){
        console.log("no faces found...");
        return "no faces"
       
    }

    let face_recognised = recognizer.predictBest(croped_face[0])
    return face_recognised
}

//detect_face_in_image("./images/naveen/naveen1.jpg")
//console.log(path.resolve("./images/naveen/naveen1.jpg"))

/** 
Nodewebcam.capture("test_picture",opts,async function(err,data){

    console.log("image_taken");
    detect_face_in_image("./test_picture.jpg")

})
*/


//module.exports = detect_face_in_image;
