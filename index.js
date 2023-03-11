const inputFilterEl = document.getElementById("filter");
const drinksEl = document.querySelectorAll("li");

const search = (e) => {
    
    const text = e.target.value.toLowerCase();
    
    drinksEl.forEach((item) => {
        
		if (item.textContent.toLowerCase().includes(text)) {
			return (item.style.display = "block");
		}
		return (item.style.display = "none");
	});
};

inputFilterEl.addEventListener("input", search);
