import { simon } from './simon.js';

export class Button {
	constructor($audioContext, $color, $offColor, $frequency) {
    this.element = document.querySelector('.' + $color),
    this.color = $color
    this.offColor = $offColor
    
    this.context = $audioContext
    this.audio = new OscillatorNode($audioContext, { type: 'triangle', frequency: $frequency })
    this.audio.start()
    
    this.mousedown = this.mousedown.bind(this)
    this.mouseup = this.mouseup.bind(this)

  }
	setOriginalColor() {
		this.element.style.backgroundColor = this.color
	}
	setOffColor() {
		this.element.style.backgroundColor = this.offColor
	}
	enableAudio() {
		this.audio.connect(this.context.destination)
	}
	disableAudio() {
		this.audio.disconnect(this.context.destination)
	}
	mousedown() {
		this.setOffColor()
		this.enableAudio()
	}
	mouseup() {
		this.setOriginalColor()
		this.disableAudio()
		simon.userPattern.push(this.color)
		simon.checkInput()
	}
	enable() {
		this.element.addEventListener('mousedown', this.mousedown)
		this.element.addEventListener('mouseup', this.mouseup)
		this.element.style.cursor = 'pointer'
	}
	disable() {
		this.element.removeEventListener('mousedown', this.mousedown)
		this.element.removeEventListener('mouseup', this.mouseup)
		this.element.style.cursor = 'initial'
	}
}

