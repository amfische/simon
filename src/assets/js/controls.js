import { Button } from './buttons.js';
import { simon } from './simon.js';

const context = new (window.AudioContext || window.webkitAudioContext)()

const $green = new Button(context, 'green', '#4ca64c', 164.81)
const $red = new Button(context, 'red', '#ff6666', 220.00)
const $yellow = new Button(context, 'yellow', '#ffff99', 277.18)
const $blue = new Button(context, 'blue', '#3232ff', 329.63)

const controls = {
	powerSwitch: document.getElementById('on-off'),
	startBtn: document.querySelector('.start'),
	strictBtn: document.querySelector('.strict'),
	init() {
		this.powerSwitch.addEventListener('click', () => {
			if (this.powerSwitch.checked) {
				this.enableSettings()
			} else {
				this.disableSettings()
				simon.reset()
			}
		})
	},
	enableSettings() {
		this.startBtn.addEventListener('click', simon.start)
		this.strictBtn.addEventListener('click', simon.toggleStrictMode)
		this.startBtn.style.cursor = 'pointer'
		this.strictBtn.style.cursor = 'pointer'
	},
	disableSettings() {
		this.startBtn.removeEventListener('click', simon.start)
		this.strictBtn.removeEventListener('click', simon.toggleStrictMode)
		this.startBtn.style.cursor = 'initial'
		this.strictBtn.style.cursor = 'initial'
	},
	enableUserInput() {
		$green.enable()
		$red.enable()
		$yellow.enable()
		$blue.enable()
	},
	disableUserInput() {
		$green.disable()
		$red.disable()
		$yellow.disable()
		$blue.disable()
	}
}

export { controls, $green, $red, $yellow, $blue };
