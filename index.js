const inputFilterEl = document.getElementById("filter");
const drinksEl = document.querySelectorAll("li");
const listEl = document.querySelector("#list");
const addDrinkBtn = document.querySelector(".add-drink");
const modalEl = document.querySelector(".add-drink-modal");
const modalShadowEl = document.querySelector(".modal-shadow");
const submitBtn = document.querySelector(".submit");
const addNameEl = document.querySelector(".add-name");
const addDescriptionEl = document.querySelector(".add-description");

const search = (e) => {
	const text = e.target.value.toLowerCase();

	drinksEl.forEach((item) => {
		if (item.textContent.toLowerCase().includes(text)) {
			return (item.style.display = "flex");
		}
		return (item.style.display = "none");
	});
};

const showDeleteBtn = (id) => {
	const deleteBtn = document.getElementById(id).childNodes[1];

	deleteBtn.style.display = "block";
	deleteBtn.addEventListener(
		"click",
		_.throttle(() => {
			// console.log(listEl.children[id]);
			listEl.removeChild(document.getElementById(id));
		}, 300)
	);
};

const hideDeleteBtn = (id) => {
	const deleteBtn = document.getElementById(id).childNodes[1];
	deleteBtn.style.display = "none";
};

const showModal = () => {
	modalEl.style.display = "flex";
	modalShadowEl.style.display = "block";
	modalShadowEl.addEventListener("click", hideModal);
	submitBtn.addEventListener("click", addElement);
};

const addElement = () => {};

const hideModal = () => {
	modalEl.style.display = "none";
	modalShadowEl.style.display = "none";
};

inputFilterEl.addEventListener("input", search);

addDrinkBtn.addEventListener("click", showModal);
