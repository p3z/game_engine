function generate_celestial(type){

    let size, potential_cols;

    switch(type){
      case 'planet':
      size = random_num(MIN_PLANET_SIZE, MAX_PLANET_SIZE);
      potential_cols = PLANET_COLORS;    
      break;

      case 'star':
      default: 
      size = random_num(MIN_STAR_SIZE, MAX_STAR_SIZE);
      potential_cols = STAR_COLORS;        

    }

    
    
    let celestial_obj = {
        x: random(width), 
        y: -size, // spawn it above the canvas
        size: size,
        speed: random_num(0, 10),
        color: rand_arr_select(potential_cols)         
      };
      

      return celestial_obj;

  }

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

  function spawn_projectile(color){
    // Create a new circle at the mouse click location
    let shot = {
      x: mouseX,
      y: mouseY,
      height: 80,
      width: 5,
      color: color
    };

    // Add the new circle to the array
    projectiles.push(shot);

  }


  function transition_background(lerp_amount, colors = []){

    let c1 = color(colors[bg_color_index1]);
    let c2 = color(colors[bg_color_index2]);        
    let lerped_color = lerpColor(c1, c2, lerp_amount);

    background(lerped_color);
    
  }