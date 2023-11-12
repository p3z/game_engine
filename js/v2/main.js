function preload() {
  player_avatar = loadImage('./img/rocket-icon-wht.png');  
  enemy_avatar_1 = loadImage('./img/enemy-rocket-wht.png');
}

function handle_controller(){
  let gamepads = navigator.getGamepads();
  

  if (gamepads[0]) { // Assuming only one gamepad for simplicity
    gamepad = gamepads[0];

    // Default mappings to my GameSir T3s controller
        // Iterate through buttons
        for (let i = 0; i < gamepad.buttons.length; i++) {
          if (gamepad.buttons[i].pressed) {
            console.log(`Button ${i} pressed`);
          }
        }
    
        // Iterate through axes
        for (let i = 0; i < gamepad.axes.length; i++) {
          if (gamepad.axes[i] !== 0) {
            console.log(`Axis ${i} moved: ${gamepad.axes[i]}`);
          }
        }

    // if (controller.buttons[0].pressed) { // A
    //   console.log('A');
    // } else if (controller.buttons[1].pressed) { // B
    //   console.log('B'); 
    // } else if (controller.buttons[2].pressed) { // X
    //   console.log('X');
    // } else if (controller.buttons[3].pressed) { // Y
    //   console.log('Y Button');
    // } else if (controller.buttons[4].pressed) { // L1
    //   console.log('L1');
    // } else if (controller.buttons[4].pressed) {  // ?? NO IDEA...
    //   console.log('Button 4 pressed');
    // }else if (controller.buttons[5].pressed) { // R1
    //   console.log('R1 Button'); 
    // } else if (controller.buttons[6].pressed) { // L2
    //   console.log('L2');
    // } else if (controller.buttons[7].pressed) { // R2
    //   console.log('R2 prsed');
    // }else if (controller.buttons[8].pressed) { // SELECT
    //   console.log('SELECT');
    // }else if (controller.buttons[9].pressed) { //START
    //   console.log('START');
    // }else if (controller.buttons[10].pressed) { // L3
    //   console.log('L3');
    // }else if (controller.buttons[11].pressed) { // R3
    //   console.log('R3');
    // }else if (controller.buttons[11].pressed) {  // ?? NO IDEA...
    //   //console.log('Button 11 pressed');
    // }else if (controller.buttons[12].pressed) { // UP
    //   console.log('UP');
    // }else if (controller.buttons[13].pressed) { // DOWN
    //   console.log('DOWN');
    // }else if (controller.buttons[14].pressed) { // LEFT
    //   console.log('LEFT');
    // }else if (controller.buttons[15].pressed) { // RIGHT
    //   console.log('RIGHT');
    // }else if (controller.buttons[16].pressed) { // ?? NO IDEA...
    //   //console.log('16');
    // }
    

    // Map keys to axes
    // let left_x = controller.axes[0];
    // let left_y = controller.axes[1];
    // let right_x = controller.axes[2];
    // let right_y = controller.axes[3];

    // if (left_x > 0.5) {
    //   // Right direction on the left stick
    //   console.log('Right direction on left stick');
    // } else if (left_x < -0.5) {
    //   // Left direction on the left stick
    //   console.log('Left direction on left stick');
    // }
    
    // if (right_x > 0.5) {
    //   // Right direction on the right stick
    //   console.log('Right direction on right stick');
    // } else if (right_x < -0.5) {
    //   // Left direction on the right stick
    //   console.log('Left direction on right stick');
      
    // }

    

    // if (left_y > 0.5) {
    //   // Down direction on the left stick
    //   console.log('Down direction on left stick');
    // } else if (left_y < -0.5) {
    //   // Up direction on the left stick
    //   console.log('Up direction on left stick');
    // }

    // if (right_y > 0.5) {
    //   // Down direction on the left stick
    //   console.log('Down direction on right stick');
    // } else if (right_y < -0.5) {
    //   // Up direction on the left stick
    //   console.log('Up direction on right stick');
    // }
  
  }
  




}


// p5 default load function, this will run regardless of anything you do
function setup(){

  // so register the canvas, and initialise it
  game_canvas = createCanvas(windowWidth, windowHeight);      
  background(0);
  game_canvas.parent('p5-main-view');

  // but hide it off the getgo, we want to only present it to user when they've triggered it manually
  game_canvas.style('display', 'none');

    // Check for gamepads
    window.addEventListener("gamepadconnected", function (e) {
      console.log("Gamepad connected:", e.gamepad);
      controller_connected = e.gamepad;
    });
  
    window.addEventListener("gamepaddisconnected", function (e) {
      console.log("Gamepad disconnected:", e.gamepad);
      controller_connected = false;
    });
}

// dont call this fn 'setup', you'll conflict with p5 defaults and invoke it immediately! using a custom fn name so that it's not immediately invoked 
function init_canvas() { 
    game_canvas.style('display', 'block')
    //pause_canvas_btn.classList.remove("hide");
    player_avatar.resize(BASIC_AVATAR_SIZE, BASIC_AVATAR_SIZE);
}

function draw_scoreboard(score){
    let scoreboard_width = 150;
    let scoreboard_height = 50;
    let padding = 30;

    // Calculate the position for the top-right corner
    let scoreboard_x = width - scoreboard_width - padding; // Calculate X-coordinate
    let scoreboard_y = padding; // Y-coordinate is 0 for the top

    // Draw a rectangle at the top-right corner
    // fill("rgba(255,255,255,0.5)"); // Set fill color to red
    // rect(scoreboard_x, scoreboard_y, scoreboard_width, scoreboard_height);
    
    // Add text inside the rectangle
    textSize(32); // Set the text size
    fill("rgba(255,255,255,0.6)"); // Set the text fill color to white
    //textAlign(CENTER, CENTER); // Center the text horizontally and vertically
    text(player_score, scoreboard_x + scoreboard_width / 2, scoreboard_y + scoreboard_y / 2);

}


function draw() {

  if(controller_connected){
    handle_controller(controller_connected);
  }
  
  /* Handle the fancy spacey animation of the background gradient changing color*/
  if(use_bg_transition){
    //background(0); // Clear the background
    transition_background(lerp_amount, SPACE_COLORS);
    
    if(!game_paused){
      lerp_amount += 0.005; // Adjust the step for smoother transitions
    }
    

    if (lerp_amount >= 1) {
      lerp_amount = 0; // reset it
      bg_color_index1 = (bg_color_index1 + 1) % SPACE_COLORS.length;
      bg_color_index2 = (bg_color_index1 + 1) % SPACE_COLORS.length;
    }
  }

  let sparsity = random_num(0, MAX_STAR_SPARSITY); // decide if we should spawn a star this frame

  switch(true){
    case (!game_paused && sparsity < get_percentage(MAX_STAR_SPARSITY, 1)): // 1% chance
      let new_planet = generate_celestial('planet');
      planets.push(new_planet);
      break;

    case (!game_paused && sparsity < get_percentage(MAX_STAR_SPARSITY, 50)): // 50% chance
      // let star_qty = random_num(0 ,3); // if we want to create more than one star per frame

      // for(let i = 0; i < star_qty; i++){
        let new_star = generate_celestial();
        stars.push(new_star);
      //}
      break;
  }
  
  animate_celestials(stars, game_paused);
  animate_celestials(planets, game_paused);
  

  if (player_1_spawned) {

    // Calculate avatar pos, centered on the cursor
    let imageX = mouseX - player_avatar.width / 2;
    let imageY = mouseY - player_avatar.height / 2;

    // Draw a border around the player image (handy for troubleshooting)
    // stroke(255, 0, 0); // Red border color
    // strokeWeight(2); // Border width
    // noFill(); // No fill inside the border
    // rect(imageX, imageY, player_avatar.width, player_avatar.height);
    
    image(player_avatar, imageX, imageY, BASIC_AVATAR_SIZE, BASIC_AVATAR_SIZE);
    

    // Check if it's time to spawn a new enemy
    if(!game_paused && animated_frames_count % enemy_spawn_interval == 0){

      for(let i = 0; i <= game_difficulty; i++){          
        if(enemies.length < MAX_ENEMY_QTY){
          let enemy = generate_enemy(BASIC_AVATAR_SIZE);
          enemies.push(enemy);
        } else {
          console.log("Max enemies in memory!")
          console.log(enemies.length)
        }
        
        //enemy_last_spawned = frameCount;
      }
      
      
    }

      animate_messages(test_message_obj, game_paused);
      animate_projectiles(projectiles, game_paused);
      animate_enemies(enemies, game_paused);
    
  }
  



  if(player_1_spawned){
    draw_scoreboard(player_score);
  }

  if(!game_paused && player_1_spawned){
    animated_frames_count++;
    //console.log(animated_frames_count);
  }
}

function mousePressed() {
  
  if(!game_paused && player_1_spawned){
    generate_projectile("rgba(255, 0, 0, 0.5)");
    laser1.play();
  }
  
}

function keyPressed() {
  switch (key) {
    case ' ': // Space key is pressed      
      pause_play();
      break;
    case 'Enter':
      // Enter key is pressed
      console.log('Enter key pressed');
      break;
    case 'w':
    case 'W':
      // W key is pressed
      console.log('W key pressed');
      break;
    case 'a':
    case 'A':
      // A key is pressed
      console.log('A key pressed');
      break;
    case 's':
    case 'S':
      // S key is pressed
      console.log('S key pressed');
      break;
    case 'd':
    case 'D':
      // D key is pressed
      console.log('D key pressed');
      break;
    case 'ArrowLeft':
      // Left arrow key is pressed
      console.log('Left arrow key pressed');
      break;
    case 'ArrowUp':
      // Up arrow key is pressed
      console.log('Up arrow key pressed');
      break;
    case 'ArrowRight':
      // Right arrow key is pressed
      console.log('Right arrow key pressed');
      break;
    case 'ArrowDown':
      // Down arrow key is pressed
      console.log('Down arrow key pressed');
      break;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}