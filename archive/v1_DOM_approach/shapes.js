import { random_num, random_rgba, random_hex, rand_arr_select } from '../utils.js';

// 4 sided shape
function spawn_quad_shape(view, color = "", size = [], background = ""){
  
    let new_quad = document.createElement("div");
    let view_width = view.clientWidth;
    let view_height = view.clientHeight;
  
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

     if(background != ""){
      new_quad.style.backgroundImage = "url('" + background + "')";
     }
  
     return new_quad;
}

function spawn_tri(color = "", type = "equal", size = []){
  
    let new_tri = document.createElement("div");
    let view_width = view.clientWidth;
    let view_height = view.clientHeight;
  
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

export { spawn_quad_shape, spawn_tri, spawn_ellipse };