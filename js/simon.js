'use strict';

var simon = {
	count: 0,
	strict: false,
	pattern: [],
	player_pattern: []
};

simon.reset = function() {
	this.count = 0;
	this.pattern = [];
	this.player_pattern = [];
	ui.update_count();
};

simon.next_level = function() {
	this.player_pattern = [];
	this.random_color();
	this.count += 1;
	ui.update_count();
	setTimeout(function() {
		simon.play_pattern();
	}, 1500);
};

simon.random_color = function() {
	//generate random color and apply to simon pattern array
	var num = Math.floor(Math.random() * 4);
	var colors = ['green', 'red', 'yellow', 'blue'];
	this.pattern.push(colors[num]);
};

simon.play_pattern = function() {
	for (var i = 0; i < this.pattern.length; i++) {
		//need to create closure around each iteration
		(function(j) {
			setTimeout(function() {
				switch(simon.pattern[j]) {
					case 'blue':
						$blue.style.backgroundColor = '#3232ff';
						blue_sound.play();
						setTimeout(function() {
							$blue.style.backgroundColor = 'blue';
						}, 500);
						break;
					case 'green':
						$green.style.backgroundColor = '#4ca64c';
						green_sound.play();
						setTimeout(function() {
							$green.style.backgroundColor = 'green';
						}, 500);
						break;
					case 'yellow':
						$yellow.style.backgroundColor = '#ffff99';
						yellow_sound.play();
						setTimeout(function() {
							$yellow.style.backgroundColor = 'yellow';
						}, 500);
						break;
					case 'red':
						$red.style.backgroundColor = '#ff6666';
						red_sound.play();
						setTimeout(function() {
							$red.style.backgroundColor = 'red';
						}, 500);
						break;
				}
			}, 1000 * j);
		})(i);
	}
	setTimeout(function() {
		controls.enable_pattern_input();
	}, 1000 * simon.pattern.length);
};

simon.check_player_input = function() {
	controls.disable_pattern_input();
	var pass_level = true;
	for (var i = 0; i < this.player_pattern.length; i++) {
		if (this.player_pattern[i] !== this.pattern[i]) {
			pass_level = false;
		}
	}
	if (!pass_level) {
		ui.mistake();
		if (!this.strict) {
			setTimeout(function() {
				ui.update_count();
			}, 4000)
			setTimeout(function() {
				simon.player_pattern = [];
				simon.play_pattern();
			}, 5500);
		} else {
			setTimeout(function() {
				simon.reset();
			}, 4000);
		}
	} else if (pass_level && this.player_pattern.length === this.pattern.length && this.count === 20) {
		ui.win();
	} else if (pass_level && this.player_pattern.length === this.pattern.length) {
		setTimeout(function() {
			simon.next_level();
		}, 500);
	} else {
		controls.enable_pattern_input();
	}
};




//allows me to pass functions with parameters as arguments without invoking the function
function partial(func /*, 0..n args */) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    var allArguments = args.concat(Array.prototype.slice.call(arguments));
    return func.apply(this, allArguments);
  };
}