'use strict';

var $on_switch = document.getElementById('on-off');
var $start = document.getElementById('start').childNodes[1];
var $strict = document.getElementById('strict').childNodes[3];
var $strict_light = document.getElementById('strict').childNodes[1];

var controls = {
	game_on: false
};

$on_switch.addEventListener('click', function() {
	controls.game_on = $on_switch.checked === true ? true : false;
	if (controls.game_on) {
		controls.enable_settings();
	} else {
		controls.disable_settings();
		simon.reset();
	}
});

controls.enable_settings = function() {
	$start.addEventListener('click', ui.start);
	$strict.addEventListener('click', ui.strict);
	$start.style.cursor = 'pointer';
	$strict.style.cursor = 'pointer';
};

controls.disable_settings = function() {
	$start.removeEventListener('click', ui.start);
	$strict.removeEventListener('click', ui.strict);
	$start.style.cursor = 'initial';
	$strict.style.cursor = 'initial';
};

controls.enable_pattern_input = function() {
	$green.addEventListener('mousedown', ui.green_mouse_down);
	$green.addEventListener('mouseup', ui.green_mouse_up);
	$green.style.cursor = 'pointer';
	$red.addEventListener('mousedown', ui.red_mouse_down);
	$red.addEventListener('mouseup', ui.red_mouse_up);
	$red.style.cursor = 'pointer';
	$yellow.addEventListener('mousedown', ui.yellow_mouse_down);
	$yellow.addEventListener('mouseup', ui.yellow_mouse_up);
	$yellow.style.cursor = 'pointer';
	$blue.addEventListener('mousedown', ui.blue_mouse_down);
	$blue.addEventListener('mouseup', ui.blue_mouse_up);
	$blue.style.cursor = 'pointer';
};

controls.disable_pattern_input = function() {
	$green.removeEventListener('mousedown', ui.green_mouse_down);
	$green.removeEventListener('mouseup', ui.green_mouse_up);
	$green.style.cursor = 'initial';
	$red.removeEventListener('mousedown', ui.red_mouse_down);
	$red.removeEventListener('mouseup', ui.red_mouse_up);
	$red.style.cursor = 'initial';
	$yellow.removeEventListener('mousedown', ui.yellow_mouse_down);
	$yellow.removeEventListener('mouseup', ui.yellow_mouse_up);
	$yellow.style.cursor = 'initial';
	$blue.removeEventListener('mousedown', ui.blue_mouse_down);
	$blue.removeEventListener('mouseup', ui.blue_mouse_up);
	$blue.style.cursor = 'initial';
};




