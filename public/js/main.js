// Login banner
const loginBanner = document.querySelector('#login-banner')
const closeBtn = loginBanner?.querySelector('#close-btn')
closeBtn?.addEventListener('click', () => {
	loginBanner.classList.add('hidden')
})

// Modal
const modal = document.querySelector('#modal')
const openModalBtn = document.querySelector('#open-modal-btn')
const closeModalBtns = document.querySelectorAll('.close-modal-btn')

openModalBtn?.addEventListener('click', () => modal.showModal())

closeModalBtns?.forEach(btn => {
	btn.addEventListener('click', () => modal.close())
})

// Añadir, editar y eliminar productos
const addProductBtn = document.querySelector('#add-product-btn')

addProductBtn?.addEventListener('click', () => {
	fetch('/products/', { method: 'POST' })
		.then(res => {
			res.text()
		})
		.then(data => {
			modal.close()
		})
})
