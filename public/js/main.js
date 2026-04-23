// Login banner
const loginBanner = document.querySelector('#login-banner')
const closeBtn = loginBanner?.querySelector('#close-btn')
closeBtn?.addEventListener('click', () => {
	loginBanner.classList.add('hidden')
})

// Delete
const deleteBtns = document.querySelectorAll('.delete-btn')

deleteBtns.forEach((btn) => {
	btn.addEventListener('click', () => {
		fetch(`/products/${btn.dataset.id}`, { method: 'DELETE' })
			.then((response) => response.json())
			.then((data) => (window.location.href = '/products'))
	})
})

// Productos por página
const productsPerPageSelect = document.querySelector('#products-per-page')

productsPerPageSelect.addEventListener('input', (e) => {
	const productsPerPage = e.target.value
	window.location.href = `/?productsPerPage=${productsPerPage}&page=0`
})
