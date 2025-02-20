async function submitForm(event) {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        alert("צריך הרשמה לשלוח הודעה");
        return;
    }

    const typewrite = document.getElementById('typewrite').value;
    const productType = document.getElementById('selection').value;
    const price = document.querySelector('#priceDiv input').value;
    const imageInput = document.getElementById('image');
    const imageFile = imageInput.files[0];

    let size = '';
    switch (productType) {
        case 'mezuzah':
            size = document.getElementById('mezzouzaSize')?.value;
            break;
        case 'meguila':
            size = document.getElementById('meguilaSize')?.value;
            break;
        case 'torah':
            size = document.getElementById('seferTorahSize')?.value;
            break;
        case 'ketoret':
            size = document.getElementById('pitoumSize')?.value;
            break;
    }

    let tefilinType = productType === 'tefillin' ? document.getElementById('tefilinType').value : '';

    if (!imageFile) {
        alert("Veuillez sélectionner une image.");
        return;
    }

    const compressedImage = await resizeImage(imageFile);

    const productData = {
        typewrite,
        productType,
        size,
        tefilinType,
        price,
        image: compressedImage,
        userName: user.name
    };

    try {
        const response = await fetch('https://67adf2f59e85da2f020bd372.mockapi.io/post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData),
        });

        if (response.ok) {
            const newProduct = await response.json();
            displayProduct(newProduct);
            alert('המוצר נוסף בהצלחה!');
        } else {
            alert('אירעה שגיאה בשליחת הטופס');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('אירעה שגיאה בשליחת הטופס');
    }
}

function displayProduct(product, container = null) {
    if (!container) {
        container = document.getElementById(`${product.productType}-container`);
        if (!container) return;
    }

    const zoomContainerId = `zoom-${product.productType}-${Math.random().toString(36).substr(2, 9)}`;

    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
        <h2 style="border:2px solid black">${getHebrewProductType(product.productType)}</h2>
        <p><span style="color:red">סוג הכתב:</span>${getHebrewTypewrite(product.typewrite)}</p>
        ${product.size ? `<p><span style="color:red">גודל הכתב:</span> ${product.size}</p>` : ''}
        ${product.tefilinType ? `<p><span style="color:red">שיטה: </span>${getHebrewTefilinType(product.tefilinType)}</p>` : ''}
        <p><span style="color:red">מחיר:</span> ₪${product.price}</p>
        <p class="author"><span style="color:red">פורסם על ידי: </span>${product.userName || 'אנונימי'}</p>
        ${product.image ? `<div class="image-zoom-container" id="${zoomContainerId}">
            <img src="data:image/jpeg;base64,${product.image}" alt="${getHebrewProductType(product.productType)}">
        </div>` : ''}
        <button onclick='addToCart(${JSON.stringify(product)})'>🛒 Ajouter au panier</button>
    `;
    container.appendChild(productCard);

    if (product.image) {
        setTimeout(() => {
            const zoomElement = document.getElementById(zoomContainerId);
            if (zoomElement) {
                const options = {
                    width: 300,
                    height: 300,
                    zoomWidth: 500,
                    offset: { vertical: 0, horizontal: 50 },
                    scale: 1.5,
                    zoomPosition: 'right'
                };
                
                new ImageZoom(zoomElement, options);
            }
        }, 100);
    }
}

async function resizeImage(file) {
    return new Promise((resolve, reject) => {
        const img = document.createElement('img');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const reader = new FileReader();

        reader.onload = function(event) {
            img.src = event.target.result;
            img.onload = function() {
                const MAX_WIDTH = 800;
                const MAX_HEIGHT = 800;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);

                const base64Image = canvas.toDataURL('image/jpeg', 0.7);
                resolve(base64Image.split(',')[1]);
            };
        };

        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

async function fetchProductsByType(productType) {
    try {
        const response = await fetch('https://67adf2f59e85da2f020bd372.mockapi.io/post');
        if (response.ok) {
            const products = await response.json();
            const filteredProducts = products.filter(product => product.productType === productType);
            const container = document.getElementById(`${productType}-container`);
            if (container) {
                container.innerHTML = '';
                filteredProducts.forEach(product => displayProduct(product, container));
            }
        } else {
            console.error('Erreur lors du fetch des produits');
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    cart.push(product);
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    alert('Produit ajouté au panier !');
    updateCartCount();
}

function displayCart() {
    setTimeout(() => {
        const cartContainer = document.getElementById('cart-container');
        
        if (!cartContainer) {
            console.error('Container du panier non trouvé');
            return;
        }

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartContainer.innerHTML = '';

        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>cart Empty</p>';
            return;
        }

        let total = 0;
        cart.forEach((product, index) => {
            total += parseFloat(product.price);
            
            const item = document.createElement('div');
            item.className = 'cart-item';
            item.innerHTML = `
                <div class="cart-product-info">
                    <h3>${getHebrewProductType(product.productType)}</h3>
                    <p>סוג הכתב: ${getHebrewTypewrite(product.typewrite)}</p>
                    ${product.size ? `<p>גודל הכתב: ${product.size}</p>` : ''}
                    ${product.tefilinType ? `<p>שיטה: ${getHebrewTefilinType(product.tefilinType)}</p>` : ''}
                    <p>מחיר: ₪${product.price}</p>
                    ${product.userName ? `<p>מוכר: ${product.userName}</p>` : ''}
                </div>
                <button onclick="removeFromCart(${index})" class="remove-btn">❌ Supprimer</button>
            `;
            cartContainer.appendChild(item);
        });

        const totalElement = document.createElement('div');
        totalElement.className = 'cart-total';
        totalElement.innerHTML = `
            <h3>Total: ₪${total.toFixed(2)}</h3>
            <button class="checkout-btn" onclick="showPaymentForm()">Valider ma commande</button>
        `;
        cartContainer.appendChild(totalElement);
    }, 100);
}

function showPaymentForm() {
    const cartContainer = document.getElementById('cart-container');
    const form = document.createElement('form');
    form.className = 'payment-form';
    form.innerHTML = `
        <h3>Informations de paiement</h3>
        <label>Numéro de carte :</label>
        <input type="text" id="card-number" required>
        <label>Date d'expiration :</label>
        <input type="text" id="expiry-date" required>
        <label>CVV :</label>
        <input type="text" id="cvv" required>
        <button type="button" onclick="validateOrder()">Payer</button>
    `;
    cartContainer.appendChild(form);
}

function validateOrder() {
    alert('Paiement validé ! Votre commande a été envoyée au vendeur.');
    sendEmailToSeller();
    clearCart();
}

function sendEmailToSeller() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) return;

    cart.forEach(product => {
        const sellerEmail = localStorage.getItem(`email_${product.userName}`);
        if (sellerEmail) {
            console.log(`Envoi d'un email à ${sellerEmail} pour informer de la commande.`);
        }
    });
}

window.addEventListener('load', () => {
    if (window.location.hash === '#cart') {
        displayCart();
    }
});

window.addEventListener('hashchange', () => {
    if (window.location.hash === '#cart') {
        displayCart();
    }
});

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

function clearCart() {
    localStorage.setItem('cart', JSON.stringify([]));
    displayCart();
    updateCartCount();
    alert('the cart is Empty now !');
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.textContent = `🛒 ${cart.length}`;
    }
}

function proceedToCheckout() {
    
    alert('Fonctionnalité de paiement à venir!');
}

const cartRoute = {
    title: 'Panier',
    content: `
        <div class="cart-page">
            <h1>Mon Panier</h1>
            <div id="cart-container"></div>
        </div>
    `
};

document.addEventListener('DOMContentLoaded', function() {
    const styleSheet = document.createElement('style');
    document.head.appendChild(styleSheet);
    updateCartCount();
    if (window.location.hash === '#cart') {
        displayCart();
    }
});

function showSubSelection() {
    const selection = document.getElementById('selection');
    if (!selection) return;

    const selectionValue = selection.value;
    console.log('Selected value:', selectionValue); 

    const divMezzouza = document.getElementById('mezzouzaSizeDiv');
    const divMeguila = document.getElementById('meguilaSizeDiv');
    const divSeferTorah = document.getElementById('seferTorahSizeDiv');
    const divTefilin = document.getElementById('tefilinDiv');
    const divPitoum = document.getElementById('pitoumDiv');

    [divMezzouza, divMeguila, divSeferTorah, divTefilin, divPitoum].forEach(div => {
        if (div) div.style.display = 'none';
    });

    switch(selectionValue) {
        case 'mezuzah':
            if (divMezzouza) divMezzouza.style.display = 'block';
            break;
        case 'meguila':
            if (divMeguila) divMeguila.style.display = 'block';
            break;
        case 'torah':
            if (divSeferTorah) divSeferTorah.style.display = 'block';
            break;
        case 'tefillin':
            if (divTefilin) divTefilin.style.display = 'block';
            break;
        case 'ketoret':
            if (divPitoum) divPitoum.style.display = 'block';
            break;
    }
}

function getHebrewProductType(type) {
    const types = {
        'mezuzah': 'מזוזה',
        'torah': 'ספר תורה',
        'tefillin': 'תפילין',
        'ketoret': 'פיטום הקטורת',
        'meguila': 'מגילה'
    };
    return types[type] || type;
}

function getHebrewTypewrite(type) {
    const types = {
        'ari': 'ארי',
        'achkenaze': 'בית יוסף',
        'sefarade': 'ספרדי',
        'habbad': 'חבד'
    };
    return types[type] || type;
}

function getHebrewTefilinType(type) {
    const types = {
        'rachi': 'רשי',
        'rabenouTam': 'רבינו תם'
    };
    return types[type] || type;
}

function getSelectedFilters() {
    return {
        typewrite: document.querySelector('.typeWriter input[type="radio"]:checked')?.value,
        size: document.querySelector('.size input[type="radio"]:checked')?.value,
        price: document.getElementById('price')?.value
    };
}

function filterProducts(products, filters) {
    return products.filter(product => {
        const typewriteMatch = !filters.typewrite || 
            getHebrewTypewrite(product.typewrite) === filters.typewrite;
        
        const sizeMatch = !filters.size || 
            product.size === filters.size;
        
        const priceMatch = !filters.price || 
            parseInt(product.price) <= parseInt(filters.price);

        return typewriteMatch && sizeMatch && priceMatch;
    });
}

async function fetchProductsByType(productType) {
    try {
        const response = await fetch('https://67adf2f59e85da2f020bd372.mockapi.io/post');
        if (!response.ok) {
            throw new Error('Erreur réseau');
        }

        const products = await response.json();
        const container = document.getElementById(`${productType}-container`);
        if (!container) return;

        function updateDisplay() {
            const filters = getSelectedFilters();
            console.log('Filtres actuels:', filters);

            let filteredProducts = products.filter(p => p.productType === productType);
            filteredProducts = filterProducts(filteredProducts, filters);

            container.innerHTML = '';
            if (filteredProducts.length === 0) {
                container.innerHTML = '<p>Aucun produit ne correspond à vos critères</p>';
            } else {
                filteredProducts.forEach(product => displayProduct(product, container));
            }
        }

        const typewriteRadios = document.querySelectorAll('.typeWriter input[type="radio"]');
        const sizeRadios = document.querySelectorAll('.size input[type="radio"]');
        const priceRange = document.getElementById('price');

        typewriteRadios.forEach(radio => {
            radio.addEventListener('change', updateDisplay);
        });

        sizeRadios.forEach(radio => {
            radio.addEventListener('change', updateDisplay);
        });

        if (priceRange) {
            priceRange.addEventListener('input', updateDisplay);
        }

        updateDisplay();

    } catch (error) {
        console.error('Erreur:', error);
        const container = document.getElementById(`${productType}-container`);
        if (container) {
            container.innerHTML = '<p>Une erreur est survenue lors du chargement des produits</p>';
        }
    }
}

function resetFilters() {
    const radios = document.querySelectorAll('.sideFilter input[type="radio"]');
    radios.forEach(radio => radio.checked = false);
    
    const priceRange = document.getElementById('price');
    if (priceRange) {
        priceRange.value = 1000; 
        const priceValue = document.getElementById('priceValue');
        if (priceValue) {
            priceValue.textContent = '1000 NIS';
        }
    }
}

const resetButton = `
    <button onclick="resetFilters()" class="reset-filters">
        Réinitialiser les filtres
    </button>
`;
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.hash.substring(1) === 'home' || window.location.hash === '') {
        fetchProductsByType();
    }
    if (window.location.hash.substring(1) === 'cart') {
        displayCart();
    }
});
