import { random_num, random_rgba, random_hex, rand_arr_select } from '../../utils.js';

function change_star_speed(process_id, new_delay = 0) {
    clearInterval(process_id);
  
    if(new_delay > 0){
      process_id = setInterval(space_flight, new_delay);  
    }
    
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
    change_star_speed,
    select_spawn_point
}