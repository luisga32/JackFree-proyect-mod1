const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const game =new Game(ctx);
// arranca el juego
window.onload = () => {
  game.draw();
  document.getElementById('start-button').onclick = () => {
    game.initialice();
    game.startGame();
  } 
  document.getElementById('pause-button').onclick = () => {
   game.pause();
  } 
    // control cuando pulsan una tecla

  document.addEventListener('keydown', (event) => { 
 //   console.log(`keydown`)
    game.onKeyEvent(event) 
    
    }) 
    // control cuando levantan el dedo de la tecla
    document.addEventListener('keyup', (event) => { 
   //  console.log(`keyup`)
   
    game.onKeyEvent(event) 
    
    }) 

 

  };
  
   