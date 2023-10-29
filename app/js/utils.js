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