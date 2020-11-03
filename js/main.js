
//will activate once the window loads.
window.addEventListener("load", () => {
    //defines the canvas to use and the rendering context for it.
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    //radius of the circle.
    var radius = 10; 
    var dragging = false;
    //ensures that the canvas width and height is the same as the window size and height.
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //when the windwo is resized the image will remain and the width and height will remain the same so any drawing that has been done will not be removed.
    window.onresize = function(){
        var image = ctx.getImageData(0,0,canvas.width,canvas.height);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.putImageData(image, 0,0);
    }
    //defines the width of the line. Its multiplies the radius by 2 to define the thickness of the line.
    ctx.lineWidth = radius*2;
    
    //programming to control the drawing for the page
    var draw = function(e){
    //condtional statement that will activate to draw on the page.
        if(dragging){
        //ensures that the line is at the position of the mouse within the canvas 
        ctx.lineTo(e.clientX, e.clientY);
        //tells the context to use the stroke property.
        ctx.stroke();
        //begin the drawing.
        ctx.beginPath();
        //defines the round appearance of the drawing when it has been activated on the page.
        ctx.arc(e.clientX, e.clientY, radius, 0, Math.PI*2);
        //uses the fill property to ensure that the drawing is a solid colour.
        ctx.fill();
        ctx.beginPath();
        //moves to the position of the mouse as the user draws on the page
        ctx.moveTo(e.clientX, e.clientY);
        }
    }
    //will activate the draw function as long as the mouse is being dragged.
    var activate = function(e){
        dragging = true;
        draw(e);
    }
    //when the mouse stops dragging will close the drawing.
    var deactivate = function(){
        dragging = false;
        ctx.beginPath();
    }
    //event listner to activate the drawing when the mouse is clicked.
    canvas.addEventListener('mousedown', activate);
    //event listener to draw when the mouse is moving while it is clicked.
    canvas.addEventListener('mousemove', draw);
    //event listener to stop drawing when the user has taken their figure off the mouse.
    canvas.addEventListener('mouseup', deactivate);
    
    
    //Functions which will work to activate the line and the appearance of the original line when it appears on the page.
    var setLine = function(newLine){
        if(newLine<minline)
            newLine = minline;
        else if(newLine>maxline)
            newLine = maxline;
        radius = newLine;
        ctx.lineWidth = radius*2;
        
        linespan.innerHTML = radius;
    }
    
//line thickness is controlled using these controls  
    var minline = 1,
        maxline = 100,
        defaultline = 10,
        interval = 2,
        linespan = document.getElementById('linecontrols'),
        decrease = document.getElementById('decrease'),
        increase = document.getElementById('increase');
    
    decrease.addEventListener('click',function(){
        setLine(radius-interval);
    });
     increase.addEventListener('click',function(){
        setLine(radius+interval);
    });
    
setLine(defaultline)
 
//Colour Swatch which will allow the user to select the color that they want to select to use within the drawing application.


//array cotaining the colors which will for the options available to select.RGBA color codes are used to identify which color to include.      
var colors = ['black', /*sky blue*/'rgba(135,206,235,1)',/*lime*/'rgba(0,255,0,1)', /*maroon*/'rgba(128,0,0,1)', /*dark orange*/'rgba(255,140,0,1)', /*gold*/'rgba(255,215,0,1)', /*silver*/'rgba(192,192,192,1)', /*Hot Pink*/'rgba(255,105,180)', 'purple', /*turquoise*/'rgba(64,224,208,1)', /*magenta*/'rgba(255,0,255,1)',/*navy*/'rgba(0,0,128,1)',/*Teal*/'rgba(0,128,128,1)',/*Crimson*/'rgba(220,20,60,1)',/*Steel Blue*/'rgba(70,130,180,1)',/*Salmon*/'rgba(250,128,114,1)',/*Deep Pink*/'rgba(255,20,147,1)',/*Aqua*/'rgba(0,255,255,1)',/*Orange*/'rgba(211, 84, 0, 1)',/*Dark Green*/'rgba(20, 90, 50)',/*white*/'rgba(255,255,255,1)'];
     
//for loop which will interate the length of the array colors so that it can select the correct colour for the user from the option they have selected and change the colour which they have selected to be this colour before they draw on the application. This will also assign the class swatch to the chosen color which will that the colours are added to the swatch on the application.
for(var i=0, n=colors.length;i<n;i++){
    var swatch = document.createElement('div');
    swatch.className = 'swatch';
    swatch.style.backgroundColor = colors[i];
    //event listener that when it is clciked activates the setSwitch function
    swatch.addEventListener('click', setSwatch);
    //selects the colors id from the html and adds the colors to the child of the element
    document.getElementById('colors').appendChild(swatch);
}
    
//set color function to select the desired colour.
function setColor(color){
//selects the style for the fill and the stroke to be drawn on the application and assigns the color parameter to this
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    //creates and selects the active class from the css
    var active = document.getElementsByClassName('active')[0];
    //checks if the element is active and if so the class name changes to swatch when another color is selected
    if(active){
        active.className = 'swatch';
    }
}
    
//function to decide which swatch to select
function setSwatch(e){
    //identify the swatch which is selected
    var swatch = e.target;
    //set the color which has been selected 
    setColor(swatch.style.backgroundColor);
    //give active class to the swatch element
    swatch.className += ' active';
}
    
//set active swatch when the page loads.
    
setSwatch({target: document.getElementsByClassName('swatch')[0]});
    
//varaiable which will look for the element with the id clear. This will allow the user to be able to remove the drawing from the canvas.
var clearCanvas = document.getElementById('clear');

//adds event listener which will activate an erase function when the button is clicked
clearCanvas.addEventListener("click", eraseCanvas, false);

//erase function which will mean that the content within the canvas will be removed when the button has been clicked.
function eraseCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
});