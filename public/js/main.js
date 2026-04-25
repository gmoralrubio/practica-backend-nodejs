// Login banner
const loginBanner = document.querySelector('#login-banner')
const closeBtn = loginBanner?.querySelector('#close-btn')
closeBtn?.addEventListener('click', () => {
	loginBanner.classList.add('hidden')
})

// Delete
const deleteBtns = document.querySelectorAll('.delete-btn')

deleteBtns?.forEach((btn) => {
	btn.addEventListener('click', () => {
		fetch(`/products/${btn.dataset.id}`, { method: 'DELETE' })
			.then((response) => response.json())
			.then((data) => (window.location.href = '/products'))
	})
})

// Productos por página
const limitSelect = document.querySelector('#products-per-page')
limitSelect?.addEventListener('input', (e) => {
	const limitValue = e.target.value
	createSearchUrl(new URLSearchParams({ limit: limitValue }))
})

// Orden productos
const sortSelect = document.querySelector('#sort-by')
sortSelect?.addEventListener('input', (e) => {
	const sortValue = e.target.value
	createSearchUrl(new URLSearchParams({ sort: sortValue }))
})

// Tags
const filtersForm = document.querySelector('#filters-form')
const filtersBtn = document.querySelector('#filters-btn')
filtersBtn.addEventListener('click', (e) => {
	e.preventDefault()
	let selectedTags = []
	const formData = new FormData(filtersForm, filtersBtn)
	for (const [key, value] of formData) {
		if (selectedTags.includes(value)) {
			selectedTags = selectedTags.filter((tag) => tag !== value)
		} else {
			selectedTags.push(value)
		}
	}
	const params = new URLSearchParams()
	selectedTags.forEach((tag) => params.append('tags', tag))
	console.log(params.toString())

	createSearchUrl(params, selectedTags.length === 0 ? ['tags'] : [])
})

function createSearchUrl(newParams, tags = []) {
	const searchParams = new URLSearchParams({ page: 1, limit: 10, sort: 'nameAsc' })
	const urlParams = new URLSearchParams(window.location.search)

	// Copia los params actuales de la URL sin duplicados
	// y sobreescribe los searchParams por defecto
	for (const key of new Set(urlParams.keys())) {
		searchParams.delete(key)
		for (const value of urlParams.getAll(key)) {
			searchParams.append(key, value)
		}
	}

	// Aplica los nuevos params, sobreescribiendo cualquier valor previo
	for (const key of new Set(newParams.keys())) {
		searchParams.delete(key)
		for (const value of newParams.getAll(key)) {
			searchParams.append(key, value)
		}
	}

	for (const key of tags) {
		searchParams.delete(key)
	}

	window.location.href = `/?${searchParams.toString()}`
}
