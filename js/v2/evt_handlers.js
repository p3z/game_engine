menu_btn.onclick = () => {
  control_panel.classList.toggle("control-panel-active");
}

run_test_btn.onclick = () => {
    backing_track.play();    
    game_paused = false;
    init_canvas();
    reset_btn.classList.remove("hide");
    test_btn.classList.remove("hide");
    run_test_btn.classList.add("hide");
    pause_canvas_btn.classList.remove("hide");
};


reset_btn.onclick = () => {
  reset_canvas(game_canvas);
  reset_state();
  stop_audio(backing_track, true);
}

test_btn.onclick = () => {
  player_1_spawned = !player_1_spawned;
  init_canvas();
}

pause_canvas_btn.onclick = () => {
  pause_play();
}
