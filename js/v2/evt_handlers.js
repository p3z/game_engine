run_test_btn.onclick = () => {
    backing_track.play();
    init_canvas();
    run_animation = true;
};


reset_btn.onclick = () => {
  reset_view(main_view);
  clear_canvas_btn.classList.add("hide");
  stop_audio(backing_track);
}

test_btn.onclick = () => {
  player_1_spawned = !player_1_spawned;
}

clear_canvas_btn.onclick = () => {
  background(0); // Clear the canvas by setting the background color
  stars = [];
  planets = [];
  run_animation = false;
  player_1_spawned = false;
  }
