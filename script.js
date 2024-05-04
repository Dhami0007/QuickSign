const colorPicker = document.getElementById("colorPicker");
const canvasColor = document.getElementById("canvasColor");
const canvas = document.getElementById("myCanvas");
const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton")
const retrieveButton = document.getElementById("retrieveButton");
const fontSize = document.getElementById("fontSize");
const ctx = canvas.getContext("2d");
ctx.lineWidth = 5;
let isDrawing = false;

colorPicker.addEventListener('change',(e)=>{
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
    console.log(e.target.value)
})

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
    console.log(isDrawing);
    console.log("lastX: ",lastX);
    console.log("lastY: ",lastY);
  });
  
canvas.addEventListener('mousemove', (e) => {
    console.log("position", e.offsetX,e.offsetY)
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        lastX = e.offsetX;
        lastY = e.offsetY;
        ctx.stroke();
}});

canvas.addEventListener('mouseup',()=>{
isDrawing = false;
})

clearButton.addEventListener('click',()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

canvasColor.addEventListener('change',(e)=>{
    canvas.style.backgroundColor = e.target.value;
});

fontSize.addEventListener('change',(e)=>{
    ctx.lineWidth = e.target.value;
});

saveButton.addEventListener('click',()=>{
    const dataUrl = canvas.toDataURL("image/png");
    localStorage.setItem("savedSignature",dataUrl);

    let link = document.createElement("a");
    link.download = "signature.png";
    link.href = dataUrl;
    link.click();
});

retrieveButton.addEventListener('click',()=>{
    const dataUrl = localStorage.getItem("savedSignature");

    if (dataUrl){
        const img = new Image();
        img.src = dataUrl;
        img.onload = ()=>{
            ctx.drawImage(img,0,0);
        }};
    
});
