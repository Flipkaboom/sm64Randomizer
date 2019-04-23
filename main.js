var levelWidth = 250;
var levelHeight = 250;
var selected = -1;

class Level{
		constructor(nm,img,mndstr,optstr){
			this.name = nm;
			this.image = img;
			this.mandatoryStars = mndstr;
			this.optionalStars = optstr;
			this.count = 0;
			this.destination = -1;
			this.parent = -1;
			this.marked = false;
			this.drawn = false;
			this.x = 10;
			this.y = 10;
			this.x2 = -1;
			this.y2 = -1;
		}
		draw(){
			image(this.image,this.x,this.y,levelWidth,levelHeight);
			this.drawn = true;
			noStroke();
			if(this.marked){
				fill(255,0,0,150);
				rect(this.x,this.y,250,250);
				stroke("red");
				strokeWeight(30);
				line(this.x+20,this.y+20,this.x+230,this.y+230);
				line(this.x+230,this.y+20,this.x+20,this.y+230);
			}
			fill("white");
			textSize(50);
			stroke("black");
			strokeWeight(5);
			text(this.name, this.x + 10,this.y + 230);
		}

	}
class Star{
	constructor(nm,amnt){
		this.name = nm;
		this.amount = amnt;
	}
}


function setup() {
	canvas = createCanvas(windowWidth, 6500);
	angleMode(DEGREES);
	frameRate(10);

	for(var images = [], i = 0; i < 26; i++){
		images.push(loadImage("images/" + i + ".png"));
	}

	data = [
	      new Level("BOB", images[0], [new Star("Box", 1), new Star("Open", 1), new Star("King", 1)], [new Star("Secrets", 1)]),
	      new Level("WF", images[1], [new Star("All", 6)], [new Star("Reds", 1)]),
	      new Level("JRB", images[2], [new Star("Ship", 1), new Star("Box", 1), new Star("Chest", 1), new Star("Open", 1)], [new Star("Eel", 1)]),
	      new Level("CCM", images[3], [new Star("Slide", 1), new Star("Open", 1), new Star("Penguin", 1)], [new Star("Race", 1)]),
	      new Level("BBH", images[4], [new Star("Open or Boo or Eye", 1)], [new Star("The other two", 2)]),
	      new Level("HMC", images[5], [new Star("Open", 5)], []),
	      new Level("LLL", images[6], [new Star("Open", 1), new Star("Bully", 1), new Star("Volcano", 2)], [new Star("Reds", 1)]),
	      new Level("SSL", images[7], [new Star("Open", 1), new Star("Pyramid", 1), new Star("Bird", 1)], [new Star("Secrets", 1), new Star("Eyerock", 1)]),
	      new Level("DDD", images[8], [new Star("Open", 2), new Star("Chests", 1), new Star("Manta", 1)], [new Star("Rings", 1)]),
	      new Level("SL", images[9], [new Star("Open", 2), new Star("Box", 1), new Star("Igloo", 1), new Star("Bully", 1)], []),
	      new Level("WDW", images[10], [new Star("100", 1), new Star("Secrets", 1), new Star("Open", 1), new Star("Box", 2)], [new Star("City", 1)]),
	      new Level("TTM", images[11], [new Star("Open", 4)], [new Star("Monkey", 1)]),
	      new Level("THI", images[12], [new Star("Secrets", 1), new Star("Box", 1)], [new Star("Reds", 1)]),
	      new Level("TTC", images[13], [new Star("Open", 5)], []),
	      new Level("RR", images[14], [new Star("Open", 4)], [new Star("Box", 1)]),
	      new Level("Slide", images[15], [new Star("Box", 1), new Star("Race", 1)], []),
	      new Level("Aqua", images[16], [new Star("Reds", 1)], []),
	      new Level("Wing", images[17], [new Star("Reds", 1)], []),
	      new Level("Metal", images[18], [], [new Star("Reds", 1)]),
	      new Level("BitDW", images[19], [], [new Star("Reds", 1)]),
	      new Level("Cloud", images[20], [], []),
	      new Level("Vanish", images[21], [], []),
	      new Level("BitFS", images[22], [], []),
	      //new Level("BitS", images[23], [], []),
				//new Level("Toad", images[24], [new Star("Bottom", 1), new Star("Top", 2)], []),
	      //new Level("Mips", images[25], [new Star("Bottom", 2)], []),
	    ];
}

function windowResized() {
  resizeCanvas(windowWidth, 6500);
}

function draw() {
	for(var i = 0; i < data.length; i++){
		data[i].drawn = false;
		data[i].x2 = -1;
		data[i].y2 = -1;
	}
	noStroke();
	fill("white");
	rect(0,0,windowWidth,6500)
	drawLevels()
	if(selected != -1){
		noStroke();
		fill(0,0,0,150);
		rect(data[selected].x,data[selected].y,250,250);
		if((data[selected].x != data[selected].x2 || data[selected].y != data[selected].y2) && (data[selected].x2 != -1 && data[selected].y2 != -1)){
			rect(data[selected].x2,data[selected].y2,250,250);
		}
	}
	fill("black");
	//console.log(data[4].y + " " + data[4].y2);
	//console.log(data[4].x + " " + data[4].x2);
	//rect(data[4].x,data[4].y,250,250);
	//rect(data[4].x2,data[4].y2,250,250);
}

function drawLevels(){
	var offsetX = 0;
	var offsetY = 0;
	var direction = 1;
	var arrowDirection = "first";

	for(var i = 0; i < data.length; i++){
		if(data[i].drawn == false){
			if(data[i].destination != -1){
				for(var b = i; b != -1; b = data[b].destination){

					var c = b;
					var d = b;
					while(data[d].parent != -1 && arrowDirection == "first"){

						d = data[d].parent;

						if(b < d){
							b = d;
						}
						if(c == d){
							break;
						}
						if(data[d].parent == -1){
							b = d;
							break;
						}
					}

					data[b].x = 10;
					data[b].y = 10;

					if(data[b].x + 250 + offsetX > windowWidth || data[b].x + offsetX < 0){
						offsetY += 300;
						direction = -1;
						if(data[b].x + offsetX < 0){
							direction = 1;
							}
						offsetX += 300 * direction;
						arrowDirection = "down";
						}

						data[b].x = 10 + offsetX;
						data[b].y = 10 + offsetY

						if(data[b].x2 == -1){
							data[b].x2 = data[b].x;
							data[b].y2 = data[b].y;
						}

						offsetX += 300 * direction;

						if(arrowDirection != "down" && arrowDirection != "first"){
							if(direction == 1){
								arrowDirection = "right";
							}else{
								arrowDirection = "left";
							}
						}

						if(data[b].drawn == true){
							data[b].draw();
							levelArrow(arrowDirection,data[b].x,data[b].y);
							break;
						}

						data[b].draw();
						levelArrow(arrowDirection,data[b].x,data[b].y);
						if(arrowDirection == "first" || arrowDirection == "down"){
							arrowDirection = "right";
						}
					}
					offsetX = 0;
					offsetY += 350;
					direction = 1;
					arrowDirection = "first";
				}
			}
		}

		for(var i = 0; i < data.length; i++){
			if(data[i].drawn == false){
				data[i].x = 10;
				data[i].y = 10;

				if(data[i].x + 250 + offsetX > windowWidth || data[i].x + offsetX < 0){
					offsetY += 300;
					offsetX = 0;
				}

				data[i].x = 10 + offsetX;
				data[i].y = 10 + offsetY

				offsetX += 300

				data[i].draw();
			}
		}
}
function levelArrow(dir,levelX,levelY){
	if(dir == "right"){
		drawArrow(levelX - 50,levelY + 125,levelX, levelY +125);
	}else if (dir == "left") {
		drawArrow(levelX +300,levelY + 125,levelX +250, levelY +125);
	}else if (dir == "down"){
		drawArrow(levelX + 125,levelY - 50,levelX +125, levelY);
		arrowDirection = "right";
	}
}

function drawArrow(x1,y1,x2,y2){
	stroke('black');
	strokeWeight(50);
	line(x1,y1,x2,y2);
	if(y1 == y2 && x1 < x2){
		triangle(x2-7,y2-7,x2-7,y2+7,x2,y2);
	}
	if(y1 == y2 && x1 > x2){
		triangle(x2,y2,x2+7,y2+7,x2+7,y2-7);
	}
	if(y1 < y2 && x1 == x2){
		triangle(x2,y2,x2-7,y2-7,x2+7,y2-7);
	}
	if(y1 > y2 && x1 == x2){
		triangle(x2,y2,x2-7,y2+7,x2+7,y2+7);
	}
}

function mousePressed(){
	for(var i = 0; i < data.length; i++){
		if(mouseX > data[i].x ){
			if(mouseX < data[i].x +250){
				if(mouseY > data[i].y){
					if(mouseY < data[i].y + 250){
						selected = i;
					}
				}
			}
		}
	if( mouseX > data[i].x2 && data[i].x2 != -1){
		if( mouseX < data[i].x2 +250){
			if( mouseY > data[i].y2){
				if(mouseY < data[i].y2 + 250){
					selected = i;
				}
			}
		}
	}
}
}
function mouseReleased(){
	for(var i = 0; i < data.length; i++){
		if(mouseX > data[i].x){
			if(mouseX < data[i].x +250){
				if(mouseY > data[i].y){
					if(mouseY < data[i].y + 250){
						if(data[selected].destination == i){
							data[selected].destination = -1;
							data[i].parent = -1;
						}else if(selected == i){
							if(data[selected].marked == false){
								data[selected].marked = true;
							}else{
								data[selected].marked = false;
								}
						}else if(data[selected].destination == -1 && data[i].parent == -1){
							data[selected].destination = i;
							data[i].parent = selected;
							}
						break;
						}
					}
				}
			}
			if( mouseX > data[i].x2 && data[i].x2 != -1){
				if( mouseX < data[i].x2 +250){
					if( mouseY > data[i].y2){
						if(mouseY < data[i].y2 + 250){

							if(data[selected].destination == i){
								data[selected].destination = -1;
								data[i].parent = -1;
							}else if(selected == i){
								if(data[selected].marked == false){
									data[selected].marked = true;
								}else{
									data[selected].marked = false;
									}
							}else if(data[selected].destination == -1 && data[i].parent == -1){
								data[selected].destination = i;
								data[i].parent = selected;
								}
							}
						}
					}
				}
		}
	selected = -1;
}
