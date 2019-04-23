var levelWidth = 250;
var levelHeight = 250;

class Level{
		constructor(nm,img,mndstr,optstr){
			this.name = nm;
			this.image = img;
			this.mandatoryStars = mndstr;
			this.optionalStars = optstr;
			this.count = 0;
			this.destination = -1;
			this.marked = false;
			this.drawn = false;
			this.x = 10;
			this.y = 10;
		}
		draw(){
			image(this.image,this.x,this.y,levelWidth,levelHeight);
			this.drawn = true;
		}

	}
class Star{
	constructor(nm,amnt){
		this.name = nm;
		this.amount = amnt;
	}
}


function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);

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
	      new Level("BitS", images[23], [], []),
				new Level("Toad", images[24], [new Star("Bottom", 1), new Star("Top", 2)], []),
	      new Level("Mips", images[25], [new Star("Bottom", 2)], []),
	    ];
			data[0].destination = 1;
			data[1].destination = 2;
			data[2].destination = 3;
			data[3].destination = 4;
			data[5].destination = 6;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	fill('red');
	rect(100,100,100,100);
	drawLevels()

	for(var i = 0; i < data.length; i++){
		data[i].drawn = false;
	}
}

function drawLevels(){
	var offsetX = 0;
	var offsetY = 0;
	var direction = 1;

	for(var i = 0; i < data.length; i++){
		if(data[i].drawn == false){
			if(data[i].destination != -1){
				for(var b = i; b != -1; b = data[b].destination){

					data[b].x = 10 + offsetX;
					data[b].y = 10 + offsetY

					if(data[b].x + (300 * direction)+ 250 > windowWidth || data[b].x + (300 * direction) < 0){
						offsetY += 300;
						direction = -1;
					}else{
						offsetX += 300 * direction;
						}

					data[b].draw();
					}
				}
				offsetX = 0;
				offsetY += 350;
			}
		}
}
function drawArrow(){

}
