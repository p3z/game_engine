import { random_num, random_rgba, random_hex, rand_arr_select } from './utils.js';
import { spawn_quad_shape, spawn_tri, spawn_ellipse  } from './game_engine_modules/shapes.js';
import { spawn_test_player  } from './game_engine_modules/players.js';
import { change_star_speed, select_spawn_point  } from './game_engine_modules/vert_scroller/environment.js';
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
} from './game_engine_modules/vert_scroller/settings.js';

var star_interval; // global handle for the setInterval controlling star creation

const main_view = document.querySelector(".main_view");


function clear_view(){
  main_view.innerHTML = "";
  change_star_speed(star_interval);
  main_view.classList.remove("pws-gradient-animation");

}




function create_stars(qty = 1, possible_cols = ["yellow"]){
  
    for(let i = 0; i <= qty; i++){

      let new_star = document.createElement("div");
      new_star.classList.add("bg-star");
      new_star.style.top = `-100px`; // above top of viewport - 100 so enters smoothly
      new_star.style.left = select_spawn_point(main_view).x_loc;
      new_star.style.background = rand_arr_select(possible_cols);


      //box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
      let star_size = random_num(MIN_STAR_SIZE, MAX_STAR_SIZE);


      new_star.style.width = `${star_size}px`;
      new_star.style.height = `${star_size}px`;

      let star_distance = random_num(1000, 4000); // determine how far away star appears (the larger the number, the slower the star appears to go by)

      main_view.appendChild(new_star);

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

function create_planet(possible_cols = ["red"]){
  let new_planet = document.createElement("div");
      new_planet.classList.add("bg-planet");
      
      new_planet.style.top = `-100px`; // above top of viewport - 100 so enters smoothly
      new_planet.style.left = select_spawn_point(main_view).x_loc;
      
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

  main_view.appendChild(new_planet);

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

function space_flight(speed){

  // Add more stars periodically (adjust the interval as needed)
  star_interval = setInterval( () => {
    
    let qty = random_num(0, 30); // decide how many stars to spawn this cycle
    let current_sparsity = random_num(0, MAX_STAR_SPARSITY); // decide if we're going to spawn them this cyle

    if(current_sparsity <= PLANET_PASSING_THRESHOLD){
      create_planet(PLANET_COLORS);
      return;
    }

    if(current_sparsity > 50){
      let star_count = document.getElementsByClassName("bg-star").length;
     // console.log("Star count: " + star_count)

        // Check if adding `qty` stars won't exceed the threshold
      if (star_count + qty < MAX_STAR_THRESHOLD) {
        star_count += qty;
        create_stars(qty, STAR_COLORS);
      } else {
        // If adding `qty` stars would exceed the threshold, create fewer stars
        const available_space = MAX_STAR_THRESHOLD - star_count;
        star_count += available_space;
        create_stars(available_space, STAR_COLORS);
      }
      
    }

    
    
  }, speed);

 
}



function init_vert_scroller(){
  const run_test_btn = document.querySelector('.run_test');
  const clear_view_btn = document.querySelector('.clear_view');

  run_test_btn.onclick = () => {

    main_view.classList.add("pws-gradient-animation");

      //let rand_color = random_rgba();
      let avatar_img = "./img/rocket-icon-wht.png";
      let avatar = spawn_test_player(main_view, "transparent", avatar_img, );      
      main_view.appendChild(avatar);

      // let test_stars = create_stars(5);

      // console.log(test_stars)
      space_flight(DEFAULT_SPEED);



  } // end click handler

  clear_view_btn.onclick = clear_view;
}





export { init_vert_scroller, main_view };