menu_btn.onclick = () => {
  control_panel.classList.toggle("control-panel-active");
}


start_vert_scroller.onclick = () => {    
    backing_track.play();    
    game_paused = false;
    init_canvas();
    reset_btn.classList.remove("hide");
    test_btn.classList.remove("hide");
    start_vert_scroller.classList.add("hide");
    pause_canvas_btn.classList.remove("hide");
    header_panel.classList.add("hide");
    splash_panel.classList.add("hide");
    let new_message = generate_message_box("Level 1",  1);
    messages.push(new_message);    
};


reset_btn.onclick = () => {
  reset_canvas(game_canvas);
  reset_state();
  glitch1.play();
  stop_audio(backing_track, true);  
}

test_btn.onclick = () => {
  player_1_spawned = !player_1_spawned;
  init_canvas();
}

pause_canvas_btn.onclick = () => {
  pause_game();
  pause.play();
}

function build_ui_element(module){
  let el = document.createElement("img");
    el.classList.add("game-ui-load-element", `game-ui-load-element-${module}`);
    el.setAttribute('src', './img/cartridge1.png');
    header_panel.appendChild(el);
}

function init_play_contruct(){

  let modules = Object.keys(GAME_ENGINE_MODULES);

  modules.forEach( module => {
      switch(module){
          case 'vert_scroller':
            build_ui_element(module);
          break;

          default:
            console.log("That module does not exist");
      }
  });

}

init_play_contruct();