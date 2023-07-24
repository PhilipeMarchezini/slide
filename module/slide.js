export default class Slide {
  constructor(wrapper, slide) {
    this.wrapper = document.querySelector(wrapper);
    this.slide = document.querySelector(slide);
    this.dist = {
      startX: 0,
      finalPosition: 0,
      movement: 0,
    };
  }

  onStart(e) {
    e.preventDefault();
    this.wrapper.addEventListener('mousemove', this.onMove);
    this.dist.startX = e.clientX;
    console.log(this.dist);
  }

  updatePosition(clientX) {
    this.dist.movement = Math.floor((this.dist.startX - clientX) * 1.6);
    return this.dist.finalPosition - this.dist.movement;
  }

  moveSlide(e) {
    this.dist.movementFinal = e;
    this.slide.style.transform = `translate3d(${e}px,0,0)`;
  }

  onMove(e) {
    const finalPosition = this.updatePosition(e.clientX);
    this.moveSlide(finalPosition);
  }
  onEnd() {
    this.wrapper.removeEventListener('mousemove', this.onMove);
    this.dist.finalPosition = this.dist.movementFinal;
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }
  addEvents() {
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
  }

  init() {
    this.bindEvents();
    this.addEvents();
    return this;
  }
}
