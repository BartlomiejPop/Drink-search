import { Notify } from "notiflix/build/notiflix-notify-aio";
const inputFilterEl = document.getElementById("filter");
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
const clearStorageBtn = document.querySelector(".clear-storage");
const deletePopupTextEl = document.querySelector(".delete-popup-text");
let idCounter = 27;
let localCounter = 0;
let deletedDrinksArr = [];
let addEl;
let storagedDrinks = [];

const showDeleteBtn = (id) => {
	const deleteBtn = document.getElementById(id).childNodes[1];
	deleteBtn.style.display = "block";
	deleteBtn.addEventListener(
		"click",
		_.throttle(() => {
			if (document.getElementById(id)) {
				deletedDrinksArr.push({
					id: document.getElementById(id).id,
					name: document.getElementById(id).innerText,
					description: document.getElementById(id).attributes[1].value,
				});
				console.log(deletedDrinksArr);

				localStorage.setItem(
					`drinksToDelete`,
					JSON.stringify(deletedDrinksArr)
				);

				// deletedDrinksArr = deletedDrinksArr.filter((el) => el.id != id);

				storagedDrinks = storagedDrinks.filter((el) => +el.id !== id);

				localStorage.setItem(`savedDrinks`, JSON.stringify(storagedDrinks));
			}
			if (document.getElementById(id).id < 26) {
				Notify.info(
					"Elementy początkowe nie mogą być usunięte permamentnie z listy. Usuwanie ich może doprowadzić do duplikacji"
				);
			}

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
	const newDrink = listEl.insertAdjacentHTML(
		"beforeend",
		`
	<li
							id=${idCounter}
							description="${addDescriptionEl.value}">
							${addNameEl.value}<i
								style="display: none"
								class="fa-regular fa-square-minus"></i>
						</li>`
	);
	storagedDrinks.push({
		id: idCounter,
		description: addDescriptionEl.value,
		name: addNameEl.value,
	});

	localStorage.setItem(`savedDrinks`, JSON.stringify(storagedDrinks));

	addDescriptionEl.value = "";
	addNameEl.value = "";
	spanPopupEl.style.display = "none";
	idCounter++;
	hideModal();
	handleDeleteBtn();
	Notify.success("Pomyślnie dodane napój");
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
	const productDescription = document.getElementById(id).attributes[1].value;
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
			addEl.innerHTML = `<li id="${el.id}" class="deleted-drink class${el.id}" description="${el.description}">${el.name}<div><button  class="save"><i class="fa-solid fa-share"></i></button><button class="delete-permament"><i class="fa-solid fa-xmark"></i></button></div></li>`;
			deletedDrinksListEl.appendChild(addEl);
		}
	});
	const saveBtns = document.querySelectorAll(".save");
	const deleteBtns = document.querySelectorAll(".delete-permament");
	saveBtns.forEach((el) =>
		el.addEventListener("click", (e) => {
			saveElement(+e.currentTarget.parentElement.parentElement.id);
		})
	);
	deleteBtns.forEach((el) =>
		el.addEventListener("click", (e) => {
			deleteElement(+e.currentTarget.parentElement.parentElement.id);
		})
	);
};

const saveElement = (id) => {
	console.log(document.getElementById(id));
	const savingEl = listEl.insertAdjacentHTML(
		"beforeend",
		`
	<li
							id=${id}
							description="${document.getElementById(id).attributes[1].textContent}">
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
			storagedDrinks.push(el);
			localStorage.setItem("savedDrinks", JSON.stringify(storagedDrinks));
		}
	});

	localStorage.setItem("drinksToDelete", JSON.stringify(deletedDrinksArr));

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
	handleDeleteBtn();
};

const deleteElement = (id) => {
	deletePopupTextEl.textContent = "Usunąć permamentnie?";
	deletePopupEl.style.display = "flex";
	document.addEventListener("click", (e) => {
		if (e.target === deleteCancelBtn) {
			deletePopupEl.style.display = "none";
		} else if (e.target === deletePermamentBtn) {
			const drinkToDelete = document.querySelector(`.class${id}`);

			drinkToDelete.remove();
			deletedDrinksArr.forEach((el) => {
				if (el.id == id) {
					deletedDrinksArr.splice(deletedDrinksArr.indexOf(el), 1);
					deletedDrinksArr = deletedDrinksArr.filter((el) => el.id != id);
					localStorage.setItem(
						"drinksToDelete",
						JSON.stringify(deletedDrinksArr)
					);
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
			if (+drinkToDelete.id > 25) {
				Notify.success("Usunięto permamentnie.");
			}
		} else if (e.target === modalShadowEl) {
			deletePopupEl.style.display = "none";
		}
	});

	if (screen.availWidth < 1280) {
		const deleteBtn = document.getElementById(id).childNodes[1];
		deleteBtn.style.display = "block";
	}
};

const search = (e) => {
	const text = e.target.value.toLowerCase();
	const drinksEl = document.querySelectorAll("li");

	drinksEl.forEach((item) => {
		if (item.textContent.toLowerCase().includes(text)) {
			return (item.style.display = "flex");
		}
		return (item.style.display = "none");
	});
};

const updateList = () => {
	if (localStorage.getItem("savedDrinks")) {
		JSON.parse(localStorage.getItem("savedDrinks")).forEach((el) =>
			storagedDrinks.push(el)
		);

		JSON.parse(localStorage.getItem("savedDrinks")).forEach((el) =>
			listEl.insertAdjacentHTML(
				"beforeend",
				`<li
							id=${el.id}
							description="${el.description}">
							${el.name}<i
								style="display: none"
								class="fa-regular fa-square-minus"></i>
						</li>`
			)
		);
	}
	if (localStorage.getItem("drinksToDelete")) {
		JSON.parse(localStorage.getItem("drinksToDelete")).forEach((el) =>
			deletedDrinksArr.push(el)
		);
	}
	if (deletedDrinksArr.length) {
		deletedDrinksBtn.style.display = "block";
	}
	idCounter += storagedDrinks.length;
};

inputFilterEl.addEventListener("input", search);
addDrinkBtn.addEventListener("click", showModal);
deletedDrinksBtn.addEventListener("click", showDeletedDrinks);
clearStorageBtn.addEventListener("click", () => {
	deletePopupTextEl.textContent =
		"Usunąć pamięć lokalną i zresetować aplikację?";
	deletePopupEl.style.display = "flex";
	document.addEventListener("click", (e) => {
		if (e.target === deletePermamentBtn) {
			localStorage.clear();
			deletePopupEl.style.display = "none";
			Notify.success(
				"Pamięć lokalna usunięta. Strona zostanie przywrócona do stanu pierwotnego po odświerzeniu."
			);
		} else if (e.target === deleteCancelBtn) {
			deletePopupEl.style.display = "none";
		}
	});
});

const handleDeleteBtn = () => {
	const listItemEl = document.querySelectorAll("li");

	listItemEl.forEach((el) => {
		el.addEventListener("mouseover", (e) => {
			showDeleteBtn(+e.target.id);
		}),
			el.addEventListener("mouseleave", (e) => {
				hideDeleteBtn(+e.target.id);
			}),
			el.addEventListener("click", (e) => {
				if (e.target.nodeName !== "I") {
					showDescription(+e.target.id);
				}
			});
	});
};

updateList();
handleDeleteBtn();
