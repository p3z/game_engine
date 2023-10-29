var star_interval; // global handle for the setInterval controlling star creation
const MAX_STAR_THRESHOLD = 100;
const MIN_STAR_SIZE = 1;
const MAX_STAR_SIZE = 8;
const MIN_PLANET_SIZE = 20;
const MAX_PLANET_SIZE = 50;
const MAX_STAR_SPARSITY = 100;
const DEFAULT_SPEED = random_num(100, 500);
const PLANET_PASSING_THRESHOLD = 3; // out of 100 stars, this is the % chance it'll be a planet instead (3% is the usual setting)
const STAR_COLORS = [
  '#FFFFFF', // white
  '#FFFFCC', // pale yellow
  '#FFFF99', // light yellow
  '#FFFF66', // yellow
  '#E6E6E6', // light gray
  '#CCCCCC', // gray
  '#99CCFF', // light blue
  '#66CCFF', // blue
  '#FF99CC', // light pink
  '#FF66CC'  // pink
];

const PLANET_COLORS = [
  "#F0A1A1", // Pinkish
  "#A1F0A1", // Greenish
  "#A1A1F0", // Bluish
  "#F0F0A1", // Yellowish
  "#DAA520"  // Goldenrod
];



function clear_view(){
  main_view.innerHTML = "";
  change_star_speed(star_interval);
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

function spawn_test_player(color, size = []){
    let old_avatar = document.querySelector(".player-avatar");
  
    if(old_avatar){
       old_avatar.remove();
    }
  
    let test_img = "./img/rocket-icon-wht.png";
    let new_avatar = spawn_quad_shape(color, [50], test_img);
    new_avatar.classList.add("player-avatar");

    const backgroundImage = new Image();

    backgroundImage.src = test_img;
    backgroundImage.onload = function() {
      new_avatar.style.backgroundImage = "url('" + test_img + "')";
    };
    
    let view_width = main_view.clientWidth;
    let view_height = main_view.clientHeight;
    let spawn_loc = [view_width / 2, view_height / 2]; 
    let { x_loc, y_loc } = select_spawn_point(spawn_loc);
    
     new_avatar.style.left = `${x_loc}px`;
     new_avatar.style.top = `${y_loc}px`;
  
  attach_player_handler(new_avatar)
  return new_avatar;
  
}

function attach_player_handler(player){

    player.onmouseover = () => {
        document.addEventListener('mousemove', (e) => move_player(e, player));
    };

    player.onmouseout = () => {
        document.removeEventListener('mousemove', move_player);
    };
  
    player.onclick = (e) => {
        //e.currentTarget.remove();
        shoot_projectile(e);

        anime({
          targets: e.target,
          rotate: [
              { value: '-5deg', duration: 100 },
              { value: '5deg', duration: 200 },
              { value: '-5deg', duration: 300 },
              { value: '0deg', duration: 0 },
          ],
          scale: [
              { value: 1.2, duration: 150 },
              { value: 0.8, duration: 150 },
              // { value: 1.1, duration: 150 },
              // { value: 1.0, duration: 150 }
          ],
          easing: 'easeInOutQuad',
          direction: 'alternate', // Reverses the animation on each iteration
      });
        
       
    };

    let clickTimer;
    const clickThreshold = 500; // Adjust the threshold in milliseconds

    player.onmousedown = () => {
      clickTimer = setTimeout(() => {
        // This code will execute when a continuous click or hold is detected
        //console.log('Mouse click or hold detected');
        //change_star_speed(star_interval, 300)
      }, clickThreshold);
    };

    player.onmouseup = () => {
      // Clear the timer when the mouse button is released
      //console.log("Click released")
      //change_star_speed(star_interval, DEFAULT_SPEED)
      clearTimeout(clickTimer);
    };
}

function move_player(event, player) {
    // Update the position of the player div to follow the mouse cursor
    player.style.left = (event.clientX - player.offsetWidth / 2) + 'px';
    player.style.top = (event.clientY - player.offsetHeight / 2) + 'px';
}

function shoot_projectile(e){
  

  const projectile = document.createElement('div');
  projectile.className = 'projectile-fire';

   // Set the initial position to the click location
   projectile.style.left = e.clientX + 'px';
   projectile.style.top = e.clientY + 'px';

    // Add the div to the DOM
    main_view.appendChild(projectile);


    // Calculate the delay for the explosion animation
    const delay = window.innerHeight / 1000; // Adjust as needed

       
    // Define the projectile animation
    const projectileAnimation = anime({
        targets: projectile,
        translateY: -window.innerHeight - 20, // Animate it upwards outside the viewport
        duration: 500, // Adjust the duration as needed,
        easing: 'linear',
        autoplay: false, // Pause the animation initially
        complete: function() {
            // Remove the div when it's outside the viewport
            projectile.remove();
        }
    });

      // Define an explosion animation just before it reaches the top
      const explosionAnimation = anime({
          targets: projectile,
          scale: 5, // Increase the size to simulate an explosion
          duration: 300, // Adjust the duration as needed
          autoplay: false, // Pause the animation initially
          delay: delay,
          begin: function() {
              // Start the projectile animation when the explosion begins
              projectileAnimation.play();
          }
      });

      // Play the explosion animation
      explosionAnimation.play();

  


  return projectile;
}

function create_stars(qty = 1, possible_cols = ["yellow"]){
  
    for(let i = 0; i <= qty; i++){

      let new_star = document.createElement("div");
      new_star.classList.add("bg-star");
      new_star.style.top = `-100px`; // above top of viewport - 100 so enters smoothly
      new_star.style.left = select_spawn_point().x_loc;
      new_star.style.background = rand_arr_select(possible_cols);


      //box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
      let star_size = random_num(MIN_STAR_SIZE, MAX_STAR_SIZE);


      new_star.style.width = `${star_size}px`;
      new_star.style.height = `${star_size}px`;

      let star_distance = random_num(1000, 4000); // determine how far away star appears (the larger the number, the slower the star appears to go by)

      main_view.appendChild(new_star);

      anime({
        targets: new_star,
        top: `${window.innerHeight + 100}px `, // Animate to the bottom of the viewport
        duration: star_distance, // Animation duration in milliseconds
        easing: 'linear', // Linear animation for a smooth vertical transition
        complete: function(anim) {
          // Remove the star when the animation is complete
          new_star.remove();
        }
      });

      


    } // end loop
    
}

function generate_pattern(bg_color1, bg_color2){
  
  // more patterns to be defined: source (https://www.magicpattern.design/tools/css-backgrounds), probs a better way to do this
  let pattern1 = `repeating-linear-gradient(to right, #${bg_color1}, #${bg_color1} 1.2000000000000002px, #${bg_color2} 1.2000000000000002px, #${bg_color2})`;
  let pattern2 = `repeating-linear-gradient(45deg, #${bg_color1} 25%, transparent 25%, transparent 75%, #${bg_color1} 75%, #${bg_color1}), repeating-linear-gradient(45deg, #${bg_color1} 25%, #${bg_color2} 25%, #${bg_color2} 75%, #${bg_color1} 75%, #${bg_color1})`;
  let pattern3 = `linear-gradient(30deg, #${bg_color1} 12%, transparent 12.5%, transparent 87%, #${bg_color1} 87.5%, #${bg_color1}), linear-gradient(150deg, #${bg_color1} 12%, transparent 12.5%, transparent 87%, #${bg_color1} 87.5%, #${bg_color1}), linear-gradient(30deg, #${bg_color1} 12%, transparent 12.5%, transparent 87%, #${bg_color1} 87.5%, #${bg_color1}), linear-gradient(150deg, #${bg_color1} 12%, transparent 12.5%, transparent 87%, #${bg_color1} 87.5%, #${bg_color1}), linear-gradient(60deg, #${bg_color2} 25%, transparent 25.5%, transparent 75%, #${bg_color2} 75%, #${bg_color2}), linear-gradient(60deg, #${bg_color2} 25%, transparent 25.5%, transparent 75%, #${bg_color2} 75%, #${bg_color2})`;

  let patterns = [
    pattern1, pattern2, pattern3
  ];

  let selected_pattern = rand_arr_select(patterns);

  let pattern_obj = {
    bg_color1: bg_color1,
    bg_color2: bg_color2,
    //opacity: random_num(0.1, 1),
    size: random_num(5, 15),
    pattern: selected_pattern
  };

  //console.log(pattern_obj)

  return pattern_obj;
  
}
function create_planet(possible_cols = ["red"]){
  let new_planet = document.createElement("div");
      new_planet.classList.add("bg-planet");
      
      new_planet.style.top = `-100px`; // above top of viewport - 100 so enters smoothly
      new_planet.style.left = select_spawn_point().x_loc;
      
      let planet_pattern = generate_pattern(random_hex(), random_hex());
      if( random_num(0, 100) < 30){
        new_planet.style.background = rand_arr_select(possible_cols);
      } else {
        if(random_num(0, 1) == 1){
          new_planet.classList.add("rotate-clockwise");
        } else {
          new_planet.classList.add("rotate-anti-clock");
        }
        new_planet.style.backgroundColor = rand_arr_select(PLANET_COLORS);
        //new_planet.style.opacity = planet_pattern.opacity;
        new_planet.style.backgroundSize = `${planet_pattern.size}px ${planet_pattern.size}px`;
        new_planet.style.backgroundImage = planet_pattern.pattern;
        new_planet.style.backgroundPosition = "0 0, 12px 12px"
      }
  

  let size = random_num(MIN_PLANET_SIZE, MAX_PLANET_SIZE);
    new_planet.style.width = `${size}px`;
    new_planet.style.height = `${size}px`;

  let distance = random_num(3000, 4000); // determine how far away star appears (the larger the number, the slower the star appears to go by)

  main_view.appendChild(new_planet);

  anime({
    targets: new_planet,
    top: `${window.innerHeight + 100}px `, // Animate to the bottom of the viewport
    duration: distance, // Animation duration in milliseconds
    easing: 'linear', // Linear animation for a smooth vertical transition
    complete: function(anim) {
      // Remove the star when the animation is complete
      new_planet.remove();
    }
  });
}

function space_flight(speed){

  // Add more stars periodically (adjust the interval as needed)
  star_interval = setInterval( () => {
    
    let qty = random_num(0, 30); // decide how many stars to spawn this cycle
    let current_sparsity = random_num(0, MAX_STAR_SPARSITY); // decide if we're going to spawn them this cyle

    if(current_sparsity <= PLANET_PASSING_THRESHOLD){
      create_planet(PLANET_COLORS);
      return;
    }

    if(current_sparsity > 50){
      let star_count = document.getElementsByClassName("bg-star").length;
     // console.log("Star count: " + star_count)

        // Check if adding `qty` stars won't exceed the threshold
      if (star_count + qty < MAX_STAR_THRESHOLD) {
        star_count += qty;
        create_stars(qty, STAR_COLORS);
      } else {
        // If adding `qty` stars would exceed the threshold, create fewer stars
        const available_space = MAX_STAR_THRESHOLD - star_count;
        star_count += available_space;
        create_stars(available_space, STAR_COLORS);
      }
      
    }

    
    
  }, speed);

 
}

function change_star_speed(process_id, new_delay = 0) {
  clearInterval(process_id);

  if(new_delay > 0){
    process_id = setInterval(space_flight, new_delay);  
  }
  
}









run_test_btn.onclick = () => {
  let rand_color = random_rgba();
  // let square = spawn_quad_shape(rand_color);
  // let triangle = spawn_tri(rand_color);
  // let circle = spawn_ellipse(rand_color);
  let avatar = spawn_test_player("transparent");
  //let test_spawn_point = [119, 124];
  main_view.appendChild(avatar);

  // let test_stars = create_stars(5);

  // console.log(test_stars)
  space_flight(DEFAULT_SPEED);



}

clear_view_btn.onclick = clear_view;

