//will activate the animation loop and the date when the page loads.
window.addEventListener("load", () => {
    //defines the canvas which is used and the context which is the rendered style. 
var canvas = document.getElementById('canvas2');
var ctx = canvas.getContext('2d');
ctx.strokeStyle = '#641E16';

//created the line thickness and the style of the lines within the page. 
ctx.lineWidth = 12;
    //type of line which will be displayed. 
ctx.lineCap = 'round';

    //creates the rounded the circle within the clock and the one which will be animated is created so that the animation will take place within the page.
function round(degrees) {
  var num = Math.PI/180;
  return degrees*num;
}
//render time to control the animation rounf the clock. Generates the time so that the animation could be carried out when it would be required. 
function GenTime() {
  //defines the new date to be the current date. 
  var now = new Date();
    
    //gets the current date and loads it to the variable today so that the date can then be displayed on the page. 
  var today = now.toDateString();
  var h = now.getHours();
  var m = now.getMinutes();
  var sec = now.getSeconds();
  var millisec = now.getMilliseconds();
  var newSeconds = sec+ (millisec/1000);
  
  // Background colour for the canvas. Keep it to white so that it is not visible within the page. 
  backgroundcolor = ctx.createRadialGradient(10,100,5,200,200,300);
  backgroundcolor.addColorStop(0,'white');
  backgroundcolor.addColorStop(1, 'white');
  ctx.fillStyle = backgroundcolor;
  ctx.fillRect(0,0,400,400);
  
  //Defines the hours within the time so that the animation could be henerated effectively. Definesthe length of the rounded shape within the clock/date. 
  ctx.beginPath();
  ctx.arc(200, 200, 170, round(140), round((h*30)-90));
  ctx.stroke();
  
  //Defines the Minutes of the clock which would mean that the minutes will change within the animation.
    //begin path for the drawing 
   ctx.beginPath();
    //defines the length of the linerounded
  ctx.arc(200, 200, 140, round(100), round((m*3)-90));
  ctx.stroke();
  //Defines the seconds within the animation and the time which may be shown on the digital animated clock.
    //begin the path for the line
   ctx.beginPath();
    //starting point for the animation within the date display.
  ctx.arc(200, 200, 110, round(120), round((newSeconds*8)-90));
  ctx.stroke();
  //sets the the text and the font and fill style for the date within the page. Allows them to be able to tell the date within the 
  ctx.font = "16px Lobster";
  ctx.fillStyle = '#641E16';
  ctx.fillText(today, 120, 180);
  
}
    
//setInterval used to generate the animation using the function GenTime which generates this. The milliseconds length of time that it takes place is set to 200 so it occurs at a steady rate.
setInterval(GenTime, 200);
});