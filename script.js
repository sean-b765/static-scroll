$(document).ready(function () {
	const pages = document.querySelectorAll('.pg')
	const navSteps = document.querySelectorAll('nav .step')

	let activePage = 1

	/**
	 * activePage index is already set before this function gets called
	 */
	const changeActivePage = () => {
		// remove active class from pages/step divs
		pages.forEach((page) => {
			page.classList.remove('active')
		})
		navSteps.forEach((step) => {
			step.classList.remove('active')
		})
		// set the appropriate page/step divs class => active
		pages[activePage - 1].classList.add('active')
		navSteps[activePage - 1].classList.add('active')

		// calculate percentage of total pages for indicator
		const percentage = ((activePage - 1) / (pages.length - 1)) * 100
		console.log(percentage, activePage, pages.length)

		document.documentElement.style.setProperty(
			'--progress-height',
			`${percentage}%`
		)
	}

	/**
	 * Handle the scroll wheel event to change the activePage
	 */
	window.addEventListener('wheel', (e) => {
		if (e.deltaY >= 0) {
			// scroll down!
			if (activePage + 1 > pages.length) {
				activePage = 1
			} else {
				activePage++
			}
			changeActivePage()
		} else {
			// scroll up!
			if (activePage - 1 < 1) {
				activePage = pages.length
			} else {
				activePage--
			}
			changeActivePage()
		}
	})

	// Capture the touch start event to set the lastYPosition
	let lastYPos = 0
	window.addEventListener('touchstart', (e) => {
		let curYPos = e.changedTouches[0].screenY

		lastYPos = curYPos
	})
	/**
	 * Capture the touch end event to compare the currentYPosition to lastYPosition
	 * 	to resolve the direction scrolled on mobile
	 * then change the activePage
	 */
	window.addEventListener('touchend', (e) => {
		let curYPos = e.changedTouches[0].screenY
		if (curYPos > lastYPos) {
			// scroll up!
			if (activePage - 1 < 1) {
				activePage = pages.length
			} else {
				activePage--
			}
			changeActivePage()
		} else if (curYPos < lastYPos) {
			// scroll down!
			if (activePage + 1 > pages.length) {
				activePage = 1
			} else {
				activePage++
			}
			changeActivePage()
		}
	})

	changeActivePage()
})
