function animate_celestials(celestials, paused = false){   

    for (let i = celestials.length - 1; i >= 0; i--) {

      let current = celestials[i];
      
      if(!paused){
        current.y += current.speed * bg_scroll_factor; // Move the celestial downwards
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

    // Check for collision between the projectile and the enemy using collideRectRect (comes from collide2d package)
    if (collideRectRect(shot.x, shot.y, shot.width, shot.height, enemy.x, enemy.y, enemy.size, enemy.size)) {

      player_score += PLAYER_SCORE_MAGNITUDE;


      let next_level = PLAYER_SCORE_MAGNITUDE * game_difficulty * GAME_LEVEL_MAGNITUDE;

      console.log("Next level at: " + next_level);
      
      
      if(player_score >= next_level){
        game_difficulty++;
        let level_update_msg = "Level " + game_difficulty;
        let new_message = generate_message_box(level_update_msg, 1);
        
        messages.push(new_message); 
        
        // console.log("Level " + game_difficulty + " started...");
        // console.log(messages)

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

function detect_player_enemy_collision(player){


  for (let i = enemies.length - 1; i >= 0; i--) {
    let enemy = enemies[i];
    
    // Check for collision between the enemy and the enemy using collideRectRect (comes from collide2d package)
    if (collideRectRect(enemy.x, enemy.y, enemy.size, enemy.size, player.x, player.y, player.size, player.size)) {

      //player_score += PLAYER_SCORE_MAGNITUDE;
      
      crash1.play();
      enemies.splice(i, 1); // Remove the enemy
      break; // Exit the loop
    }
  }
}

function detect_player_powerup_collision(player){


  for (let i = powerups.length - 1; i >= 0; i--) {
    let powerup = powerups[i];
    
    // Check for collision between the enemy and the enemy using collideRectRect (comes from collide2d package)
    if (collideRectRect(powerup.x, powerup.y, powerup.size, powerup.size, player.x, player.y, player.size, player.size)) {

      //player_score += PLAYER_SCORE_MAGNITUDE;
      //powerup1.play();
      blip2.play();
      
      powerups.splice(i, 1); // Remove the enemy
      break; // Exit the loop
    }
  }
}


function animate_projectiles(projectiles, paused = false){
  for (let i = projectiles.length - 1; i >= 0; i--) {

      let shot = projectiles[i];
      let fire_origin = shot.y - player_avatar.height - 10; // -10  is an offset cos you dont want projectile to come out of center of image

      fill(shot.color);
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
      

      // fill("white"); // Set the fill color to the enemy's color      
      // rect(-enemy.size / 2, -enemy.size / 2, enemy.size, enemy.size); // Draw the bounding box
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

function animate_powerups(powerups, paused = false){   

  for (let i = powerups.length - 1; i >= 0; i--) {

    let current = powerups[i];
    
    if(!paused){
      current.y += current.speed; // Move the powerup downwards
    }
         
    //  stroke(255, 0, 0); // Red border color
    //  strokeWeight(2); // Border width
    //  noFill(); // No fill inside the border
    //  rect(current.x, current.y, current.size, current.size);
     image(powerup_img_1, current.x, current.y, current.size, current.size); // Draw the image centered

    // Remove celestials that have moved off the canvas
    if (current.y > height) {
      powerups.splice(i, 1);
      console.log("powerup left the screen")
    }

  }

}

function animate_messages(text_arr, paused = false){

  for (let i = text_arr.length - 1; i >= 0; i--) {
    let msg = text_arr[i];
    

    if (animated_frames_count >= msg.delay) {    
      
      //console.log(msg)
      //textFont(VT323); // this is affecting performance... p5 does NOT like custom fonts, how dumb -_-
      textSize(msg.size);
      fill(msg.color);
      stroke(0);
      strokeWeight(4);
      text(msg.text, msg.x, msg.y);
          
      if(!paused){
        msg.y += msg.speed; // Adjust the speed as needed
      }
      
      // Remove msgs that have moved out of the canvas
       if (msg.y - msg.size >= canvas.height) {
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


