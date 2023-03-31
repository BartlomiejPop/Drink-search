const inputFilterEl = document.getElementById("filter");
const drinksEl = document.querySelectorAll("li");
const listEl = document.querySelector("#list");
const addDrinkBtn = document.querySelector(".add-drink");
const modalEl = document.querySelector(".add-drink-modal");
const modalShadowEl = document.querySelector(".modal-shadow");
const submitBtn = document.querySelector(".submit");
const addNameEl = document.querySelector(".add-drink-input");
const addDescriptionEl = document.querySelector(".add-textarea");
const spanPopupEl = document.querySelector(".span-popup");
const descriptionModalEl = document.querySelector(".description-modal");
const descriptionEl = document.querySelector(".description");
const deletedDrinksBtn = document.querySelector(".deleted-drinks");
const deletedDrinksModalEl = document.querySelector(".deleted-drinks-modal");
let idCounter = 27;
let deletedDrinksArr = [];

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
			deletedDrinksArr.push(document.getElementById(id));
			console.log(deletedDrinksArr);
			listEl.removeChild(document.getElementById(id));
			if (deletedDrinksArr.length > 0) {
				deletedDrinksBtn.style.display = "block";
			}
		}, 300)
	);
};

const hideDeleteBtn = (id) => {
	const deleteBtn = document.getElementById(id).childNodes[1];
	deleteBtn.style.display = "none";
};

const showModal = () => {
	modalEl.style.opacity = "1";
	modalShadowEl.style.opacity = "1";
	modalEl.style.display = "flex";
	modalShadowEl.style.display = "block";
	spanPopupEl.style.display = "none";
	modalShadowEl.addEventListener("click", hideModal);
	submitBtn.addEventListener("click", () => {
		addElement();
	});
};

const addElement = () => {
	if (addDescriptionEl.value === "" || addNameEl.value === "") {
		spanPopupEl.style.display = "block";
		return;
	}
	listEl.insertAdjacentHTML(
		"beforeend",
		`
	<li
							id=${idCounter}
							onmouseenter="showDeleteBtn(${idCounter})"
							onmouseleave="hideDeleteBtn(${idCounter})"
							onclick="showDescription(${idCounter})"
							description="${addDescriptionEl.value}">
							${addNameEl.value}<i
								style="display: none"
								class="fa-solid fa-minus"></i>
						</li>`
	);

	addDescriptionEl.value = "";
	addNameEl.value = "";
	spanPopupEl.style.display = "none";
	idCounter++;
	hideModal();
};

const hideModal = () => {
	modalEl.style.opacity = "0";
	modalShadowEl.style.opacity = "0";
	descriptionModalEl.style.opacity = "0";
	deletedDrinksModalEl.style.opacity = "0";
	setTimeout(() => {
		deletedDrinksModalEl.style.display = "none";
		modalEl.style.display = "none";
		modalShadowEl.style.display = "none";
		descriptionModalEl.style.display = "none";
	}, "600");
};

const showDescription = (id) => {
	const productDescription = document.getElementById(id).attributes[4].value;
	modalShadowEl.style.opacity = "1";
	descriptionModalEl.style.opacity = "1";
	modalShadowEl.style.display = "block";
	descriptionModalEl.style.display = "block";
	descriptionEl.style.display = "block";
	descriptionEl.textContent = productDescription;
	modalShadowEl.addEventListener("click", hideModal);
};

const showDeletedDrinks = () => {
	deletedDrinksModalEl.style.display = "flex";
	deletedDrinksModalEl.style.opacity = "1";
	modalShadowEl.style.opacity = "1";
	modalShadowEl.style.display = "block";
	modalShadowEl.addEventListener("click", hideModal);
};

inputFilterEl.addEventListener("input", search);
addDrinkBtn.addEventListener("click", showModal);
deletedDrinksBtn.addEventListener("click", showDeletedDrinks);
