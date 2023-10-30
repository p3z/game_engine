import { random_num, random_rgba, random_hex, rand_arr_select } from '../../utils.js';
import {
  MAX_STAR_THRESHOLD,
  MIN_STAR_SIZE,
  MAX_STAR_SIZE,
  MIN_PLANET_SIZE,
  MAX_PLANET_SIZE,
  MAX_STAR_SPARSITY,
  DEFAULT_SPEED,
  PLANET_PASSING_THRESHOLD,
  STAR_COLORS,
  PLANET_COLORS
} from './settings.js';

function shimmer(star) {
  let should_shimmer = random_num(0, 100);

  if(should_shimmer < 30){
    // immediately toggling it on and off creats a strobe light lol, so do it occasionally instead
    star.classList.toggle('star-shimmer');
  }

  
}


function create_stars(view, qty = 1, possible_cols = ["yellow"]){
  
  for(let i = 0; i <= qty; i++){

    let new_star = document.createElement("div");
    new_star.classList.add("bg-star");
    new_star.style.top = `-100px`; // above top of viewport - 100 so enters smoothly
    new_star.style.left = select_spawn_point(view).x_loc;
    new_star.style.background = rand_arr_select(possible_cols);


    //box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
    let star_size = random_num(MIN_STAR_SIZE, MAX_STAR_SIZE);


    new_star.style.width = `${star_size}px`;
    new_star.style.height = `${star_size}px`;

    let star_distance = random_num(1000, 4000); // determine how far away star appears (the larger the number, the slower the star appears to go by)

    // decide if star is shimmering
    let shimmer_chance = random_num(0, 100);
    if(shimmer_chance < 3 ){     

      setInterval(() => {
        shimmer(new_star);
      }, 150); // no need to clear this cos the element gets removed later

      console.log("Star shimmering")
    }

    view.appendChild(new_star);

    anime({
      targets: new_star,
      top: `${window.innerHeight + 100}px `, // Animate to the bottom of the viewport
      duration: star_distance, // Animation duration in milliseconds
      easing: 'linear', // Linear animation for a smooth vertical transition
      complete: function(anim) {        
        // Remove the star when the animation is complete
        new_star.remove();
      }
    });

  } // end loop
  
}

function change_star_speed(process_id, new_delay = 0) {
    clearInterval(process_id);
  
    if(new_delay > 0){
      process_id = setInterval(space_flight, new_delay);  
    }
    
}

function generate_pattern(bg_color1, bg_color2){
  
  // more patterns to be defined: source (https://www.magicpattern.design/tools/css-backgrounds), probs a better way to do this
  let pattern1 = `repeating-linear-gradient(to right, #${bg_color1}, #${bg_color1} 1.2000000000000002px, #${bg_color2} 1.2000000000000002px, #${bg_color2})`;
  let pattern2 = `repeating-linear-gradient(45deg, #${bg_color1} 25%, transparent 25%, transparent 75%, #${bg_color1} 75%, #${bg_color1}), repeating-linear-gradient(45deg, #${bg_color1} 25%, #${bg_color2} 25%, #${bg_color2} 75%, #${bg_color1} 75%, #${bg_color1})`;
  let pattern3 = `linear-gradient(30deg, #${bg_color1} 12%, transparent 12.5%, transparent 87%, #${bg_color1} 87.5%, #${bg_color1}), linear-gradient(150deg, #${bg_color1} 12%, transparent 12.5%, transparent 87%, #${bg_color1} 87.5%, #${bg_color1}), linear-gradient(30deg, #${bg_color1} 12%, transparent 12.5%, transparent 87%, #${bg_color1} 87.5%, #${bg_color1}), linear-gradient(150deg, #${bg_color1} 12%, transparent 12.5%, transparent 87%, #${bg_color1} 87.5%, #${bg_color1}), linear-gradient(60deg, #${bg_color2} 25%, transparent 25.5%, transparent 75%, #${bg_color2} 75%, #${bg_color2}), linear-gradient(60deg, #${bg_color2} 25%, transparent 25.5%, transparent 75%, #${bg_color2} 75%, #${bg_color2})`;

  let patterns = [
    pattern1, pattern2, pattern3
  ];

  let selected_pattern = rand_arr_select(patterns);

  let pattern_obj = {
    bg_color1: bg_color1,
    bg_color2: bg_color2,
    //opacity: random_num(0.1, 1),
    size: random_num(5, 15),
    pattern: selected_pattern
  };

  //console.log(pattern_obj)

  return pattern_obj;
  
}


function create_planet(view, possible_cols = ["red"]){
  let new_planet = document.createElement("div");
      new_planet.classList.add("bg-planet");
      
      new_planet.style.top = `-100px`; // above top of viewport - 100 so enters smoothly
      new_planet.style.left = select_spawn_point(view).x_loc;
      
      let planet_pattern = generate_pattern(random_hex(), random_hex());
      if( random_num(0, 100) < 30){
        new_planet.style.background = rand_arr_select(possible_cols);
      } else {
        if(random_num(0, 1) == 1){
          new_planet.classList.add("rotate-clockwise");
        } else {
          new_planet.classList.add("rotate-anti-clock");
        }
        new_planet.style.backgroundColor = rand_arr_select(PLANET_COLORS);
        //new_planet.style.opacity = planet_pattern.opacity;
        new_planet.style.backgroundSize = `${planet_pattern.size}px ${planet_pattern.size}px`;
        new_planet.style.backgroundImage = planet_pattern.pattern;
        new_planet.style.backgroundPosition = "0 0, 12px 12px"
      }
      
  

  let size = random_num(MIN_PLANET_SIZE, MAX_PLANET_SIZE);
    new_planet.style.width = `${size}px`;
    new_planet.style.height = `${size}px`;

  let distance = random_num(3000, 4000); // determine how far away star appears (the larger the number, the slower the star appears to go by)

  view.appendChild(new_planet);

  anime({
    targets: new_planet,
    top: `${window.innerHeight + 100}px `, // Animate to the bottom of the viewport
    duration: distance, // Animation duration in milliseconds
    easing: 'linear', // Linear animation for a smooth vertical transition
    complete: function(anim) {
      // Remove the star when the animation is complete
      new_planet.remove();
    }
  });
}

function select_spawn_point(view, location = []){
    let view_width = view.clientWidth;
    let view_height = view.clientHeight;
    
    
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

    let spawn_point = {
      x_loc: x_loc,
      y_loc: y_loc
    };
    
    //console.log(spawn_point)
    
    return spawn_point;
  }

export {
    create_stars,
    change_star_speed,
    create_planet,
    select_spawn_point
}