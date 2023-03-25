export default class Slide {
   constructor(slide, wrapper) {
     this.slide = document.querySelector(slide)
     this.wrapper = document.querySelector(wrapper);
     this.dist = { finalPosition: 0, startX: 0, movement: 0 }
   }
 
   moveSlide(distX) {
     this.dist.movePosition = distX;
     this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
   }
 
   updatePosition(clientX) {
     this.dist.movement = (this.dist.startX - clientX) * 1.6;
     return this.dist.finalPosition - this.dist.movement;
   }
 
   onStart(event) {
     let movetype;
     if (event.type === 'mousedown') {
       event.preventDefault();
       this.dist.startX = event.clientX;
       movetype = 'mousemove';
     } else {
       this.dist.startX = event.changedTouches[0].clientX;
       movetype = 'touchmove';
     }
     this.wrapper.addEventListener(movetype, this.onMove);

   //Criado uma verificação para passar tanto o evento de touch quanto o de click ao addEventListerner atraves da variavel.
   //event.changedTouches = propriedade dos eventos de touch.
   }
 
   onMove(event) {
     const pointerPosition = (event.type === 'mousemove') ? event.clientX : event.changedTouches[0].clientX;
     const finalPosition = this.updatePosition(pointerPosition);
     this.moveSlide(finalPosition);

     //Criado uma variavel pointerPosition e passado o ternario nela para verificação do tipo de evento. Passado a variavel como valor da funcao updatePositon que anteriormente estava como event.clientX que representa somente a propriedade de click.
   }
 
   onEnd(event) {
     const movetype = (event.type === 'mouseup') ? 'mousemove' : 'touchmove';
     this.wrapper.removeEventListener(movetype, this.onMove);
     this.dist.finalPosition = this.dist.movePosition;

     //Criado variavel movetypep e passado o ternario para verificar o typo de evento, passado a variavel no lugar do event no removeEventListener para remove os 2 tipos de eventos do onMove.

   }
 
   addSlideEvents() {
     this.wrapper.addEventListener('mousedown', this.onStart);
     this.wrapper.addEventListener('touchstart', this.onStart);
     this.wrapper.addEventListener('mouseup', this.onEnd);
     this.wrapper.addEventListener('touchend', this.onEnd);
      //Add ao wrapper onStar e onEnd os eventos de touch.
   }
 
   bindEvents() {
     this.onStart = this.onStart.bind(this);
     this.onMove = this.onMove.bind(this);
     this.onEnd = this.onEnd.bind(this);
   }
 
   init() {
     this.bindEvents();
     this.addSlideEvents();
     return this;
   }
 }