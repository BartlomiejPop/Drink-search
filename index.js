const inputFilterEl = document.getElementById("filter");
const drinksEl = document.querySelectorAll("li");
const listEl = document.querySelector("#list");

const search = (e) => {
	const text = e.target.value.toLowerCase();

	drinksEl.forEach((item) => {
		if (item.textContent.toLowerCase().includes(text)) {
			return (item.style.display = "block");
		}
		return (item.style.display = "none");
	});
};

const showDeleteBtn = (id) => {
	const deleteBtn = listEl.children[id].childNodes[1];
	deleteBtn.style.display = "block";
	deleteBtn.addEventListener("click", () => {
		console.log(listEl.children[id]);
		listEl.removeChild(listEl.children[id]);
	});
};

const hideDeleteBtn = (id) => {
	const deleteBtn = listEl.children[id].childNodes[1];
	deleteBtn.style.display = "none";
};

inputFilterEl.addEventListener("input", search);
