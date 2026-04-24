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
const limitSelect = document.querySelector('#products-per-page')
limitSelect.addEventListener('input', (e) => {
	const limitValue = e.target.value
	createSearchUrl(new URLSearchParams({ limit: limitValue }))
})

// Orden productos
const sortSelect = document.querySelector('#sort-by')
sortSelect.addEventListener('input', (e) => {
	const sortValue = e.target.value
	createSearchUrl(new URLSearchParams({ sort: sortValue }))
})

// Tags
const tagCheckboxes = document.querySelectorAll('input[name="tags"]')
tagCheckboxes.forEach((tag) => {
	tag.addEventListener('input', (e) => {
		const tagValue = e.target.value
		console.log(tagValue)

		const searchUrl = createSearchUrl(new URLSearchParams({ tag: tagValue }))
		console.log(searchUrl)

		// window.location.href = `/?${searchUrl}`
	})
})

function createSearchUrl(newParams) {
	const defaultParams = { page: 1, limit: 10, sort: 'nameAsc' }
	const urlParams = new URLSearchParams(window.location.search)
	const searchParams = new URLSearchParams(defaultParams)

	for (const [key, value] of urlParams) {
		searchParams.set(key, value)
	}

	for (const [key, value] of newParams) {
		searchParams.set(key, value)
	}

	window.location.href = `/?${searchParams.toString()}`
}
