function preload() {
  player_avatar = loadImage('./img/rocket-icon-wht.png'); 
  enemy_avatar_1 = loadImage('./img/enemy-rocket-wht.png'); 
}



function setup(){
  game_canvas = createCanvas(windowWidth, windowHeight);      
  background(0);
  game_canvas.parent('p5-main_view');
  game_canvas.style('display', 'none')
}

// dont call this fn 'setup', you'll conflict with p5 defaults and invoke it immediately! using a custom fn name so that it's not immediately invoked 
function init_canvas() { 
    game_canvas.style('display', 'block')
    clear_canvas_btn.classList.remove("hide");
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

  
  if(run_animation){

    /* Handle the fancy spacey animation of the background gradient changing color*/
    if(use_bg_transition){
      //background(0); // Clear the background
      transition_background(lerp_amount, SPACE_COLORS);
        
      lerp_amount += 0.005; // Adjust the step for smoother transitions

      if (lerp_amount >= 1) {
        lerp_amount = 0; // reset it
        bg_color_index1 = (bg_color_index1 + 1) % SPACE_COLORS.length;
        bg_color_index2 = (bg_color_index1 + 1) % SPACE_COLORS.length;
      }
    }

    let sparsity = random_num(0, MAX_STAR_SPARSITY); // decide if we should spawn a star this frame

    switch(true){
      case (sparsity < get_percentage(MAX_STAR_SPARSITY, 1)): // 1% chance
        let new_planet = generate_celestial('planet');
        planets.push(new_planet);
        break;

      case (sparsity < get_percentage(MAX_STAR_SPARSITY, 50)): // 50% chance
        // let star_qty = random_num(0 ,3); // if we want to create more than one star per frame

        // for(let i = 0; i < star_qty; i++){
          let new_star = generate_celestial();
          stars.push(new_star);
        //}
        break;
    }
    
    
    animate_celestials(stars);
    animate_celestials(planets);
    

    if (player_1_spawned) {
  
      // Calculate avatar pos, centered on the cursor
      let imageX = mouseX - player_avatar.width / 2;
      let imageY = mouseY - player_avatar.height / 2;

      // Draw a border around the player image (handy for troubleshooting)
      // stroke(255, 0, 0); // Red border color
      // strokeWeight(2); // Border width
      // noFill(); // No fill inside the border
      // rect(imageX, imageY, player_avatar.width, player_avatar.height);

      // Draw the player circle with the image background
      image(player_avatar, imageX, imageY, BASIC_AVATAR_SIZE, BASIC_AVATAR_SIZE);
        
        
        
      //let seconds_past = frameCount / 60;

      // Check if it's time to spawn a new enemy
      if(frameCount % enemy_spawn_interval == 0){



        for(let i = 0; i <= game_difficulty; i++){
          let enemy = generate_enemy(BASIC_AVATAR_SIZE);
          enemies.push(enemy);
          //enemy_last_spawned = frameCount;
        }
        
        
      }
  
        animate_messages(message_obj);
        animate_projectiles(projectiles);
        animate_enemies(enemies);
      
    }
    

  } // end run_animation check

  draw_scoreboard(player_score);
}

function mousePressed() {
  
  if(player_1_spawned){
    generate_projectile("rgba(255, 0, 0, 0.5)");
    laser1.play();
  }
  
}