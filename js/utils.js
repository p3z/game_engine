function random_num(floor, ceil){

    return Math.floor(Math.random() * (ceil - floor + 1) + floor);
    
} // end random_num

// Returns an array of rgba color objects
function random_rgba(qty = 1, solid = false){

    let colors = [];

    for(let i = 0; i < qty; i++){

        let color = {};

        let r = random_num(0, 255);
        let g = random_num(0, 255);
        let b = random_num(0, 255);
        let a = random_num(0, 100) / 100;

        let val = (!solid) ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgba(${r}, ${g}, ${b})`;

        colors.push(val);
    }

    return colors;
    
}

function random_hex(with_hash = false){
    const letters = '0123456789ABCDEF';
    let color = with_hash ? '#' : '';
    
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    
    return color;
}

function rand_arr_select(arr){
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
}

function get_percentage(num, percentage){
    return num / 100 * percentage;
}

function reset_view(view) {
    view.innerHTML = "";
}

function stop_audio(audio){
    audio.pause();
    audio.currentTime = 0;
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