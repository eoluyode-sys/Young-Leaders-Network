document.addEventListener('DOMContentLoaded', () => {
	const navToggle = document.getElementById('nav-toggle');
	const mobileMenu = document.getElementById('mobile-menu');
	const menuOpen = document.getElementById('menu-open');
	const menuClose = document.getElementById('menu-close');

	if (navToggle) {
		navToggle.addEventListener('click', () => {
			const expanded = navToggle.getAttribute('aria-expanded') === 'true';
			navToggle.setAttribute('aria-expanded', String(!expanded));
			mobileMenu.classList.toggle('hidden');
			menuOpen.classList.toggle('hidden');
			menuClose.classList.toggle('hidden');
		});
	}

	// close mobile menu when a link is clicked (mobile UX)
	if (mobileMenu) {
		mobileMenu.querySelectorAll('a').forEach(link => {
			link.addEventListener('click', () => {
				mobileMenu.classList.add('hidden');
				menuOpen.classList.remove('hidden');
				menuClose.classList.add('hidden');
				if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
			});
		});
	}

	// Initialize AOS
	AOS.init({
		duration: 800,
		once: true,
		offset: 100,
		disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
	});

	const yearEl = document.getElementById('year');
	if (yearEl) yearEl.textContent = new Date().getFullYear();

	// Animated counters for About stats
	const statElems = document.querySelectorAll('.stat-number');
	if (statElems.length) {
		const counterObserver = new IntersectionObserver((entries, obs) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const el = entry.target;
					const target = parseInt(el.getAttribute('data-target'), 10) || 0;
					const duration = 1500;
					let start = null;
					const step = (timestamp) => {
						if (!start) start = timestamp;
						const progress = Math.min((timestamp - start) / duration, 1);
						el.textContent = Math.floor(progress * target).toLocaleString();
						if (progress < 1) {
							window.requestAnimationFrame(step);
						} else {
							el.textContent = target.toLocaleString();
						}
					};
					window.requestAnimationFrame(step);
					obs.unobserve(el);
				}
			});
		}, { threshold: 0.4 });

		statElems.forEach(e => counterObserver.observe(e));
	}
});


