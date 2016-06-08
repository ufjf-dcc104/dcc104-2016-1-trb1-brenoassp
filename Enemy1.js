function Enemy1(){
	this.x = 110;
	this.y = 115;
	this.vx = 0;
	this.ax = 0;
	this.vy = 0;
	this.ay = 0;
	this.raio = 16;
	this.imgPath = "img/enemy1.png";
	this.img = new Image();
	this.img.src = this.imgPath;
	this.tiros = [];
	this.delayTiro = 1;
	this.pontos = 10;
	this.danoColidiu = 20;
	this.health = 20;
}
	
Enemy1.prototype.mover = function (){
	this.vx = this.vx + this.ax*dt;
	this.x = this.x + this.vx*dt;
	this.vy = this.vy + this.ay*dt;
	this.y = this.y + this.vy*dt;

	for(j in this.tiros){
		this.tiros[j].mover();
	}
}

Enemy1.prototype.desenhar = function (){
	// ctx.fillStyle = "rgb(250, 200, 200)";
	// ctx.strokeStyle = "rgb(150, 50, 50)";
	// ctx.lineWidth = 3;

	// ctx.beginPath();
	// ctx.arc(this.x, this.y, this.raio+5, 0, 2*Math.PI);
	// ctx.closePath();
	// ctx.fill();
	// ctx.stroke();
	ctx.drawImage(this.img, this.x-this.raio, this.y-this.raio, 2*this.raio, 2*this.raio);

	this.delayTiro -= dt;
	if(this.delayTiro < 0 && this.y > 0){
		this.delayTiro = 1;
		var tiroTmp = new Shot("img/shot3.png");
		tiroTmp.x = this.x;
		tiroTmp.y = this.y;	
		tiroTmp.vy = 300;
		tiroTmp.raio = 8;
		this.tiros.push(tiroTmp);
	}
	for(j in this.tiros){
		ctx.drawImage(this.tiros[j].imgShot, this.tiros[j].x, this.tiros[j].y, this.tiros[j].raio,this.tiros[j].raio);
	}
	
}	

Enemy1.prototype.restricoes = function(){
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

Enemy1.prototype.colidiuComCircular = function (alvo) {
  var distancia = Math.sqrt(
        Math.pow(alvo.x - this.x, 2)+
        Math.pow(alvo.y - this.y, 2)
  );
  return distancia<(alvo.raio+this.raio);
}

Enemy1.prototype.gotDamage = function (damageValue) {
	this.health -= damageValue;	
};