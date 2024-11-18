const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        themeIcon.style.color = 'white';
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        themeIcon.style.color = 'black';
        localStorage.setItem('theme', 'light');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        themeIcon.style.color = 'white';
    }
});

themeToggleBtn.addEventListener('click', toggleTheme);


document.getElementById('userIcon').onclick = function () {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        const confirmLogout = confirm('Do you want to log out?');
        if (confirmLogout) {
            localStorage.removeItem('loggedInUser');
            updateUI();
            alert('You have been logged out.');
        }
    } else {
        document.getElementById('loginModal').style.display = 'flex';
    }
};

function login() {
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;
    const registeredUser = JSON.parse(localStorage.getItem('user'));

    if (registeredUser && registeredUser.name === username && registeredUser.password === password) {
        localStorage.setItem('loggedInUser', JSON.stringify(registeredUser));
        updateUI();
        closeModal();
    } else {
        alert('Invalid username or password!');
    }
}

function signUp() {
    const name = document.getElementById('signUpName').value.trim();
    const email = document.getElementById('signUpEmail').value.trim();
    const password = document.getElementById('signUpPassword').value;

    if (!name || !email || !password) {
        alert('Please fill in all fields.');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return;
    }

    const user = { name, email, password };
    localStorage.setItem('user', JSON.stringify(user));
    alert('Sign-up successful! Please log in.');
    closeModal();
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function closeModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('signUpModal').style.display = 'none';
}

function updateUI() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        document.getElementById('userStatus').textContent = `Logged in as ${loggedInUser.name}`;
    } else {
        document.getElementById('userStatus').textContent = 'Log In';
    }
}

document.addEventListener('DOMContentLoaded', updateUI);

document.getElementById('passwordInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        login();
    }
});

// фильтрация

function applyFilter() {
    const selectedCategory = document.getElementById('filterSelect').value;
    const productContainer = document.getElementById('productContainer');
    const products = [
        { name: 'Airpods Max', price: '180,000 тг', img: 'https://www.apple.com/v/airpods-max/f/images/overview/hero__gnfk5g59t0qe_xlarge_2x.png', category: 'headphones', page: 'practice1.html' },
        { name: 'iPhone 16 pro', price: '800,000 тг', img: 'https://cdn0.ipoint.kz/AfrOrF3gWeDA6VOlDG4TzxMv39O7MXnF4CXpKUwGqRM/resize:fill:540/bg:f6f6f6/q:100/plain/s3://catalog-products/240909224113782339/240911100025627334.png', category: 'phones', page: 'iphone16pro.html' },
        { name: 'Apple Watch', price: '150,000 тг', img: 'https://www.apple.com/v/watch/bo/images/overview/select/product_s10__deak4mdempoy_xlarge_2x.png', category: 'watches', page: 'applewatch.html' },
        { name: 'iPhone 15 pro', price: '700,000 тг', img: 'https://api.technodom.kz/f3/api/v1/images/800/800/smartfon_gsm_apple_iphone_15_pro_128gb_81286148_natural_titanium_mtux3_274404_4.jpg', category: 'phones', page: 'iphone15pro.html' }
    ];

    const filteredProducts = selectedCategory === 'all' ? products : products.filter(product => product.category === selectedCategory);
    productContainer.innerHTML = '';
    filteredProducts.forEach(product => {
        const productElement = `
            <div class="col">
                <div class="card">
                    <img src="${product.img}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.price}</p>
                        <a class="btn btn-primary" href="${product.page}">Buy</a>
                    </div>
                </div>
            </div>`;
        productContainer.innerHTML += productElement;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const savedCategory = localStorage.getItem('selectedCategory') || 'all';
    document.getElementById('filterSelect').value = savedCategory;
    applyFilter();
});

document.getElementById('filterSelect').addEventListener('change', applyFilter);

function openSignUpModal() {
    document.getElementById('signUpModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('signUpModal').style.display = 'none';
    document.getElementById('loginModal').style.display = 'none';
}

function toggleAnswer(id, element) {
    const answer = document.getElementById(id);
    const icon = element.querySelector('i');
    
    if (answer.style.display === 'none' || answer.style.display === '') {
        answer.style.display = 'block';
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
    } else {
        answer.style.display = 'none';
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
    }
}

function searchProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const productContainer = document.getElementById('productContainer');
    const products = [
        { name: 'Airpods Max', price: '180,000 тг', img: 'https://www.apple.com/v/airpods-max/f/images/overview/hero__gnfk5g59t0qe_xlarge_2x.png', category: 'headphones', page: './practice1.html' },
        { name: 'iPhone 16 pro', price: '800,000 тг', img: 'https://cdn0.ipoint.kz/AfrOrF3gWeDA6VOlDG4TzxMv39O7MXnF4CXpKUwGqRM/resize:fill:540/bg:f6f6f6/q:100/plain/s3://catalog-products/240909224113782339/240911100025627334.png', category: 'phones', page: './iphone16pro.html' },
        { name: 'Apple Watch', price: '150,000 тг', img: 'https://www.apple.com/v/watch/bo/images/overview/select/product_s10__deak4mdempoy_xlarge_2x.png', category: 'watches', page: './applewatch.html' },
        { name: 'iPhone 15 pro', price: '700,000 тг', img: 'https://api.technodom.kz/f3/api/v1/images/800/800/smartfon_gsm_apple_iphone_15_pro_128gb_81286148_natural_titanium_mtux3_274404_4.jpg', category: 'phones', page: './iphone15pro.html' }
    ];

    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
    productContainer.innerHTML = '';

    if (filteredProducts.length === 0) {
        productContainer.innerHTML = `<p class="text-center">No products found</p>`;
        return;
    }

    filteredProducts.forEach(product => {
        const productElement = `
            <div class="col">
                <div class="card">
                    <img src="${product.img}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.price}</p>
                        <a class="btn btn-primary" href="${product.page}">Buy</a>
                    </div>
                </div>
            </div>`;
        productContainer.innerHTML += productElement;
    });
}

document.getElementById('searchButton').addEventListener('click', searchProducts);
document.getElementById('searchInput').addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        searchProducts();
    }
});

// тест

