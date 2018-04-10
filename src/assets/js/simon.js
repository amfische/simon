import { ui } from './ui.js';
import { controls, $green, $red, $yellow, $blue } from './controls.js';

export const simon = {
	level: 0,
	strictMode: false,
	colors: ['green', 'red', 'yellow', 'blue'],
	pattern: [],
	userPattern: [],
	toggleStrictMode() { // is used as event handler so need to reference simon object
		simon.strictMode = !simon.strictMode
		ui.toggleStrictMode(simon.strictMode)
	},
	reset() {
		this.level = 0
		this.pattern = []
		this.userPattern = []
		ui.reset()
	},
	start() { // is used as event handler so need to reference simon object
		simon.reset()
		simon.setLevelAndPlay()
	},
	setLevelAndPlay(repeat = false) {
		if (repeat) {
			ui.parseLevel(this.level)
		} else {
			ui.parseLevel(++this.level)
			this.randomColor()
		}
		this.userPattern = []
		setTimeout(() => { this.playPattern() }, 1500)
	},
	randomColor() {
		let num = Math.floor(Math.random() * 4)
		this.pattern.push(this.colors[num])
	},
	playPattern() {
		let soundTime, intervalTime // higher levels will go faster
		if (this.pattern.length <= 7) {
			soundTime = 500
			intervalTime = 1000
		} else if (this.pattern.length <= 14) {
			soundTime = 350
			intervalTime = 700
		} else {
			soundTime = 250
			intervalTime = 500
		}
		for (let i = 0; i < this.pattern.length; i++) {
			//need to create closure around each iteration
			//let creates locally scoped variable
			setTimeout(function() {
				switch(simon.pattern[i]) {
					case 'blue':
						$blue.setOffColor()
						$blue.enableAudio()
						setTimeout(() => {
							$blue.disableAudio()
							$blue.setOriginalColor()
						}, soundTime);
						break;
					case 'green':
						$green.setOffColor()
						$green.enableAudio()
						setTimeout(() => {
							$green.disableAudio()
							$green.setOriginalColor()
						}, soundTime);
						break;
					case 'yellow':
						$yellow.setOffColor()
						$yellow.enableAudio()
						setTimeout(() => {
							$yellow.disableAudio()
							$yellow.setOriginalColor()
						}, soundTime);
						break;
					case 'red':
						$red.setOffColor()
						$red.enableAudio()
						setTimeout(() => {
							$red.disableAudio()
							$red.setOriginalColor()
						}, soundTime);
						break;
				}
			}, intervalTime * i);

		}
		setTimeout(() => { controls.enableUserInput() }, intervalTime * simon.pattern.length)
	},
	checkInput() {
		controls.disableUserInput()

		let correctInput = this.userPattern.every((e,i) => e === this.pattern[i])

		if (correctInput && this.userPattern.length === this.pattern.length && this.level === 20) {

			ui.win()

		} else if (correctInput && this.userPattern.length === this.pattern.length) {

			setTimeout(() => { this.setLevelAndPlay() }, 500)

		} else if (!correctInput) {

			ui.mistake().then(() => {
				if (this.strictMode) {
					setTimeout(() => { this.reset() }, 2000)
				} else {
					setTimeout(() => { this.setLevelAndPlay(true) }, 2000)
				}
			})

		} else {

			controls.enableUserInput()

		}
	}
}
