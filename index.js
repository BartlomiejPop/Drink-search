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
const deletedDrinksListEl = document.querySelector(".deleted-drinks-list");
const deleteCancelBtn = document.querySelector(".delete-popup-cancel");
const deletePermamentBtn = document.querySelector(".delete-popup-remove");
const deletePopupEl = document.querySelector(".delete-popup-div");
let idCounter = 27;
let localCounter = 0;
let deletedDrinksArr = [];
let addEl;

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
			if (document.getElementById(id)) {
				deletedDrinksArr.push(document.getElementById(id));
			}
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
	if (screen.availWidth > 1280) {
		deleteBtn.style.display = "none";
	}
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
								class="fa-regular fa-square-minus"></i>
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
	deletePopupEl.style.display = "none";

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
	modalShadowEl.addEventListener("click", () => {
		deletedDrinksModalEl.style.opacity = "0";
		modalShadowEl.style.opacity = "0";
		setTimeout(() => {
			deletedDrinksModalEl.style.display = "none";
			modalShadowEl.style.display = "none";
		}, "600");
		deletedDrinksListEl.innerHTML = "";
	});

	deletedDrinksArr.forEach((el) => {
		if (el) {
			addEl = document.createElement("li");
			addEl.innerHTML = `<li id="${el.id}" class="deleted-drink class${el.id}" description="${el.attributes[4].textContent}">${el.textContent}<div><button onclick="saveElement(${el.id})" class="save"><i class="fa-solid fa-share"></i></button><button onclick="deleteElement(${el.id})" class="delete-permament"><i class="fa-solid fa-xmark"></i></button></div></li>`;
			deletedDrinksListEl.appendChild(addEl);

			// deletedDrinksListEl.innerHTML += ` <li id="${el.id}" class="deleted-drink" description="${el.attributes[4].textContent}">${el.textContent}<div><button onclick="saveElement(${el.id})" class="save"><i class="fa-solid fa-share"></i></button><button onclick="deleteElement(${el.id})" class="delete-permament"><i class="fa-solid fa-xmark"></i></button></div></li>`;
		}
	});
};

const saveElement = (id) => {
	const savingEl = listEl.insertAdjacentHTML(
		"beforeend",
		`
	<li
							id=${id}
							onmouseenter="showDeleteBtn(${id})"
							onmouseleave="hideDeleteBtn(${id})"
							onclick="showDescription(${id})"
							description="${document.getElementById(id).attributes[2].textContent}">
							${document.getElementById(id).textContent}<i
								style="display: none"
								class="fa-regular fa-square-minus"></i>
						</li>`
	);

	const drinkToDelete = document.querySelector(`.class${id}`);

	drinkToDelete.remove();
	deletedDrinksArr.forEach((el) => {
		if (el.id == id) {
			deletedDrinksArr.splice(deletedDrinksArr.indexOf(el), 1);
		}
	});

	if (deletedDrinksArr.length === 0) {
		deletedDrinksBtn.style.display = "none";
		deletedDrinksModalEl.style.opacity = "0";
		modalShadowEl.style.opacity = "0";
		setTimeout(() => {
			deletedDrinksModalEl.style.display = "none";
			modalShadowEl.style.display = "none";
		}, "600");
		deletedDrinksListEl.innerHTML = "";
	}
	if (screen.availWidth < 1280) {
		const deleteBtn = document.getElementById(id).childNodes[1];
		deleteBtn.style.display = "block";
	}
};
const deleteElement = (id) => {
	deletePopupEl.style.display = "flex";
	document.addEventListener("click", (e) => {
		console.log(e.target);
		if (e.target === deleteCancelBtn) {
			deletePopupEl.style.display = "none";
		} else if (e.target === deletePermamentBtn) {
			const drinkToDelete = document.querySelector(`.class${id}`);
			
			drinkToDelete.remove();
			deletedDrinksArr.forEach((el) => {
				if (el.id == id) {
					deletedDrinksArr.splice(deletedDrinksArr.indexOf(el), 1);
						if (deletedDrinksArr.length === 0) {
							deletedDrinksBtn.style.display = "none";
							deletedDrinksModalEl.style.opacity = "0";
							modalShadowEl.style.opacity = "0";
							setTimeout(() => {
								deletedDrinksModalEl.style.display = "none";
								modalShadowEl.style.display = "none";
							}, "600");
							deletedDrinksListEl.innerHTML = "";
						}
				}
			});
			deletePopupEl.style.display = "none";
		} else if (e.target === modalShadowEl) {
			deletePopupEl.style.display = "none";
		}
	});



	if (screen.availWidth < 1280) {
		const deleteBtn = document.getElementById(id).childNodes[1];
		deleteBtn.style.display = "block";
	}
};

inputFilterEl.addEventListener("input", search);
addDrinkBtn.addEventListener("click", showModal);
deletedDrinksBtn.addEventListener("click", showDeletedDrinks);
