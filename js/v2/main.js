function preload() {
  player_avatar = loadImage('./img/rocket-icon-wht.png'); 
  enemy_avatar_1 = loadImage('./img/enemy-rocket-wht.png'); 
}

// dont call this fn 'setup', you'll conflict with p5 defaults and invoke it immediately! using a custom fn name so that it's not immediately invoked 
function init_canvas() { 
    let canvas = createCanvas(windowWidth, windowHeight);          
    background(0);
    canvas.parent('main_view');          
    clear_canvas_btn.classList.remove("hide");
    player_avatar.resize(player_avatar_size, player_avatar_size);
}

// console.log("Spawn interval: ")
// console.log(enemy_spawn_interval)

function draw() {
    
  //background(0); // Clear the background
  transition_background(lerp_amount, SPACE_COLORS);
  
  lerp_amount += 0.005; // Adjust the step for smoother transitions

  if (lerp_amount >= 1) {
    lerp_amount = 0; // reset it
    bg_color_index1 = (bg_color_index1 + 1) % SPACE_COLORS.length;
    bg_color_index2 = (bg_color_index1 + 1) % SPACE_COLORS.length;
  }


  if(run_animation){

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
    animate_enemies(enemies);

  }

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
      image(player_avatar, imageX, imageY, player_avatar_size, player_avatar_size);
      animate_projectiles(projectiles);
      
      //let seconds_past = frameCount / 60;

      // Check if it's time to spawn a new enemy
      if(frameCount % enemy_spawn_interval == 0){
        let enemy = generate_enemy(50);
        enemies.push(enemy);
        enemy_last_spawned = frameCount;
        
      }

      

      
  }

  
    

  
}



function mousePressed() {
  
  if(player_1_spawned){
    generate_projectile("rgba(255, 255, 0, 0.5)");
    laser1.play();
  }
  
}


