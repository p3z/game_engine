import { random_num, random_rgba, random_hex, rand_arr_select } from '../utils.js';
import { spawn_quad_shape, spawn_tri, spawn_ellipse  } from './shapes.js';
import { change_star_speed, select_spawn_point  } from './vert_scroller/environment.js';

function spawn_test_player(view, color, avatar,  size = []){
    // todo: this will need updating if you make multiplayer games
    let old_avatar = document.querySelector(".player-avatar");
  
    if(old_avatar){
       old_avatar.remove();
    }
  
    let test_img = avatar;
    let new_avatar = spawn_quad_shape(view, color, [50], test_img);
    new_avatar.classList.add("player-avatar");

    const backgroundImage = new Image();

    backgroundImage.src = test_img;
    backgroundImage.onload = function() {
      new_avatar.style.backgroundImage = "url('" + test_img + "')";
    };
    
    let view_width = view.clientWidth;
    let view_height = view.clientHeight;
    let spawn_loc = [view_width / 2, view_height / 2]; 
    let { x_loc, y_loc } = select_spawn_point(view, spawn_loc);
    
     new_avatar.style.left = `${x_loc}px`;
     new_avatar.style.top = `${y_loc}px`;
  
  attach_player_handler(view, new_avatar)
  return new_avatar;
  
}


function attach_player_handler(view, player){

  player.onmouseover = () => {
      document.addEventListener('mousemove', (e) => move_player(e, player));
  };

  player.onmouseout = () => {
      document.removeEventListener('mousemove', move_player);
  };

  player.onclick = (e) => {
      //e.currentTarget.remove();
      shoot_projectile(view, e);

      anime({
        targets: e.target,
        rotate: [
            { value: '-5deg', duration: 100 },
            { value: '5deg', duration: 200 },
            { value: '-5deg', duration: 300 },
            { value: '0deg', duration: 0 },
        ],
        scale: [
            { value: 1.2, duration: 150 },
            { value: 0.8, duration: 150 },
            // { value: 1.1, duration: 150 },
            // { value: 1.0, duration: 150 }
        ],
        easing: 'easeInOutQuad',
        direction: 'alternate', // Reverses the animation on each iteration
    });
      
     
  };

  let clickTimer;
  const clickThreshold = 500; // Adjust the threshold in milliseconds

  player.onmousedown = () => {
    clickTimer = setTimeout(() => {
      // This code will execute when a continuous click or hold is detected
      //console.log('Mouse click or hold detected');
      //change_star_speed(star_interval, 300)
    }, clickThreshold);
  };

  player.onmouseup = () => {
    // Clear the timer when the mouse button is released
    //console.log("Click released")
    //change_star_speed(star_interval, DEFAULT_SPEED)
    clearTimeout(clickTimer);
  };
}

function move_player(event, player) {
  // Update the position of the player div to follow the mouse cursor
  player.style.left = (event.clientX - player.offsetWidth / 2) + 'px';
  player.style.top = (event.clientY - player.offsetHeight / 2) + 'px';
}

function shoot_projectile(view, e){


const projectile = document.createElement('div');
projectile.className = 'projectile-fire';

 // Set the initial position to the click location
 projectile.style.left = e.clientX + 'px';
 projectile.style.top = e.clientY + 'px';

  // Add the div to the DOM
  view.appendChild(projectile);


  // Calculate the delay for the explosion animation
  const delay = window.innerHeight / 1000; // Adjust as needed

     
  // Define the projectile animation
  const projectileAnimation = anime({
      targets: projectile,
      translateY: -window.innerHeight - 20, // Animate it upwards outside the viewport
      duration: 500, // Adjust the duration as needed,
      easing: 'linear',
      autoplay: false, // Pause the animation initially
      complete: function() {
          // Remove the div when it's outside the viewport
          projectile.remove();
      }
  });

    // Define an explosion animation just before it reaches the top
    const explosionAnimation = anime({
        targets: projectile,
        scale: 5, // Increase the size to simulate an explosion
        duration: 300, // Adjust the duration as needed
        autoplay: false, // Pause the animation initially
        delay: delay,
        begin: function() {
            // Start the projectile animation when the explosion begins
            projectileAnimation.play();
        }
    });

    // Play the explosion animation
    explosionAnimation.play();




return projectile;
}


export {
  spawn_test_player,
  attach_player_handler,
  move_player,
  shoot_projectile
}