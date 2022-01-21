$(function() {
	// loop through all elements with class "profiles"
	var profiles = document.getElementsByClassName('profiles');
	for (var a = 0; a < profiles.length; a++) {
		profiles[a].innerHTML = '<h4 style="padding: 10px 0 20px 0; text-align: center;"><em>If the contents of this page do not load momentarily, please refresh the page.</em></h4>';
	}
	for (var a = 0; a < profiles.length; a++) {
		profiles[a].innerHTML = '';

		// get attributes for element
		var year = profiles[a].getAttribute('year').trim().toLowerCase();
		var competition = profiles[a].getAttribute('competition').trim().toLowerCase();
		var roles = profiles[a].getAttribute('roles').trim().toLowerCase();
		var roles_count = 0;

		// display buttons for filtering by roles specified
		var buttons = '';
		if (roles.includes('director') || roles.length == 0) {
			buttons += '<a class="button tournament-director selected">Directors</a>';
			roles_count++;
		}
		if (roles.includes('board') || roles.length == 0) {
			buttons += '<a class="button board selected">Board</a>';
			roles_count++;
		}
		if (roles.includes('supervisor') || roles.length == 0) {
			buttons += '<a class="button event-supervisor selected">Event Supervisors</a>';
			roles_count++;
		}
		if (roles.includes('volunteer') || roles.length == 0) {
			buttons += '<a class="button volunteer-grader selected">Volunteer Graders</a>';
			roles_count++;
		}
		if (roles_count > 1) {
			console.log(buttons);
			buttons = buttons.replaceAll(' selected"', '"');
			console.log(buttons);
			buttons = '<a class="button all selected">All</a>' + buttons;
		}
		buttons = '<span class="buttons left">' + buttons;
		buttons += '</span>';
		profiles[a].innerHTML += buttons;

		// loop through competitions in `json`
		for (var i = 0; i < json.length; i++) {
			var obj = json[i];

			// if year and competition of `json` entry match those specified in element attributes
			if (obj.year.trim().toLowerCase() == year && obj.competition.trim().toLowerCase() == competition) {
				// loop through people in `json` entry
				for (var j = 0; j < obj.people.length; j++) {
					var person = obj.people[j];

					// if image is blank set a stock photo
					if (person['image'] == '') {
						person['image'] = '/src/img/profile.svg';
					}

					profile = '<div class="photo" style="background-image: url(' + person['image'] + ');"></div><div class="title">';
					profile += '<h3>' + person['first name'] + ' ' + person['last name'] + '</h3>';

					// specify classes to add to person's profile by looping through their roles
					var classes = obj.year;
					display_person = false;
					for (var k = 0; k < person.role.length; k++) {
						role = person.role[k];

						// determine if person's roles should allow them to be displayed
						if (roles.indexOf(role.title.replace(' ', '-').toLowerCase()) != -1) {
							display_person = true;
						}

						// set markup to display person's profile
						profile += '<h4>';
						if (role.hasOwnProperty('title')) {
							if (classes.indexOf(role.title.replace(' ', '-')) == -1) {
								if (classes.length > 0) {
									classes += " ";
								}
								classes += role.title.replace(' ', '-');
							}

							profile += role.title;
							if (role.hasOwnProperty('event')) {
								profile += ' for ' + role.event;
							} else {
								if (role.hasOwnProperty('division')) {
									profile +=  ' for Division';
								}
							}
							if (role.hasOwnProperty('division')) {
								profile += ' ' + role.division;
							}
						} else {
							if (role.hasOwnProperty('event')) {
								profile += role.event;
								if (role.hasOwnProperty('division')) {
									profile += ' ' + role.division;
								}
							} else if (role.hasOwnProperty('division')) {
								profile += 'Division ' + role.division;
							}
						}
						profile += '</h4>';
					}
					profile += '</div><div class="info"><p>';

					// determine if person has biography specified
					if (person.biography.trim().length == 0) {
						profile += '<em>Chirps! This bird appears to prefer to fly low. You\'ll have to participate in their event to find out more about them.</em>';
					} else {
						profile += person.biography.trim()
					}
					profile += '</p>';
					
					// determine if person has fact specified
					if (person.fact.trim().length > 0) {
						profile += '<p><em>' + obj.fact + ': ' + person.fact + '</em></p>';
					}
					profile = '</div></div><div class="' + classes.toLowerCase() + '">' + profile;

					if (display_person) {
						profiles[a].innerHTML += profile;	
					}
				}		
			}
		}
	}
});

// display biography and fact for profile that is selected
$('.profiles > div').click(function() {
	if ($(this).hasClass('active')) {
		$('.profiles > div').removeClass('active');
	} else {
		$('.profiles > div').removeClass('active');
		$(this).toggleClass('active');
	}
});

// filter entries by which button is selected
$('.profiles a.tournament-director').click(function() {
	$('.profiles .buttons a').removeClass('selected');
	$(this).addClass('selected');
	$('.profiles > div').hide();
	$('.profiles > div.tournament-director').show();
});
$('.profiles a.board').click(function() {
	$('.profiles .buttons a').removeClass('selected');
	$(this).addClass('selected');
	$('.profiles > div').hide();
	$('.profiles > div.board').show();
});
$('.profiles a.event-supervisor').click(function() {
	$('.profiles .buttons a').removeClass('selected');
	$(this).addClass('selected');
	$('.profiles > div').hide();
	$('.profiles > div.event-supervisor').show();
});
$('.profiles a.volunteer-grader').click(function() {
	$('.profiles .buttons a').removeClass('selected');
	$(this).addClass('selected');
	$('.profiles > div').hide();
	$('.profiles > div.volunteer-grader').show();
});
$('.profiles a.all').click(function() {
	$('.profiles .buttons a').removeClass('selected');
	$(this).addClass('selected');
	$('.profiles > div').show();
});