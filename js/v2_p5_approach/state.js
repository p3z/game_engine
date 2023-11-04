const origin = -100; // above the top of the canvas so things can animate in
const player_avatar_size = 50;
let run_animation = true; // a flag to isolate whether animations are runing or not

let player_avatar;
let player_1_spawned = false; // a flag to determine if the player is currently on the canvas

let bg_color_index1 = 0;
let bg_color_index2 = 1;
let lerp_amount = 0;

// Initialise object containers. These will hold objects that get translated into elements  on the canvas
let stars = [];
let planets = [];
let projectiles = [];