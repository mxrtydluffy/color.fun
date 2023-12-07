// COLOR & CART CODE

		// Example
		// .color-0 { background-color: red; }
		// .color-1 { background-color: green; }
		// .color-2 { background-color: blue; }


		// Generates unique HSL colors based on the index. These colors are then used to style swatches.
		function generateUniqueColor(index) {
        	const hue = (index * 2) % 490;
        	return `hsl(${hue}, 100%, 70%)`;
		}

		// Swatch creation creates a set number of color swatches (swatchCount) in a loop, each represented by a div element. 
		// These swatches have various attributes such as class names, dataset attributes (color and price), and background colors
		// assigned based on the generateUniqueColor function.
      	const swatchCount = 100;
      	for (let i = 0; i < swatchCount; i += 1) {
			const swatch = document.createElement("div");
			swatch.className = `swatch add-to-cart color-${i}`;
			swatch.dataset.color = `Color ${i}`;
			swatch.dataset.price = (Math.random() * 10).toFixed(2);
			swatch.style.backgroundColor = generateUniqueColor(i);
			document.querySelector(".swatches").appendChild(swatch);
		}

		const addForm = document.getElementById("add-form");
		const inputName = document.getElementById("name");
		const inputPrice = document.getElementById("price");
		const itemsList = document.getElementById("items");
		const divTotal = document.getElementById("total");

		// The script listens for clicks on the body and delegates the handling to the handleClicks function.
		// When a user clicks on a swatch (swatch class), it adds the selected color and price to the shopping cart.
		function handleClicks(e) {
			if (e.target.matches(".swatch")) {
				const color = e.target.dataset.color;
				const price = e.target.dataset.price;
				addToCart(color, price);
			}
		}

      document.querySelector("body").addEventListener("click", handleClicks);

		// The shopping cart is represented by an array (cart).
      	const cart = [];

      	document.querySelector("body").addEventListener("submit", function (e) {
			e.preventDefault();
			const name = inputName.value;
			const price = inputPrice.value;
			addToCart(name, price);
			showCart();
      	});

		document.querySelector("body").addEventListener("click", function (e) {
			if (e.target && e.target.classList.contains("remove")) {
				console.log(e.target.dataset.name);
				removeFromCart(e.target.dataset.name);
			} else if (e.target && e.target.classList.contains("add-one")) {
				addToCart(e.target.dataset.name);
			} else if (e.target && e.target.classList.contains("remove-one")) {
				removeFromCart(e.target.dataset.name, 1);
			}
		});

		document.querySelector("body").addEventListener("input", function (e) {
			if (e.target.matches(".update")) {
				const qty = parseInt(e.target.value);
				const name = e.target.dataset.name;
				updateCart(name, qty);
			}
		});
		
		function addToCart(name, price) {
			for (let i = 0; i < cart.length; i += 1) {
				if (cart[i].name === name) {
					cart[i].qty += 1;
					showCart();
					return true;
				}
			}
			cart.push({ name, price, qty: 1 });
			showCart();
      	}

		function removeFromCart(name, qty = 0) {
			console.log(name, qty);
			for (let i = 0; i < cart.length; i += 1) {
			if (cart[i].name === name) {
				if (qty) {
				let newQty = cart[i].qty - qty;
				if (newQty > 0) {
					cart[i].qty = newQty;
				} else {
					cart.splice(i, 1);
				}
				} else {
				cart.splice(i, 1);
				}
			}
			}
			showCart();
		}

		// Displays cart
		function showCart() {
			let str = "";
			for (let i = 0; i < cart.length; i += 1) {
			// Shopping cart list item!
			str += `
			<h2 class="shopping">
				<li>
					<span>
						<span>${cart[i].name}</span>
						<span>$${cart[i].price}</span> 
						<span>each x</span>
						<span>${cart[i].qty}</span> 
						<span> = </span>  
						<span>$${(cart[i].qty * cart[i].price).toFixed(2)}</span>
					</span>
					
					<span>
						<input class="update" data-name="${cart[i].name}" type="number" value="${
							cart[i].qty}">
						<button class="add-one" data-name="${cart[i].name}"> + </button>
						<button class="remove-one" data-name="${cart[i].name}"> - </button>
						<button class="remove" data-name="${cart[i].name}">remove</button>
					</span>
				</li>
			</h2> 
			`;
			}
			itemsList.innerHTML = str;
			divTotal.innerHTML = getTotal();
		}

		// Gets total
		function getTotal() {
			let total = 0;
			for (let i = 0; i < cart.length; i += 1) {
			total += cart[i].price * cart[i].qty;
			}
			return `$${total.toFixed(2)}`;
		}

		// Updates cart from shopping cart operations functions
		function updateCart(name, qty) {
			for (let i = 0; i < cart.length; i += 1) {
			if (cart[i].name === name) {
				cart[i].qty = qty;
				showCart();
				return true;
			}
			}
			return false;
		}

      	showCart();
      	getTotal();		