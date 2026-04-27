// Site Common Functions - Shared utilities for all pages

// Cookie management
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

// MP Animation toggle functions
function refreshMPAnnimation() {
	var toggleElement = document.getElementById("toggle-mp-annimation-text");
	if (toggleElement) {
		var disable_annimation_mp = getCookie("disable_annimation_mp");
		if (disable_annimation_mp != "true") {
			toggleElement.innerText = "关闭公众号加载动画";
		} else {
			toggleElement.innerText = "开启公众号加载动画";
		}
	}
}

function toggleMPAnnimation() {
	var disable_annimation_mp = getCookie("disable_annimation_mp");
	if (disable_annimation_mp != "true") {
		setCookie("disable_annimation_mp", "true", 10086);
	} else {
		setCookie("disable_annimation_mp", "false", 10086);
	}
	refreshMPAnnimation();
}

// Initialize on DOM ready
$(document).ready(function() {
	// Hide loader animation
	const loader = document.getElementById('loader');
	if (loader) {
		setTimeout(() => {
			loader.style.opacity = '0';
			loader.style.transition = 'opacity 0.5s ease';
			setTimeout(() => {
				loader.style.display = 'none';
			}, 500);
		}, 500);
	}

	// Smooth scroll support
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			const targetId = this.getAttribute('href');
			if (targetId === '#') return;
			
			const targetElement = document.querySelector(targetId);
			if (targetElement) {
				targetElement.scrollIntoView({
					behavior: 'smooth'
				});
			}
		});
	});

	// Refresh MP animation toggle text if element exists
	refreshMPAnnimation();
	
	// Bind toggle button if exists
	$('#toggle-mp-annimation-btn').on('click', toggleMPAnnimation);
});
