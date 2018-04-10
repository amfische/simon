import buzz from '../media/buzz.mp3';
import ping from '../media/ping.mp3';

var mistake = new Audio(buzz);
var win = new Audio(ping);

export const ui = {
	strictLight: document.querySelector('.strict-light'),
	levelDisplay: document.querySelector('.level-count'), 
	toggleStrictMode(isStrict) {
		ui.strictLight.style.backgroundColor = isStrict ? 'red' : 'white'
	},
	setLevelDisplay(str) {
		ui.levelDisplay.setAttribute('value', str)
	},
	parseLevel(num) {
		let str = num.toLocaleString('en-US', {minimumIntegerDigits: 2})
		this.setLevelDisplay(str)
	},
	reset() {
		this.setLevelDisplay('00')
	},
	mistake() {
		mistake.volume = 0.1
		mistake.play()

		return new Promise((resolve, reject) => {
			// flash error symbol
			for (let i = 0; i < 6; i++) {
				setTimeout(() => {
					let str = i % 2 === 0 ? '' : '!!!'
					ui.setLevelDisplay(str)
					if (i === 5) resolve()
				}, i * 500)
			}
		})
	},
	win() {
		win.volume = 0.1
		win.play()

		// flash win message
		for (let i = 0; i < 6; i++) {
			setTimeout(function() {
				let str = i % 2 === 0 ? '' : 'WIN'
				ui.setLevelDisplay(str)
			}, i * 500)
		}
	}
}

