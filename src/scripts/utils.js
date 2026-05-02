export function formatDate(date) {
	return date.toDateString()
}

export function randomImageUrl() {
	const randomIndex = Math.floor(Math.random() * 20) + 1
	return `https://picsum.photos/id/${randomIndex}/300/300`
}
