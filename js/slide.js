export default class Slide{
   constructor(slide,wrapper){
      this.slide = document.querySelector(slide);
      this.wrapper = document.querySelector(wrapper);
      this.dist = {finalPosition:0, startX:0, movement: 0}
      //startX = pegar referencia do click inicial do usuario
  //
   }


   
   onStart(event){
      event.preventDefault()
      this.dist.startX = event.clientX
      this.wrapper.addEventListener('mousemove',this.onMove)
   }
   
   //Método que ira mover o slide no DOM
   //Add a ul o style ="transform:translate3d"
   moveSlide(distX){
   //Criar movePosition para salvar valor de referencia do posicionamento.
   // logo passar no onEnd o finalPosition = movePosition, para guardar o valor final ao mouseup.
   this.slide.style.transform = `translate3d(${distX}px,0,0)`;
   this.dist.movePosition = distX
   }
   updatePosition(clientX){
      //Aqui será feito o calculo do click e da movimentação do mouse.
     //Será atibuido esse calculo como valor do this.dist.movement.
      //para acelerar o movimento do slide,basta passar o multiplicador.
      this.dist.movement = (this.dist.startX - clientX) * 1.6;

      //somar o valor do finalPosition + movement- para que possa salvar começar de onde o  usurio deixou .
      return this.dist.finalPosition - this.dist.movement;
   }

   onMove(event){
   //Faz a ativao da funtion updatePosition ao mousedown.
   const finalPosition = this.updatePosition(event.clientX);
//Sempre que houver o evento de mousedown,será atualizado o valor moveSlide.
  this.moveSlide(finalPosition)

}

onEnd(){
   this.wrapper.removeEventListener('mousemove',this.onMove)
   this.dist.finalPosition = this.dist.movePosition
}


addSlideEvents(){
   this.wrapper.addEventListener('mouseup',this.onEnd)
   this.wrapper.addEventListener('mousedown',this.onStart)
}


bindEvents(){
   this.onStart = this.onStart.bind(this);
   this.onMove = this.onMove.bind(this)
   this.onEnd = this.onEnd.bind(this)
}

   init(){
      this.bindEvents();
      this.addSlideEvents();
   return this   
}

}