// https://dev.to/leonardoschmittk/how-to-make-a-mouse-ripple-click-effect-with-css-js-and-html-in-2-steps-2fcf
document.onclick = () => applyCursorRippleEffect(event); 
function applyCursorRippleEffect(e) {
	const ripple = document.createElement('div');

	ripple.className = 'ripple';
	document.body.appendChild(ripple);

	var diameter = Math.random() * 15 + 10;
	ripple.style.left = `${e.clientX - 10}px`;
	ripple.style.top = `${e.clientY - 10}px`; 
	ripple.style.height = `${diameter}px`; 
	ripple.style.width = `${diameter}px`; 

	ripple.style.animation = 'ripple-effect 0.5s linear';
	ripple.onanimationend = () => document.body.removeChild(ripple);
}