class Point { 
    constructor(x=0, y=0){
        this.x = x;
        this.y = y;
    }
}

class Grid {

    constructor(width, height){
        this.width = width;
        this.height = height;
        this.points = [];

        for(let x = 0; x < width; x++){
            this.points[x] = []
            for(let y = 0; y < height; y++){
               this.points[x][y] = false;
            }
        }
    }

    set(x, y){
        this.points[x][y] = true;
    }

    unset(x, y){
        this.points[x][y] = false;
    }

}

const canvas = document.getElementById("view");
const g = canvas.getContext("2d");

canvas.width = 1920;
canvas.height = 1080;

let paused = true;

canvas.addEventListener("click",function(e){
    let x = e.clientX - canvas.offsetLeft;
    let y = e.clientY - canvas.offsetTop;

    let deltaX = x / canvas.offsetWidth;
    let deltaY = y / canvas.offsetHeight;
    
    x = Math.round(deltaX * grid.width);
    y = Math.round(deltaY * grid.height);

    grid.points[x][y] = true;
});

window.addEventListener("keypress",function(e){
    if(e.key == "p"){
        paused = !paused;
    }
    if(e.key == "o"){
        clearGrid(buffer);
        clearGrid(grid);
    }
    if(e.keyCode == 32){
        console.log(333)
        growAll();
    }
});

let gridWidth = 128;

const grid = new Grid(canvas.width/32,canvas.height/32);
const buffer = new Grid(canvas.width/32,canvas.height/32);

grid.points[14][14] = true;
grid.points[15][14] = true;
grid.points[16][14] = true;

window.focus();

function clear(){
    g.fillStyle = "rgb(255,255,255)";
    g.fillRect(0,0,canvas.width, canvas.height);
}

function tick(){
    if(paused){return;}
    growAll();
}

function growAll(){
    moveToBuffer();
    for(let y = 0; y < grid.height; y++){
        for(let x = 0; x < grid.width; x++){
            grow(x,y);
        }
    }
    moveToGrid();
}

function moveToBuffer(){
    for(let y = 0; y < grid.height; y++){
        for(let x = 0; x < grid.width; x++){
            buffer.points[x][y] = grid.points[x][y];
        }
    }
}

function moveToGrid(){
    for(let y = 0; y < grid.height; y++){
        for(let x = 0; x < grid.width; x++){
            grid.points[x][y] = buffer.points[x][y];
        }
    }
}

function clearGrid(grid){
    for(let y = 0; y < grid.height; y++){
        for(let x = 0; x < grid.width; x++){
            grid.points[x][y] = false;
        }
    }
}

function grow(x,y) {
    let count = 0;
    try{
        if(grid.points[x+1][y]){count++;}    
        if(grid.points[x+1][y+1]){count++;}    
        if(grid.points[x][y+1]){count++;}    
        if(grid.points[x-1][y+1]){count++;}    
        if(grid.points[x-1][y]){count++;}    
        if(grid.points[x-1][y-1]){count++;}    
        if(grid.points[x][y-1]){count++;}    
        if(grid.points[x+1][y+1]){count++;}    
    }catch(e){}
    if(count < 2 || count > 3){
        buffer.points[x][y] = false;
    }else if(count == 3){
        buffer.points[x][y] = true;
    }

}

function render(){
    clear();
    g.fillStyle = "rgb(255,0,0)";
    for(let y = 0; y < grid.height; y++){
        for(let x = 0; x < grid.width; x++){
            if(grid.points[x][y] == true){
                g.fillRect(x*32,y*32,32,32);
            }
        }
    }
}

setInterval(function(){
    tick();
    render();
}, (1000/60));

clear();


