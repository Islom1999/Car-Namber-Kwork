const closeModalBtn = document.querySelector('.close-modal__btn');
document.addEventListener("DOMContentLoaded", function () {

	const query = {}

	document.querySelectorAll(".num__content").forEach((elem) => {
		var name = elem.getAttribute('data-bs-value');
		const value = elem.textContent.trim()
		if(value != '*') query[name] = value.toUpperCase();
	})


	document.querySelectorAll(".number_menu").forEach(function (menu) {
		menu.addEventListener("click", function (event) {
			var target = event.target;
			if (target.tagName === "LI") {
				var input = target.closest(".wrap-item-group").querySelector(".num__content");
				var ac__class = target.closest(".wrap-item-group").querySelector(".ac__class");
				
				if (ac__class) {
					ac__class.classList.add('num__content--active');
				}
				if (input) {
					input.textContent = target.textContent;
					document.querySelectorAll('.number_menu').forEach(item => {
						item.classList.remove('active');
						document.querySelector('.number_menu--close').classList.remove('active');
					});
				}
				var name = input.getAttribute('data-bs-value');
				var value = input.textContent.toUpperCase();
				query[name] = value;	
			}
		});
	});

	document.querySelector('#filter-btn').addEventListener('click',(event) => {
		event.preventDefault()

		const params = new URLSearchParams(query)
		const url = `/admin/numbers?${params.toString()}`;

		// Foydalanuvchini yangi URL manziliga yo'naltirish
		window.location.href = url;
	})

	document.querySelector('.number_menu--close').addEventListener('click', function (event) {
		document.querySelectorAll('.number_menu').forEach(item => {
			item.classList.remove('active');
			document.querySelector('.number_menu--close').classList.remove('active');
		});
	})

	document.querySelectorAll(".num__content").forEach(function (menu) {
		menu.addEventListener("click", function (event) {
			var number_menu = event.target.closest(".wrap-item-group").querySelector(".number_menu");
			document.querySelectorAll('.number_menu').forEach(item => {
				item.classList.remove('active');
				document.querySelector('.number_menu--close').classList.remove('active');
			});
			number_menu.classList.add('active');
			document.querySelector('.number_menu--close').classList.add('active');
		});
	});
});

let homeModalBoolean = true;
const modalCloseBody = document.querySelector('.close-modal__body');
const homeModal = document.querySelector('.home-modal');
document.querySelectorAll('.puy-modal__btn').forEach(btn => {
	btn.addEventListener("click", () => {
		if (homeModalBoolean) {
			document.body.style.overflow = "hidden";
			homeModal.classList.add('active');
			modalCloseBody.classList.add('closeModal--active');
			closeModalBtn.classList.add('close-modal__btn--active')
			homeModalBoolean = false
		}
	});
})

modalCloseBody.addEventListener('click', () => {
	if (homeModalBoolean !== true) {
		homeModal.classList.remove('active');
		modalCloseBody.classList.remove('closeModal--active');
		closeModalBtn.classList.remove('close-modal__btn--active');
		document.body.style.overflow = "auto";
		homeModalBoolean = true
	}
	if (navbarBoolean !== true) {
		document.querySelector('.navbar-menu').classList.remove('active');
		modalCloseBody.classList.remove('closeModal--active');
		navbarBoolean = true;
	}
})


closeModalBtn.addEventListener('click', () => {
	if (homeModalBoolean !== true) {
		document.body.style.overflow = "auto";
		modalCloseBody.classList.remove('closeModal--active');
		homeModal.classList.remove('active');
		closeModalBtn.classList.remove('close-modal__btn--active');
		homeModalBoolean = true
	}
});
let navbarBoolean = true;
function navbar() {
	if (navbarBoolean) {
		modalCloseBody.classList.add('closeModal--active');
		document.querySelector('.navbar-menu').classList.add('active');
		navbarBoolean = false;
	}
}
document.querySelector('.navbar-menu__btn').addEventListener('click', () => {
	if (navbarBoolean !== true) {
		document.querySelector('.navbar-menu').classList.remove('active');
		modalCloseBody.classList.remove('closeModal--active');
		navbarBoolean = true;
	}
})