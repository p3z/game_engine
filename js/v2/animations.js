function animate_celestials(celestials, paused = false){   

    for (let i = celestials.length - 1; i >= 0; i--) {

      let current = celestials[i];
      
      if(!paused){
        current.y += current.speed; // Move the celestial downwards
      }
           

      fill(current.color); // Set the fill color to the celestial's color
      noStroke();            
      ellipse(current.x, current.y, current.size, current.size); // Draw the celestial

      // Remove celestials that have moved off the canvas
      if (current.y > height + current.size / 2) {
        celestials.splice(i, 1);
        //console.log("Celestial left the screen")
      }

    }

}

function detect_enemy_collision(shot, i){

  for (let j = enemies.length - 1; j >= 0; j--) {
    let enemy = enemies[j];

    // Check for collision between the projectile and the enemy using collideRectRect
    if (collideRectRect(shot.x, shot.y, shot.width, shot.height, enemy.x, enemy.y, enemy.size, enemy.size)) {

      player_score += PLAYER_SCORE_MAGNITUDE;


      let next_level = PLAYER_SCORE_MAGNITUDE * game_difficulty * GAME_LEVEL_MAGNITUDE;

      //console.log("Next level at: " + next_level);
      
      
      if(player_score >= next_level){
        game_difficulty++;
        console.log("NEXT LEVEL");

        if(game_difficulty === 3){
          console.log("speed increased")
          enemy_spawn_interval = 60 * 2;
        }

        if(game_difficulty === 5){
          console.log("speed increased")
          enemy_spawn_interval = 60 * 1;
        }

        if(game_difficulty === 7){
          console.log("speed increased")
          enemy_spawn_interval = 60 * 0.5;
        }

        

        

        if(success1){
          success1.play();
        }
        
      } else {
        if(blip1){
          blip1.play();
        }
      }
      
      //console.log(projectiles[i])

      projectiles.splice(i, 1); // Remove the projectile
      enemies.splice(j, 1); // Remove the enemy
      break; // Exit the inner loop, assuming one projectile can hit one enemy only
    }
  }
}

function animate_projectiles(projectiles, paused = false){
  for (let i = projectiles.length - 1; i >= 0; i--) {

      let shot = projectiles[i];
      let fire_origin = shot.y - player_avatar.height - 10;

      fill(shot.color); // Set the fill color to the projectile's color
      noStroke(); 
      rect(shot.x, fire_origin, shot.width, shot.height);

      if(!paused){
        // Move the shot upwards
        shot.y -= 15; // Adjust the speed as needed
        detect_enemy_collision(shot, i);
      }
      

      //console.log(shot.y)
      // Remove projectiles that have moved out of the canvas
      if (shot.y + shot.height < 0) {
        projectiles.splice(i, 1);
        //console.log("projectile left the screen");
      }
  }
}

function animate_enemies(enemies, paused = false){
  
  for (let i = enemies.length - 1; i >= 0; i--) {

      let enemy = enemies[i];
      
      
      push(); // Save the current transformation state
      noStroke(); 
      translate(enemy.x + enemy.size / 2, enemy.y + enemy.size / 2);
          
      if(!paused){        

        let angle = calculate_rotation_angle(enemy.x_speed, enemy_angle_obj);
        
        if(enemy.direction === "left"){
          enemy.x -= enemy.x_speed;
          rotate(radians(angle)); 
        } else if(enemy.direction === "right"){
          enemy.x += enemy.x_speed;
          rotate(radians(-angle)); 
        }        
        
        enemy.y += enemy.y_speed;
      }
      

      //fill("red"); // Set the fill color to the enemy's color
      
      //rect(-enemy.size / 2, -enemy.size / 2, enemy.size, enemy.size); // Draw the bounding box
      imageMode(CENTER); // Set image mode to center
      image(enemy_avatar_1, 0, 0, enemy.size, enemy.size); // Draw the image centered
      pop(); // Restore the previous transformation state
      



      // Remove enemies that have moved out of the canvas      
      if (enemy.y + enemy.size / 2 >= height) {
        enemies.splice(i, 1);
        //console.log("enemy left the screen");
      }
  }
}

function animate_messages(text_arr, paused = false){

  for (let i = text_arr.length - 1; i >= 0; i--) {
    let msg = text_arr[i];

    if (frameCount >= msg.delay) {      
      
      textSize(msg.size);
      fill(msg.color);
      stroke(0);
      strokeWeight(4);
      text(msg.text, msg.x, msg.y);
          
      if(!paused){
        msg.y += msg.speed; // Adjust the speed as needed
      }
      
      // Remove msgs that have moved out of the canvas
       if (msg.y  >= canvas.height) {
         text_arr.splice(i, 1);
       }
    }

      
  }
}

function transition_background(lerp_amount, colors = []){

  let c1 = color(colors[bg_color_index1]);
  let c2 = color(colors[bg_color_index2]);        
  let lerped_color = lerpColor(c1, c2, lerp_amount);

  background(lerped_color);
  
}


