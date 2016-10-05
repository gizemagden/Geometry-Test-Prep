$(document).ready(function () {

var JFquestionText = "", JFshapeType = "";
var JFproperties= "" ;
var JFchoices = "";
var JFtimer;
var height, edge1, edge2, radius;
var choice1, choice2, choice3, answer="" ;
var canvas = document.getElementById('myCanvas');
var draw = canvas.getContext('2d');

JFCustomWidget.subscribe("ready", function () {

    JFquestionText = JFCustomWidget.getWidgetSetting('soruMetni');
    JFshapeType = JFCustomWidget.getWidgetSetting('sekilTuru');
    JFproperties = (JFCustomWidget.getWidgetSetting('ozellikler')).split("\n");
    JFchoices = (JFCustomWidget.getWidgetSetting('secenekler')).split("\n");
    JFtimer = parseInt(JFCustomWidget.getWidgetSetting('sayac'));

    drawCanvas(JFshapeType);
});

    $("#myText").click(function () {
        $("#panel").slideDown("slow");
        startTimer();
    });

    function drawCanvas(shapeType) {
        document.getElementById("myText").innerHTML = JFquestionText;//soru metni yazdırma
        egde1 = parseInt(JFproperties[0])*10;
        egde2 = parseInt(JFproperties[1])*10;
        height = parseInt(JFproperties[2])*10;
        radius = parseInt(JFproperties[3])*10;
            switch (shapeType) {
                case "right triangle":

                    draw.beginPath();
                    draw.moveTo(100, 50);
                    draw.lineTo(100, 50 + height);
                    draw.lineTo(100 + egde1, 50 + height);
                    draw.closePath();
                    draw.lineWidth = 1;
                    draw.strokeStyle = '#666666';
                    draw.stroke();
                    draw.fillStyle = "#e50959";//color
                    draw.fill();
                    draw.beginPath();        //height line
                    draw.moveTo(95, 50);
                    draw.lineTo(95, 50 + height);
                    draw.lineWidth = 1;
                    draw.closePath();
                    draw.stroke();
                    draw.font = "10px Times New Roman";
                    draw.fillText(height/10, 80, 50 + (50 + height) / 2);

                    draw.beginPath();        //base line
                    draw.moveTo(100, 55 + height);
                    draw.lineTo(100 +egde1, 55 + height);
                    draw.lineWidth = 1;
                    draw.closePath();
                    draw.stroke();
                    draw.font = "10px Times New Roman";
                    draw.fillText(egde1/10, 100 + (egde1 / 2), 65 + height);
                    break;

                case "rectangle":
                 
                    draw.fillStyle = "#8ed108"; //color
                    draw.rect(100, 50, egde1, egde2);
                    draw.stroke();
                    draw.fill();

                    draw.beginPath();        //vertical edge
                    draw.moveTo(95, 50);
                    draw.lineTo(95, 50 + egde2);
                    draw.lineWidth = 1;
                    draw.closePath();
                    draw.stroke();
                    draw.font = "10px Times New Roman";
                    draw.fillText(egde1/10, 80, 50 + (egde1 / 2));

                    draw.beginPath();        //horizontal edge
                    draw.moveTo(100, 55 + egde2);
                    draw.lineTo(100 + egde1, 55 + egde2);
                    draw.lineWidth = 1;
                    draw.closePath();
                    draw.stroke();
                    draw.font = "10px Times New Roman";
                    draw.fillText(egde2/10, 100 + (egde1 / 2), 65 + egde2);
                    break;

                case "square":
                    
                    draw.fillStyle = "#be29ec"; //color
                    draw.fillRect(100, 50, egde1, egde1);
                    draw.lineWidth = 3;
                    draw.strokeStyle = '#666666';
                    draw.stroke();

                    draw.beginPath();        //vertical edge
                    draw.moveTo(95, 50);
                    draw.lineTo(95, 50 + egde1);
                    draw.lineWidth = 1;
                    draw.closePath();
                    draw.stroke();
                    draw.font = "10px Times New Roman";
                    draw.fillText(egde1 / 10, 80, 50 + (egde1 / 2));

                    draw.beginPath();        //horizontal edge
                    draw.moveTo(100, 55 + egde1);
                    draw.lineTo(100 + egde1, 55 + egde1);
                    draw.lineWidth = 1;
                    draw.closePath();
                    draw.stroke();
                    draw.font = "10px Times New Roman";
                    draw.fillText(egde1 / 10, 100 + (egde1 / 2), 65 + egde1);
                    break;

                case "rhomboid": // it must be edge2>height because of pythagoras' theorem 

                    var x = Math.pow(egde2, 2) - Math.pow(height, 2);
                    var y = Math.sqrt(x);
                    draw.beginPath();
                    draw.moveTo(100, 50); //top left
                    draw.lineTo(100 + egde1, 50);//top right
                    draw.lineTo(100 + y + egde1, 50 + height);//bottom right
                    draw.lineTo(100 + y, 50 + height);//bottom left
                    draw.closePath();
                    draw.lineWidth = 3;
                    draw.strokeStyle = '#666666';
                    draw.stroke();
                    draw.fillStyle = "#1ba1e2";//color
                    draw.fill();

                    draw.beginPath();        //horizontal edge
                    draw.moveTo(100 + y, 55 + height);
                    draw.lineTo(103 + y + egde1, 55 + height);
                    draw.lineWidth = 1;
                    draw.closePath();
                    draw.stroke();
                    draw.font = "10px Times New Roman";
                    draw.fillText(egde1 / 10, 100 + y + (egde1 / 2), 65 + height);

                    draw.beginPath();        //vertical edge
                    draw.moveTo(92, 50);
                    draw.lineTo(95+y, 53 + height);
                    draw.lineWidth = 1;
                    draw.closePath();
                    draw.stroke();
                    draw.font = "10px Times New Roman";
                    draw.fillText(egde2 / 10, 80 + (y / 2), 50 + (height / 2));

                    draw.beginPath();        //height
                    draw.moveTo(90 , 50 );
                    draw.lineTo(90, 50 + height);
                    draw.lineWidth = 1;
                    draw.closePath();
                    draw.stroke();
                    draw.font = "10px Times New Roman";
                    draw.fillText(height / 10, 90, 50 + (height/2));
                    break;

                case "rhomb":

                    var x = Math.pow(egde1, 2) - Math.pow(height, 2);
                    var y = Math.sqrt(x);
                    draw.beginPath();
                    draw.moveTo(100, 50);
                    draw.lineTo(100 + y, 50 + height);
                    draw.lineTo(100 + y + egde1, 50 + height);
                    draw.lineTo(100 + egde1, 50);
                    draw.closePath();
                    draw.lineWidth = 3;
                    draw.strokeStyle = '#666666';
                    draw.stroke();
                    draw.fillStyle = "#00b159";//color
                    draw.fill();

                    draw.beginPath();        //horizontal edge
                    draw.moveTo(100 + y, 55 + height);
                    draw.lineTo(103 + y + egde1, 55 + height);
                    draw.lineWidth = 1;
                    draw.closePath();
                    draw.stroke();
                    draw.font = "10px Times New Roman";
                    draw.fillText(egde1 / 10, 100 + y + (egde1 / 2), 65 + height);

                    draw.beginPath();        //vertical edge
                    draw.moveTo(92, 50);
                    draw.lineTo(95 + y, 53 + height);
                    draw.lineWidth = 1;
                    draw.closePath();
                    draw.stroke();
                    draw.font = "10px Times New Roman";
                    draw.fillText(egde1 / 10, 80 + (y / 2), 50 + (height / 2));
                    break;

                case "trapezoid":
                    draw.beginPath();
                    draw.moveTo(100, 50);
                    draw.lineTo(70, 50+height);
                    draw.lineTo(70+egde2, 50+height);
                    draw.lineTo(100+egde1, 50);
                    draw.closePath();
                    draw.lineWidth = 3;
                    draw.strokeStyle = '#666666';
                    draw.stroke();
                    draw.fillStyle = "#f37735";//color
                    draw.fill();
                    break;

                case "circle":
                    
                    var centerX = canvas.width / 2;
                    var centerY = canvas.height / 2;
                    
                    draw.beginPath();
                    draw.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                    draw.fillStyle = '#6767bc'
                    draw.fill();
                    draw.lineWidth = 3;
                    draw.strokeStyle = '#003300';
                    draw.stroke();
                    break;

                case "ellipse":
                    draw.beginPath();
                    var centerX = canvas.width / 2;
                    var centerY = canvas.height / 2;
                    var width = egde1;
                    
                    draw.moveTo(centerX, centerY - height / 2); // A1

                    draw.bezierCurveTo(
                      centerX + width / 2, centerY - height / 2, // C1
                      centerX + width / 2, centerY + height / 2, // C2
                      centerX, centerY + height / 2); // A2

                    draw.bezierCurveTo(
                      centerX - width / 2, centerY + height / 2, // C3
                      centerX - width / 2, centerY - height / 2, // C4
                      centerX, centerY - height / 2); // A1

                    draw.fillStyle = "#e69598";
                    draw.fill();
                    draw.closePath();
                    break;
        }
            setChoices();
    }
    function startTimer() {
            setInterval(function () {

                document.getElementById("timer").innerHTML = JFtimer;
                if (JFtimer == 0) {
                    answer = $('input[name="myRadio"]:checked', '#myForm').val();
                }
                if (JFtimer <= 0) {
                    clearInterval(JFtimer);
                    document.getElementById("timer").innerHTML = "Time is up!";
                    $("#panel").slideUp();
                    $("#panel").remove();
                }
                JFtimer--;
                
            }, 1000);
    }
    function setChoices() {
           choice1 = parseInt(JFchoices[0]);
           choice2 = parseInt(JFchoices[1]);
           choice3 = parseInt(JFchoices[2]);
           $("#Radio1").after(choice1);
           $("#Radio2").after(choice2);
           $("#Radio3").after(choice3);
    }
    
     JFCustomWidget.subscribe("submit", function () {
       var mail = {value:"", valid: true};

       mail.value= "Option " +answer+ " was selected.";

       JFCustomWidget.sendSubmit(mail);
    });
    
});