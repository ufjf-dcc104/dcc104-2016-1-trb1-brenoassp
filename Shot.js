function Shot(imgShotPath){
		this.x = 110;
		this.y = -100;
		this.vx = 0;
		this.ax = 0;
		this.vy = 0;
		this.ay = 0;
		this.raio = 6;
		this.cor = 'yellow';
		this.col = 0;
		this.imgShotPath = imgShotPath;
		this.imgShot = new Image();
		this.imgShot.src = imgShotPath;
}
	
Shot.prototype.mover = function (){
	this.vx = this.vx + this.ax*dt;
	this.x = this.x + this.vx*dt;
	this.vy = this.vy + this.ay*dt;
	this.y = this.y + this.vy*dt;
}

Shot.prototype.desenhar = function (){
	// img, sx, sy, sw, sh, dx, dy, dw, dh
	ctx.drawImage(this.imgShot,
		Math.floor(this.col)*32, 0, 32, 32,
		this.x-this.raio, this.y-this.raio, 2*this.raio, 2*this.raio);
	if(this.col>=4) {
		this.col =0;
	} else {
		this.col+= 15*dt;
	}
}	

Shot.prototype.restricoes = function(){}

Shot.prototype.colidiuComCircular = function (alvo) {
  var distancia = Math.sqrt(
        Math.pow(alvo.x - this.x, 2)+
        Math.pow(alvo.y - this.y, 2)
  );
  return distancia<(alvo.raio+this.raio);
};