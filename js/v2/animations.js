

function animate_celestials(celestials){   

    for (let i = celestials.length - 1; i >= 0; i--) {

      let current = celestials[i];            
      current.y += current.speed; // Move the celestial downwards

      fill(current.color); // Set the fill color to the celestial's color
      noStroke();            
      ellipse(current.x, current.y, current.size, current.size); // Draw the celestial

      // Remove celestials that have moved off the canvas
      if (current.y > height + current.size / 2) {
        celestials.splice(i, 1);
      }

    }

}

function animate_projectiles(projectiles){
  for (let i = projectiles.length - 1; i >= 0; i--) {

      let shot = projectiles[i];
      let fire_origin = shot.y - player_avatar.height;

      fill(shot.color); // Set the fill color to the celestial's color
      noStroke(); 
      ellipse(shot.x, fire_origin, shot.width, shot.height);

      // Move the shot upwards
      shot.y -= 15; // Adjust the speed as needed

      // Remove circles that have moved out of the canvas
      if (shot.y + shot.diameter / 2 < 0) {
        projectiles.splice(i, 1);
      }
  }
}

function animate_enemies(enemies){
  for (let i = enemies.length - 1; i >= 0; i--) {

    let enemy = enemies[i];
    let enemy_origin = enemy.y - player_avatar.height;

    fill("red"); // Set the fill color to the celestial's color
    noStroke(); 
    //ellipse(enemy.x, enemy_origin, enemy.size, enemy.size);
    image(enemy_avatar_1, enemy.x, enemy.y, enemy.size, enemy.size);
        
    enemy.y += enemy.speed; // Adjust the speed as needed


    // Remove enemies that have moved out of the canvas
    if (enemy.y + enemy.diameter / 2 < 0) {
      enemies.splice(i, 1);
    }
}
}

function transition_background(lerp_amount, colors = []){

  let c1 = color(colors[bg_color_index1]);
  let c2 = color(colors[bg_color_index2]);        
  let lerped_color = lerpColor(c1, c2, lerp_amount);

  background(lerped_color);
  
}

