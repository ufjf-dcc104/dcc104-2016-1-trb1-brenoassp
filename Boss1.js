function Boss1(){
	this.x = 110;
	this.y = 115;
	this.vx = 0;
	this.ax = 0;
	this.vy = 0;
	this.ay = 0;
	this.raio = 80;
	this.imgPath = "img/boss1.png";
	this.img = new Image();
	this.img.src = this.imgPath;
	this.pontos = 500;
	this.health = 200;
	this.tiros = [];
	this.delayTiro = 0.5;
	this.direcaoAtual = 'direita';
	this.danoColidiu = 1000;
	this.imgBossDamagedPath = "img/boss1Damaged.png";
	this.imgBossDamaged = new Image();
	this.imgBossDamaged.src = this.imgBossDamagedPath;
	this.damaged = false;
}
	
Boss1.prototype.mover = function (){
	this.vx = this.vx + this.ax*dt;
	this.x = this.x + this.vx*dt;
	this.vy = this.vy + this.ay*dt;
	this.y = this.y + this.vy*dt;

	if(this.y >= 90 && this.x <= tela.width/2 + 100 && this.direcaoAtual == 'direita'){
		this.vy = 0;
		this.vx = 100;
	}else if(this.y >= 90 && this.x >= tela.width/2 - 100){
		this.direcaoAtual = 'esquerda';
		this.vy = 0;
		this.vx = -100;
	}else{
		this.direcaoAtual = 'direita';
	}

	for(j in this.tiros){
		this.tiros[j].mover();
	}
}

Boss1.prototype.desenhar = function (){
	// ctx.fillStyle = "rgb(250, 200, 200)";
	// ctx.strokeStyle = "rgb(150, 50, 50)";
	// ctx.lineWidth = 3;

	// ctx.beginPath();
	// ctx.arc(this.x, this.y, this.raio+5, 0, 2*Math.PI);
	// ctx.closePath();
	// ctx.fill();
	// ctx.stroke();
	if(!this.damaged){
		ctx.drawImage(this.img, this.x-this.raio, this.y-this.raio, 2*this.raio, 2*this.raio);
	}else{
		ctx.drawImage(this.imgBossDamaged, this.x-this.raio, this.y-this.raio, 2*this.raio, 2*this.raio);
		this.damaged = false;
	}

	this.createShots();
	
	//desenha posicoesTiros
	for(j in this.tiros){
		ctx.drawImage(this.tiros[j].imgShot, this.tiros[j].x, this.tiros[j].y, this.tiros[j].raio,this.tiros[j].raio);
	}

	ctx.fillStyle = "red";
	ctx.fillRect(460,50,20,this.health);
	
}	

Boss1.prototype.restricoes = function(){
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

Boss1.prototype.colidiuComCircular = function (alvo) {
  var distancia = Math.sqrt(
        Math.pow(alvo.x - this.x, 2)+
        Math.pow(alvo.y - this.y, 2)
  );
  return distancia<(alvo.raio+this.raio);
};

Boss1.prototype.gotDamage = function (damageValue) {
	this.health -= damageValue;
	this.damaged = true;	
};

Boss1.prototype.createShots = function() {
	var posicoesTiros = [
		{x: this.x, y: this.y+40, vx: 0, vy: 200},
		{x: this.x + 30, y: this.y+40, vx: 50, vy: 200},
		{x: this.x + 60, y: this.y+40, vx: 100, vy: 200},
		{x: this.x - 30, y: this.y+40, vx: -50, vy: 200},
		{x: this.x - 60, y: this.y+40, vx: -100, vy: 200},
	];
	this.delayTiro -= dt;
	if(this.delayTiro < 0 && this.y > 0){
		this.delayTiro = 0.5;
		for (var i = 0; i < 5; i++) {
			var tiroTmp = new Shot("img/shot3.png");
			tiroTmp.x = posicoesTiros[i].x;
			tiroTmp.y = posicoesTiros[i].y;	
			tiroTmp.vx = posicoesTiros[i].vx;
			tiroTmp.vy = posicoesTiros[i].vy;
			tiroTmp.raio = 20;
			this.tiros.push(tiroTmp);	
		}
	}
};