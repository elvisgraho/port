

export default function animation(canvas) {
	let context = canvas.getContext('2d');
	let stageDom = document.getElementsByClassName('stage')[0];

	let rectTest = new Rect(150, 50);
	let ballTest = new Ball(150, 150, 10, 'red');
  
	let animate = () => {
		requestAnimationFrame(animate);

		canvas.width = stageDom.offsetWidth;
		canvas.height = stageDom.offsetHeight;
		canvas.style.width = `${stageDom.offsetWidth}px`;
		canvas.style.height = `${stageDom.offsetHeight}px`;
  
		context.clearRect(0, 0, canvas.width, canvas.height);
  
		rectTest.draw(context, canvas);
		ballTest.draw(context, canvas);
	};

	animate();
}


class Rect {
	constructor(posX, posY, maxGrow, color){
		this.posX = posX;
		this.posY = posY;
		this.maxGrow = maxGrow;
		this.color = color;
		this.width = 30;
		this.height = 30;
		this.dy = +1;
	}
  
	draw(context, canvas){
		context.fillRect(this.posX, this.posY, this.width, this.height);
		this.animate(canvas);
	}
  
	animate(canvas){
		if ( this.posY + this.dy <= canvas.height - this.height){
			this.posY = this.posY + this.dy;
		}
		else if (this.posY < canvas.height - this.height){
			this.posY = canvas.height - this.height;
		}
	}
  
}

class Ball {
	constructor(posX, posY, radius, color){
		this.posX = posX;
		this.posY = posY;
		this.color = color;
		this.radius = radius;
    
		this.dy = +11;
	}
  
	draw(context, canvas){
		context.fillStyle = this.color;
		context.beginPath();
		context.arc(this.posX, this.posY, 30, 0, 2 * Math.PI);
		context.fill();

		//this.animate(canvas);
	}
  
	animate(canvas){
		if ( this.posY + this.dy <= canvas.height - this.height){
			this.posY = this.posY + this.dy;
		}
		else if (this.posY < canvas.height - this.height){
			this.posY = canvas.height - this.height;
		}
	}
  
}