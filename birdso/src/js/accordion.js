$(function() {
	var questions = document.querySelectorAll('.accordion > h3');
	for (var i = 0; i < questions.length; i++) {
		questions[i].addEventListener('click', function() {
			this.classList.toggle('active');
			var panel = this.nextElementSibling;
			if (panel.style.maxHeight) {
				panel.style.maxHeight = null;
			} else {
				panel.style.maxHeight = panel.scrollHeight + 'px';
			}
		});
	}
});