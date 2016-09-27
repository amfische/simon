'use strict';

var $green = document.getElementById('green');
var $red = document.getElementById('red');
var $yellow = document.getElementById('yellow');
var $blue = document.getElementById('blue');

var green_sound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var red_sound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var yellow_sound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var blue_sound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

var mistake = new Audio('sounds/buzz.mp3');
var win = new Audio('sounds/ping.mp3');

var $count_element = document.getElementById('count').childNodes[1];

var ui = {
	count: "00"
};

ui.start = function() {
	simon.reset();
	simon.next_level();
};

ui.strict = function() {
	simon.strict = simon.strict === true ? false : true;
	$strict_light.style.backgroundColor = simon.strict ? 'red' : 'white';
};

ui.update_count = function() {
	this.count = simon.count.toString();
	if (this.count.length === 1) {
		this.count= "0" + ui.count;
	}
	$count_element.setAttribute('value', this.count);
};

ui.mistake = function() {
	$count_element.setAttribute('value', '!!!');
	mistake.volume = 0.1;
	mistake.play();
	var flash_error = setInterval(function() {
		$count_element.setAttribute('value', $count_element.getAttribute('value') === '!!!' ? " " : "!!!"); 
	}, 400);
	setTimeout(function() {
		clearInterval(flash_error);
	}, 2800);
};

ui.win = function() {
	$count_element.setAttribute('value', 'WIN');
	win.volume = 0.1;
	win.play();
	var flash_win = setInterval(function() {
		$count_element.setAttribute('value', $count_element.getAttribute('value') === 'WIN' ? " " : "WIN"); 
	}, 400);
	setTimeout(function() {
		clearInterval(flash_win);
	}, 2800);
}

ui.blue_mouse_down = function() { $blue.style.backgroundColor = '#3232ff'; blue_sound.play();};
ui.blue_mouse_up = function() {
		$blue.style.backgroundColor = 'blue';
		simon.player_pattern.push('blue');
		console.log(simon.player_pattern);
		simon.check_player_input();
};

ui.red_mouse_down = function() { $red.style.backgroundColor = '#ff6666'; red_sound.play();};
ui.red_mouse_up = function() {
	$red.style.backgroundColor = 'red';
	simon.player_pattern.push('red');
	console.log(simon.player_pattern);
	simon.check_player_input();
};

ui.green_mouse_down = function() { $green.style.backgroundColor = '#4ca64c'; green_sound.play();};
ui.green_mouse_up = function() {
	$green.style.backgroundColor = 'green';
	simon.player_pattern.push('green');
	console.log(simon.player_pattern);
	simon.check_player_input();
};

ui.yellow_mouse_down = function() { $yellow.style.backgroundColor = '#ffff99'; yellow_sound.play();};
ui.yellow_mouse_up = function() {
	$yellow.style.backgroundColor = 'yellow';
	simon.player_pattern.push('yellow');
	console.log(simon.player_pattern);
	simon.check_player_input();
};