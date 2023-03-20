export default class Slide{
   constructor(slide,wrapper){
      this.slide = document.querySelectorAll(slide);
      this.wrapper = document.querySelector(wrapper);
   }


   onEnd(){
      console.log('acabou')
      this.wrapper.removeEventListener('mousemove',this.onMove)
   }
onStart(event){
   event.preventDefault()
   this.wrapper.addEventListener('mousemove',this.onMove)
}

onMove(){
   console.log('moveu')
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