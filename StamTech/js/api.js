function getPost() {
    fetch('https://67adf2f59e85da2f020bd372.mockapi.io/posts')
        .then(response => response.json())
        .then(post => {
            displayPost(post);
        })
};

function displayPost(posts) {
    const postList = document.getElementById('posts-list');
    if (!postList) return;
    
    postList.innerHTML = '';
    
    posts.forEach(post => {
        const li = document.createElement('li');
        li.innerHTML = `
        <h3>${post.title}</h3>
        <p><strong>Author</strong>${post.author}</p>
        <p>${post.content}</p>
        <p><small>${post.date}</small></p>
        `;
        postList.appendChild(li);
    });
}

function postPost() {
    const form = document.getElementById('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const price = parseFloat(document.getElementById('price').value);
        const imageUrl = document.getElementById('imageUrl').value;

        fetch("https://67adf2f59e85da2f020bd372.mockapi.io/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: title,
                content: content,
                price: price,
                imageUrl: imageUrl,
                author: localStorage.getItem(userData.name),
                date: new Date().toISOString()
            })
        })
        .then(response => response.json())
        .then(data => {
            alert("Post added successfully!");
            form.reset();
            window.location.hash = '#home';
        })
        .catch(error => {
            alert("Oops, something went wrong! Please try again.");
        });
    });
};

function displayPost(posts) {
    const postList = document.getElementById('posts-list');
    if (!postList) return;
    
    postList.innerHTML = ''; 
    
    posts.forEach(post => {
        const li = document.createElement('li');
        li.innerHTML = `
        <div class="post-card">
            ${post.imageUrl ? `<img src="${post.imageUrl}" alt="${post.title}" class="post-image">` : ''}
            <div class="post-content">
                <h3>${post.title}</h3>
                ${post.price !== undefined ? `<p class="post-price">$${post.price.toFixed(2)}</p>` : ''}
                <p><strong>Author:</strong> ${post.author}</p>
                <p>${post.content}</p>
                <p><small>${new Date(post.date).toLocaleDateString()}</small></p>
            </div>
        </div>
        `;
        postList.appendChild(li);
    });
};
