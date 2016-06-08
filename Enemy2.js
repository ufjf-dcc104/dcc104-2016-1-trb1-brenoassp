function Enemy2(){
	this.x = 110;
	this.y = 115;
	this.vx = 0;
	this.ax = 0;
	this.vy = 0;
	this.ay = 0;
	this.raio = 16;
	this.imgPath = "img/enemy2.png";
	this.img = new Image();
	this.img.src = this.imgPath;
	this.pontos = 20;
	this.danoColidiu = 30;
	this.health = 20;
}
	
Enemy2.prototype.mover = function (){
	this.vx = this.vx + this.ax*dt;
	this.x = this.x + this.vx*dt;
	this.vy = this.vy + this.ay*dt;
	this.y = this.y + this.vy*dt;
}

Enemy2.prototype.desenhar = function (){
	ctx.fillStyle = "rgb(250, 200, 200)";
	ctx.strokeStyle = "rgb(150, 50, 50)";
	ctx.lineWidth = 3;

	// ctx.beginPath();
	// ctx.arc(this.x, this.y, this.raio+5, 0, 2*Math.PI);
	// ctx.closePath();
	// ctx.fill();
	// ctx.stroke();
	ctx.drawImage(this.img, this.x-this.raio, this.y-this.raio, 2*this.raio, 2*this.raio);
}	

Enemy2.prototype.restricoes = function(){
	if(this.x<15){
		this.x = 15;
		this.vx = 0;
		this.ax = 0;
	}
	if(this.x>tela.width-15) {
		this.x=tela.width-15;
		this.vx = 0;
		this.ax = 0;
	}
	if(this.y<15){
		this.y = 15;
		this.vy = 0;
		this.ay = 0;
	}
	if(this.y>tela.height-15) {
		this.y=tela.height-15;
		this.vy = 0;
		this.ay = 0;
	}
}

Enemy2.prototype.colidiuComCircular = function (alvo) {
  var distancia = Math.sqrt(
        Math.pow(alvo.x - this.x, 2)+
        Math.pow(alvo.y - this.y, 2)
  );
  return distancia<(alvo.raio+this.raio);
};

Enemy2.prototype.gotDamage = function (damageValue) {
	this.health -= damageValue;
};