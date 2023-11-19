function generate_game_object(){

}

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
 
 
 let message_obj = {
   text: text,
   x: random_num(MESSAGES_X_LOWER_BOUND, MESSAGES_X_UPPER_BOUND), // where on the x axis do we want to spawn it?
   y: origin, // spawn it above the canvas
   size: size ?? 32,
   color: "#fff",
   speed: 6, // dont use random speeds = words might be faster than they should
   delay: base_delay * MESSAGES_DELAY_FACTOR // you don't want this to be updated every frame, cos it's imperceptible, so increase the magnitude as needed
 }

 //console.log(message_obj)

 return message_obj;
}
