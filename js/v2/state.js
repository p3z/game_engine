const origin = -100; // above the top of the canvas so things can animate in
let run_animation = true; // a flag to isolate whether animations are runing or not

let player_avatar;
let player_1_spawned = false; // a flag to determine if the player is currently on the canvas

let enemy_avatar_1;
let enemy_last_spawned = 0;
let enemy_spawn_interval =  60 * 3; // 60 frames per second (p5 default) * 3 seconds


let bg_color_index1 = 0;
let bg_color_index2 = 1;
let lerp_amount = 0;

// Initialise object containers. These will hold objects that get translated into elements  on the canvas
let stars = [];
let planets = [];
let projectiles = [];
let enemies = [];

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

    let enemy_obj = {
      x: random(width), 
      y: -size, // spawn it above the canvas
      size: size,
      speed: random_num(5, 8),
      //color: rand_arr_select(potential_cols)         
    };
  
    //console.log(enemy_obj)

  return enemy_obj;
  

}