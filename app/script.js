const main_view = document.querySelector(".main_view");
const run_test_btn = document.querySelector('.run_test');
const clear_view_btn = document.querySelector('.clear_view');

function random_num(floor, ceil){

    return Math.floor(Math.random() * (ceil - floor + 1) + floor);
    
} // end random_num

// Returns an array of rgba color objects
function random_rgba(qty = 1){

    let colors = [];

    for(let i = 0; i < qty; i++){

        let color = {};

        let r = random_num(0, 255);
        let g = random_num(0, 255);
        let b = random_num(0, 255);
        let a = random_num(0, 100) / 100;

        let val = `rgba(${r}, ${g}, ${b}, ${a})`;

        colors.push(val);
    }

    return colors;
    
}

function clear_view(){
  main_view.innerHTML = "";
}

function select_spawn_point(location = []){
  let view_width = main_view.clientWidth;
  let view_height = main_view.clientHeight;
  
  
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
  
  
  return {
    x_loc: x_loc,
    y_loc: y_loc
  }
}

// 4 sided shape
function spawn_quad_shape(color = "", size = []){
  
    let new_quad = document.createElement("div");
    let view_width = main_view.clientWidth;
    let view_height = main_view.clientHeight;
  
  // Initialise 
    let quad_size_w = random_num(100, 150);
    let quad_size_h = random_num(100, 150);
  
    if( random_num(0, 100) > 75 ){
        // Create a square
        quad_size_h = quad_size_w
     } // else it's a rec
  
     switch(size.length){         
       case 1: // only 1 size specified, use for both
         quad_size_w = size[0];
         quad_size_h = size[0];
         break;
         
       case 2: // size has been explicitly set in correct format
         quad_size_w = size[0];
         quad_size_h = size[1];
         break;
         
       // no need for default -> we initialised size with default values
         
     }
  
  // console.log("Setting size: ");
  // console.log(quad_size_w, quad_size_h)
 
    
  
     // new_sq.style.width = (view_width / size) + "px";
     // new_sq.style.height =  (view_height / size) + "px";
    new_quad.style.width = `${quad_size_w}px`;
    new_quad.style.height = `${quad_size_h}px`;
  
     
     new_quad.style.backgroundColor = color;
     new_quad.classList.add("shape");
  
     return new_quad;
}

function spawn_tri(color = "", type = "equal", size = []){
  
    let new_tri = document.createElement("div");
    let view_width = main_view.clientWidth;
    let view_height = main_view.clientHeight;
  
  // todo: add options for diff. types
//     switch(type){         
//       case "equal":
//       case "iso":
//       case "scal":
//       case: "rand:
//       default: 
         let size1 = random_num(20, 100);
         let size2 = size1 * 2;  
         let rotation = random_num(0, 360);
        
        
        
//     }
  
     
  
     new_tri.style.borderLeft = `${size1}px solid transparent`;
     new_tri.style.borderRight = `${size1}px solid transparent`;
     new_tri.style.borderBottom = `${size2}px solid ${color}`;
     new_tri.style.transform = `rotate(${rotation}deg)`;
  
  // console.log("Size 1: " + size1)
  //   console.log("Size 2: " + size2)
  
     
  
     new_tri.classList.add("shape", "triangle");  
     return new_tri;
}

function spawn_ellipse(color = "", size = []){
    let ellipse = spawn_quad_shape(color);
    ellipse.style.borderRadius = "50%";
    return ellipse;
}

function spawn_test_player(color, size = []){
    let old_avatar = document.querySelector(".player-avatar");
  
    if(old_avatar){
       old_avatar.remove();
    }
  
    let new_avatar = spawn_quad_shape(color, [50]);
    new_avatar.classList.add("player-avatar");
    let view_width = main_view.clientWidth;
    let view_height = main_view.clientHeight;
    let spawn_loc = [view_width / 2, view_height / 2];
  
    let spawn_point = select_spawn_point();  
    let { x_loc, y_loc } = select_spawn_point(spawn_loc);
    
    
    
     new_avatar.style.left = `${x_loc}px`;
     new_avatar.style.top = `${y_loc}px`;
  
  attach_player_handler(new_avatar)
    return new_avatar;
  
}

function attach_player_handler(player){

    player.onmouseover = () => {
        document.addEventListener('mousemove', (e) => movePlayer(e, player));

    };

    player.onmouseout = () => {
        document.removeEventListener('mousemove', movePlayer);
    };
  
    player.onclick = (e) => {
        e.currentTarget.remove();
    };
}

function movePlayer(event, player) {
    // Update the position of the player div to follow the mouse cursor
    player.style.left = (event.clientX - player.offsetWidth / 2) + 'px';
    player.style.top = (event.clientY - player.offsetHeight / 2) + 'px';
}
    



run_test_btn.onclick = () => {
  let rand_color = random_rgba();
  // let square = spawn_quad_shape(rand_color);
  // let triangle = spawn_tri(rand_color);
  // let circle = spawn_ellipse(rand_color);
  let avatar = spawn_test_player(rand_color);
  //let test_spawn_point = [119, 124];
  main_view.appendChild(avatar);
 

}

clear_view_btn.onclick = clear_view;

