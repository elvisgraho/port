

export default function animation(canvas) {
	let context = canvas.getContext('2d');
	let stageDom = document.getElementsByClassName('stage')[0];
	let allRects = [];
	let numberOfActiveBoxes = 20;
  
	let setCanvasHeight = () => {
		canvas.width = stageDom.offsetWidth;
		canvas.height = stageDom.offsetHeight;
		canvas.style.width = `${stageDom.offsetWidth}px`;
		canvas.style.height = `${stageDom.offsetHeight}px`;

		if(canvas.width < 900){
			numberOfActiveBoxes = 10;
		} else {
			numberOfActiveBoxes = 20;
		}
	};
  
	let generateRect = () => {
		if(allRects.length >= numberOfActiveBoxes){ return; }

		let randWidth = Math.random() * (30 - (10)) + (10);
		let randX = Math.random() * ((canvas.width - randWidth) - (30)) + (30);
		let randY = Math.random() * ((canvas.height - 200) - (20)) + (20);

		allRects.push(new Rect(
			randX,
			randY,
			randWidth,
			'204, 24, 30'
		));
	};
  
	setCanvasHeight();
	for (let i = 0; i < numberOfActiveBoxes; i++){
		generateRect();
	}

  
	let animate = () => {
		requestAnimationFrame(animate);
		setCanvasHeight();
		context.clearRect(0, 0, canvas.width, canvas.height);
  
    
		allRects.forEach((rect, index, object) => {
			rect.draw(context, canvas);

			if (rect.deleteMe) { object.splice(index, 1); }
			generateRect();
		});

	};

	setTimeout(() => {animate();}, 2000);
}


class Rect {
	constructor(posX, posY, maxGrow, color){
		//rect
		this.posX = posX;
		this.posY = posY;
		this.maxGrow = maxGrow;
		this.color = color;
		this.width = 0;
		this.height = 0;
		this.opacity = 1;
    
		//animation
		this.animationCycle = 0;
		this.wait = 0;
		this.deleteMe = false;
		this.firstY = this.posY;
    
		//physics
		this.dy = 0;
		this.dx = 0;
		this.bounce_factor = 0.8;
		this.gravity = 0.81;
		this.friction = 0.6;
    
		//crash
		this.smallRects=[];
  
	}
  
	draw(context, canvas){
		context.fillStyle = `rgb(${this.color},${this.opacity}`;
		context.fillRect(this.posX, this.posY, this.width, this.height);

		if (this.animationCycle === 0) {
			this.animateGrow(canvas);
		}
		else if (this.animationCycle === 1){
			this.animateFall(canvas);
		}
		else if (this.animationCycle === 2){
			this.animateCrash(context, canvas);
		}
		else {
			this.deleteMe = true;
		}
	}
  
	animateFall(canvas){
		if (this.posY + this.height + this.dy >= canvas.height + this.height) {
			this.dy += this.gravity;
			this.generateRects(canvas);
			this.animationCycle = this.animationCycle + 1;
		}
		else {
			this.dy += this.gravity;
		}

		this.posX += this.dx;
		this.posY += this.dy;
	}
  
	animateGrow(){
		if ( this.width < this.maxGrow ){
			this.width = this.width + 1;
			this.height = this.height + 1;
			this.posX = this.posX - 0.5;
			this.posY = this.posY - 0.5;
		}
		else if (this.wait < 30) {
			this.wait = this.wait + 1;
		}
		else {
			this.wait = 0;
			this.animationCycle = this.animationCycle + 1;
		}
	}
  
	generateRects(canvas){
		let dividor = (canvas.height - this.firstY) / 10;
  
		while (this.smallRects.length <= this.width / 2){
			let yMov = Math.random() * (dividor - 0) + 0;
			let xMov = Math.random() * (dividor - (-dividor)) + (-dividor);
			this.smallRects.push(new RectSmall(
				this.posX,
				this.posY,
				this.width / 2,
				this.height / 2,
				this.color,
				xMov,
				yMov
			));
		}

	}
  
	animateCrash(context, canvas) {
		this.smallRects.forEach((rect, index, object) => {
			rect.draw(context, canvas);

			if (rect.doDelete()) {
				object.splice(index, 1);
			}
		});
    
		if (this.smallRects.length <= 0) {
			this.animationCycle = this.animationCycle + 1;
			this.doDelete = true;
		}
	}


}


class RectSmall {
	constructor(posX, posY, width, height, color, xMovement, yMovement){
		//rect
		this.posX = posX;
		this.posY = posY;
		this.color = color;
		this.width = width;
		this.height = height;
		this.opacity = 1;
    
		//animation
		this.deleteMe = false;
    
		//physics
		this.dy = yMovement;
		this.dx = xMovement;
		this.bounce_factor = 0.8;
		this.gravity = 0.81;
		this.friction = 0.6;
	}
  
	draw(context, canvas){
		context.fillStyle = `rgb(${this.color},${this.opacity}`;
		context.fillRect(this.posX, this.posY, this.width, this.height);

		this.animateFall(canvas);
	}
  
	animateFall(canvas){
		if (this.opacity <= 0){
			this.deleteMe = true;
			return;
		}

		if (this.posY + this.height + this.dy > canvas.height) {
			this.dy = -this.dy;
			this.dy = this.dy * this.friction;
			this.dx = this.dx * (this.friction * 1.1);
      
			this.opacity = this.opacity - 0.3;
		}
		else {
			this.dy += this.gravity;
		}

		if (this.posX + this.width >= canvas.width || this.posX - this.width <= 0) {
			this.dx = -this.dx;
		}

		this.posX += this.dx;
		this.posY += this.dy;
	}
  
	doDelete(){
		return this.deleteMe;
	}

}