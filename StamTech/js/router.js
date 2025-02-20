const routers = {
    home: {
        title: 'Home',
        container: 'home-container',
        content: `
        <img src="https://svbtleusercontent.com/vea1jhjjxbow.jpeg">
        <div class="home-text">ברוכים הבאים לסתמטאק</div>
        <div id="text-container">
            <div id="img-text">
                <img src="https://i.ytimg.com/vi/jlXbWiakMc0/maxresdefault.jpg">
            </div>
            <div id="text-content">
                 <p>
                סתמטאק הוא אתר ייחודי המציע פלטפורמה המפגישה בין סופרי סתם מקצועיים לבין לקוחות המעוניינים בכתיבה מותאמת אישית. באתר, סופרי סתם מנוסים מעלים את הכתבים שלהם, ובכך מאפשרים ללקוחות לבחור מתוך מבחר מגוון של כתבים את הכתיבה המתאימה ביותר לצרכים האישיים שלהם.
                </p>
                <p>בין אם מדובר בכתיבה של ספר תורה תפילין מזוזות מגילת אסתר או כל כתב קודש - סתמטאק מציע פתרון פשוט ונגיש למציאת הסופר המתאים ביותר. האתר מציע חוויית משתמש קלה וידידותית, בה הלקוחות יכולים לקרוא ביקורות על הסופרים, לראות דוגמאות כתיבה, ולהזמין את השירות המתאים להם.</p>
                <p>
                האתר מהווה גשר בין סופרי סתם מוכשרים לבין הציבור, תוך שמירה על מקצועיות, אמינות וסטנדרטים גבוהים של איכות. 
                </p>
            </div>
        </div>
         <div class="home-post">
        <a href="torah.html" class="card">
            <div class="overlay">Sefer Torah</div>
            <img src="https://luvaton-13064.kxcdn.com/2279-home_default/the-eden-garden-torah-case.jpg" alt="ספרי תורה">
        </a>
        <a href="mezzouza.html" class="card">
            <div class="overlay">Mezzouza</div>
            <img src="https://luvaton-13064.kxcdn.com/2109-home_default/habonim-mezuzah-ocean-colors.jpg" alt="מזוזות">
        </a>
        <a href="meguila.html" class="card">
            <div class="overlay">Meguila</div>
            <img src="https://www.mountsinai.co.il/wp-content/uploads/48248.jpg" alt="מגילות אסתר">
        </a>
        <a href="pitumKetoret.html" class="card">
            <div class="overlay">Pitum haketoret</div>
            <img src="https://sefertorah.net/wp-content/uploads/2023/03/2759298003-1.jpg" alt="פיטום הקטורת">
        </a>
        <a href="tefilin.html" class="card">
            <div class="overlay">Tephilin</div>
            <img src="https://pluspng.com/img-png/tefillin-png--849.jpg" alt="תפילין">
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