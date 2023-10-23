

function clear_view(){
  main_view.innerHTML = "";
}

function select_spawn_point(location = []){
  let view_width = main_view.clientWidth;
  let view_height = main_view.clientHeight;
  
  
  let x_loc, y_loc;
  
  if(location.length == 0){
    // No location specified, Pick a random place between each end of the view
    x_loc = random_num(0, view_width);
    y_loc = random_num(0, view_height);
    
  } else {
    // Assign one of the selected locations
    x_loc = location[0];
    y_loc = location[1];
  }
  
  
  return {
    x_loc: x_loc,
    y_loc: y_loc
  }
}

function spawn_test_player(color, size = []){
    let old_avatar = document.querySelector(".player-avatar");
  
    if(old_avatar){
       old_avatar.remove();
    }
  
    let new_avatar = spawn_quad_shape(color, [50]);
    new_avatar.classList.add("player-avatar");
    let view_width = main_view.clientWidth;
    let view_height = main_view.clientHeight;
    let spawn_loc = [view_width / 2, view_height / 2];
  
    let spawn_point = select_spawn_point();  
    let { x_loc, y_loc } = select_spawn_point(spawn_loc);
    
    
    
     new_avatar.style.left = `${x_loc}px`;
     new_avatar.style.top = `${y_loc}px`;
  
  attach_player_handler(new_avatar)
    return new_avatar;
  
}

function attach_player_handler(player){

    player.onmouseover = () => {
        document.addEventListener('mousemove', (e) => movePlayer(e, player));

    };

    player.onmouseout = () => {
        document.removeEventListener('mousemove', movePlayer);
    };
  
    player.onclick = (e) => {
        //e.currentTarget.remove();
        shoot_projectile(e)

        e.target.style.transform = 'rotate(0deg)'; // must reset this every click, else anime thinks it's completed its job and there's nothing to do
        anime({
          targets: e.target,
          rotate: 360,
          rotate: '1turn',
          //backgroundColor: '#000',
          //duration: 800
        });
        
       
    };
}

function movePlayer(event, player) {
    // Update the position of the player div to follow the mouse cursor
    player.style.left = (event.clientX - player.offsetWidth / 2) + 'px';
    player.style.top = (event.clientY - player.offsetHeight / 2) + 'px';
}

function shoot_projectile(e, config_obj = {}){
  let { type = "" } = config_obj;
  // create projectile
  //let new_projectile = spawn_ellipse();

  const projectile = document.createElement('div');
  projectile.className = 'projectile-fire';

   // Set the initial position to the click location
   projectile.style.left = e.clientX + 'px';
   projectile.style.top = e.clientY + 'px';

    // Add the div to the DOM
    main_view.appendChild(projectile);


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
    



run_test_btn.onclick = () => {
  let rand_color = random_rgba();
  // let square = spawn_quad_shape(rand_color);
  // let triangle = spawn_tri(rand_color);
  // let circle = spawn_ellipse(rand_color);
  let avatar = spawn_test_player(rand_color);
  //let test_spawn_point = [119, 124];
  main_view.appendChild(avatar);

  

}

clear_view_btn.onclick = clear_view;

