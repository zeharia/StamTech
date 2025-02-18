const routers = {
    home: {
        title: 'Home',
        container: 'home-container',
        content: `
        <img src="https://svbtleusercontent.com/vea1jhjjxbow.jpeg">
        <div class="home-text">Welcome to Sofer Blog</div>
        <div id="text-container">
            <div id="img-text">
                <img src="https://i.ytimg.com/vi/jlXbWiakMc0/maxresdefault.jpg">
            </div>
            <div id="text-content">
                <p>
                    Are you a writer or scribe looking to showcase your work and attract potential clients? 
                    Our blog is designed just for you! 
                    <br><br>
                    At Sofer Blog, we offer a space where talented writers can present their writing skills, 
                    share their best pieces, and connect with businesses in need of professional writing services.
                    <br><br>
                    Join our community, publish your work, and let your words open new opportunities!
                </p>
            </div>
        </div>
         <div class="home-post">
        <a href="torah.html" class="card">
            <div class="overlay">Sefer Torah</div>
            <img src="https://luvaton-13064.kxcdn.com/2279-home_default/the-eden-garden-torah-case.jpg" alt="torah">
        </a>
        <a href="mezzouza.html" class="card">
            <div class="overlay">Mezzouza</div>
            <img src="https://luvaton-13064.kxcdn.com/2109-home_default/habonim-mezuzah-ocean-colors.jpg" alt="mezzouza">
        </a>
        <a href="meguila.html" class="card">
            <div class="overlay">Meguila</div>
            <img src="https://www.mountsinai.co.il/wp-content/uploads/48248.jpg" alt="meguila">
        </a>
        <a href="pitumKetoret.html" class="card">
            <div class="overlay">Pitum haketoret</div>
            <img src="https://sefertorah.net/wp-content/uploads/2023/03/2759298003-1.jpg" alt="pitumKetoret">
        </a>
        <a href="tefilin.html" class="card">
            <div class="overlay">Tephilin</div>
            <img src="https://pluspng.com/img-png/tefillin-png--849.jpg" alt="tefilin">
        </a>
    </div>
        `
    },
    addPost: {
        title: 'Add Post',
        container: 'post-container',
        content: `
        <h1>Add your Post here!</h1>
        <form id="form">
            <label for="title">Title</label>
            <input type="text" id="title" name="title" required>
            
            <label for="price">Price ($)</label>
            <input type="number" id="price" name="price" min="0" step="0.01" required>
            
            <label for="imageUrl">Image URL</label>
            <input type="url" id="imageUrl" name="imageUrl" required>
            
            <label for="content">Content</label>
            <textarea id="content" name="content" required></textarea>
            
            <button type="submit">Publish</button>
        </form>
        `
    }
}

function updateRoute() {
    const hash = window.location.hash.substring(1);
    const route = routers[hash] || routers.home;

    document.getElementById('home-container').innerHTML = '';
    document.getElementById('post-container').innerHTML = '';

    if (route) {
        document.title = route.title;

        const container = document.getElementById(route.container);
        if (container) {
            container.innerHTML = route.content;
        }

        if (hash === 'home') {
            getPost();
        } else if (hash === 'addPost') {
            postPost();
        }
    } else {
        document.getElementById('home-container').innerHTML = `
        <h1>Error 404</h1>
        <p>Pages Not Found</p>
        `;
    }
}

window.addEventListener('hashchange', updateRoute);
window.addEventListener('load', updateRoute)