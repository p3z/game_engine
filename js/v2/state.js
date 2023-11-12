const origin = -100; // above the top of the canvas so things can animate in
let game_paused = true;
let controller_connected = false;
let game_canvas;
let game_difficulty = 0;
let use_bg_transition = true; 
let player_avatar;
let player_1_spawned = false; // a flag to determine if the player is currently on the canvas

const enemy_angle_obj = {
  min_speed: 3,
  max_speed: 5,
  min_angle: 15, // dont set this to 0, will cause bugs because calculate_rotation_angle will convert small values to 0, which in turn leads to rotations being set to default (ie 0 position origin) which is at odds with the direction of the flight path
  max_angle: 75
};


let enemy_avatar_1;
//let enemy_last_spawned = 0;
let enemy_spawn_interval =  60 * 3; // 60 frames per second (p5 default) * 3 seconds
let player_score = 0;

let scoreboard, lifeboard;

 // used for transitions
let bg_color_index1 = 0;
let bg_color_index2 = 1;
let lerp_amount = 0;

// Initialise object containers. These will hold objects that get translated into elements  on the canvas
let stars = [];
let planets = [];
let projectiles = [];
let enemies = [];

// turn an array of words into an array of message objects ready to use ingame
function initialise_messages(msg_arr){
    
  let messages = [];

  for(let i = 0; i < msg_arr.length; i++){
      let current_msg = msg_arr[i];
      let new_message = generate_message_box(current_msg, i + 1);

      messages.push(new_message);
  }

  return messages;
}

let message_obj = initialise_messages(test_message_arr);


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

function generate_projectile(color){
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

function generate_enemy(size){

    let directions = [
      'left', 'right', 'forwards'
    ];
    let rand_direction = random_num(0, directions.length);

    let enemy_y_speed = random_num(5, 8);
    let enemy_x_speed = random_num(3, 5);
    

    let enemy_obj = {
      x: random(width), 
      y: -size, // spawn it above the canvas
      size: size,
      x_speed: enemy_x_speed,
      y_speed: enemy_y_speed,
      direction: directions[rand_direction]
      //color: rand_arr_select(potential_cols)         
    };
  
    //console.log(enemy_obj)

  return enemy_obj;
  

}

function generate_message_box(text, base_delay){

  let size = 32;
  let delay_factor = 50; // you don't want this to be updated every frame, cos it's imperceptible, so increase the magnitude as needed
  
  let message_obj = {
    text: text,
    x: random_num(200,700), 
    y: origin, // spawn it above the canvas
    size: size ?? 16,
    color: "white",
    speed: 3, //random_num(1, 4) // random speeds = words might be faster than they should
    delay: base_delay * delay_factor
  }

  //console.log(message_obj.delay)

  //console.log(message_obj)

  return message_obj;
}

function pause_play(){
  game_paused = !game_paused;

  if(game_paused){
    pause_canvas_btn.textContent = "Resume";
    stop_audio(backing_track);
  } else {
    pause_canvas_btn.textContent = "Pause";
    backing_track.play();
  }
  //player_1_spawned = false;
}