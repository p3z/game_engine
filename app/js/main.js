import { random_num, random_rgba, random_hex, rand_arr_select } from './utils.js';
import { spawn_quad_shape, spawn_tri, spawn_ellipse  } from './game_engine_modules/shapes.js';
import { spawn_test_player, set_element_state, DEFAULT_PLAYER_LIVES, DEFAULT_PLAYER_SCORE  } from './game_engine_modules/players.js';
import { create_stars, change_star_speed, create_planet, select_spawn_point  } from './game_engine_modules/vert_scroller/environment.js';
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
var main_view_DOM_size; // global handle describing the no. elements inside main_view
const scoreboard = document.querySelector(".scoreboard");
const lifeboard = document.querySelector(".lifeboard");
const lifeboard_avatar =  document.querySelector(".lifeboard-avatar");

const main_view = document.querySelector(".main_view");
const score_element = document.querySelector('.js-score');
const life_element = document.querySelector('.js-lives');
const backing_track = document.querySelector('.js-backing-track');


var player_score = DEFAULT_PLAYER_SCORE;
var player_lives = DEFAULT_PLAYER_LIVES;

function check_DOM_size(element, label){

    if (element) {
      const child_elements = element.children.length;
      console.log(child_elements + " elements inside " + label)
    } else {
      console.log("Error with selected DOM element");
    }
  
}

function stop_audio(audio){
  audio.pause();
  audio.currentTime = 0;
  

}

function reset_values(){
  player_score = DEFAULT_PLAYER_SCORE;
  player_lives = DEFAULT_PLAYER_LIVES;
}


function reset_view(){
  main_view.innerHTML = "";
  ui_toggle(false);
  reset_values();
  set_element_state(player_score, score_element, player_score);
  set_element_state(player_lives, life_element, player_lives);
  change_star_speed(star_interval);
  main_view.classList.remove("pws-gradient-animation");
  stop_audio(backing_track);
  clearInterval(main_view_DOM_size);
  console.log("Run stopped");
}




function space_flight(speed){

  // Add more stars periodically (adjust the interval as needed)
  star_interval = setInterval( () => {
    
    let qty = random_num(0, 30); // decide how many stars to spawn this cycle
    let current_sparsity = random_num(0, MAX_STAR_SPARSITY); // decide if we're going to spawn them this cyle

    if(current_sparsity <= PLANET_PASSING_THRESHOLD){
      create_planet(main_view, PLANET_COLORS);
      return;
    }

    if(current_sparsity > 50){
      let star_count = document.getElementsByClassName("bg-star").length;
     // console.log("Star count: " + star_count)

        // Check if adding `qty` stars won't exceed the threshold
      if (star_count + qty < MAX_STAR_THRESHOLD) {
        star_count += qty;
        create_stars(main_view, qty, STAR_COLORS);
      } else {
        // If adding `qty` stars would exceed the threshold, create fewer stars
        const available_space = MAX_STAR_THRESHOLD - star_count;
        star_count += available_space;
        create_stars(main_view, available_space, STAR_COLORS);
      }
      
    }

    
    
  }, speed);

 
}

function ui_toggle(show_ui=true){
  if(show_ui){
    scoreboard.style.display = "flex";
    lifeboard.style.display = "flex";
    scoreboard.classList.remove("hide");
    lifeboard.classList.remove("hide");
    lifeboard_avatar.classList.remove("hide");
  } else {
    scoreboard.style.display = "none";
    lifeboard.style.display = "none";
    scoreboard.classList.add("hide");
    lifeboard.classList.add("hide");
    lifeboard_avatar.classList.add("hide");
  }
}



function init_vert_scroller(){
  const run_test_btn = document.querySelector('.js-run_test');
  const reset_btn = document.querySelector('.js-reset');
  const test_btn  = document.querySelector('.js-test');


  run_test_btn.onclick = () => {

    main_view_DOM_size = setInterval( () => {
      check_DOM_size(main_view, "main view container");
    }, 300);


    reset_values();

    clearInterval(star_interval); // make sure to clear this, starting from scratch via space_flight() otherwise you end up with bugs
    set_element_state(player_score, score_element, player_score);
    set_element_state(player_lives, life_element, player_lives);
    ui_toggle();

    backing_track.play();

    main_view.classList.add("pws-gradient-animation");
    

    //let rand_color = random_rgba();
    let avatar_img = "./img/rocket-icon-wht.png";
    let avatar = spawn_test_player(main_view, "transparent", avatar_img, );      
    main_view.appendChild(avatar);
    
    space_flight(DEFAULT_SPEED);



  } // end click handler

  test_btn.onclick = () => {
    player_score++;
    player_lives++;
    set_element_state(player_score, score_element, player_score * 100);
    set_element_state(player_lives, life_element, player_lives);    
    
  }

  reset_btn.onclick = reset_view;
}





export { init_vert_scroller, main_view };