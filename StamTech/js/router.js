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
                </div>
        </div>
        <div class="home-post">
            <a href="#torah" class="card" data-typewrite="sefarade" data-size="17" data-price="500">
                <div class="overlay">Sefer Torah</div>
                <img src="https://talit4you.com/4543-large_default/sefer-torah-boitier-sefarade.jpg" alt="torah">
            </a>
            <a href="#mezuzah" class="card" data-typewrite="ari" data-size="12" data-price="300">
                <div class="overlay">Mezzouza</div>
                <img src="https://silverstore.fr/1855-superlarge_default/boitier-mezouza.jpg" alt="mezzouza">
            </a>
            <a href="#meguila" class="card" data-typewrite="habbad" data-size="21" data-price="400">
                <div class="overlay">Meguila</div>
                <img src="https://silverstore.fr/1372-medium_default_2x/boitier-meguila.jpg" alt="meguila">
            </a>
            <a href="#ketoret" class="card" data-typewrite="achkenaze" data-size="15" data-price="250">
                <div class="overlay">Pitum haketoret</div>
                <img src="https://www.adlers.fr/wp-content/uploads/2021/01/Packshot-Adlers-8-1-316x395.png" alt="pitumKetoret">
            </a>
            <a href="#tefillin" class="card" data-typewrite="sefarade" data-size="20" data-price="600">
                <div class="overlay">Tephilin</div>
                <img src="https://www.adlers.fr/wp-content/uploads/2021/01/Packshot-Adlers-12-1-316x395.png" alt="tefilin">
            </a>
        </div>
        `
    },
    torah: {
        title: 'Sefer Torah',
        content: `
        <div class="secondPage">
          <h1>Sefer Torah</h1>
          <div id="torah-container"></div>
          <div class="sidebar"></div>
          </div>
        `
    },
    mezuzah: {
        title: 'Mezuzah',
        content: `
        <div class="secondPage">
          <h1>Mezuzah</h1>
          <div id="mezuzah-container"></div>
          <div class="sidebar"></div>
     </div>
        `
    },
    tefillin: {
        title: 'Tefillin',
        content: `
        <div class="secondPage">
          <h1>Tefillin</h1>
          <div id="tefillin-container"></div>
          <div class="sidebar"></div>
             </div>
        `
    },
    ketoret: {
        title: 'Pitum Ketoret',
        content: `
        <div class="secondPage">
          <h1>Pitum Ketoret</h1>
          <div id="ketoret-container"></div>
          <div class="sidebar"></div>
             </div>
        `
    },
    meguila: {
        title: 'Meguila',
        content: `
        <div class="secondPage">
          <h1>Meguila</h1>
          <div id="meguila-container"></div>
          <div class="sidebar"></div>
          </div>
        `
    },
    addPost: {
        title: 'Add Post',
        container: 'post-container',
        content: `
        <form id="productForm" onsubmit="submitForm(event)">
        <h1>מוצר</h1>

        <div id="typeWriteDiv">
            <label for="typewrite">סוג הכתב</label>
            <select name="typewrite" id="typewrite">
                <option value="ari">ארי</option>
                <option value="achkenaze">בית יוסף</option>
                <option value="sefarade">ספרדי</option>
                <option value="habbad">חבד</option>
            </select>
        </div>

        <div id="type">
            <label for="type">סוג מוצרים</label>
            <select id="selection" name="type" onchange="showSubSelection()">
                <option value="mezuzah">מזוזה</option>
                <option value="torah">ספר תורה</option>
                <option value="tefillin">תפילין</option>
                <option value="ketoret">פיטום הקטורת</option>
                <option value="meguila">מגילה</option>
            </select>
        </div>

        <div id="mezzouzaSizeDiv" class="size" style="display: none;">
            <label for="mezzouzaSize size">גודל הכתב</label>
            <select id="mezzouzaSize" name="mezzouzaSize">
                <option value="12">12</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
            </select>
        </div>

        <div id="meguilaSizeDiv" class="size" style="display: none;">
            <label for="meguilaSize">גודל הכתב</label>
            <select id="meguilaSize" name="meguilaSize">
                <option value="12">11</option>
                <option value="15">21</option>
                <option value="20">28</option>
            </select>
        </div>

        <div id="seferTorahSizeDiv" class="size" style="display: none;">
            <label for="seferTorahSize">גודל הכתב</label>
            <select id="seferTorahSize" name="seferTorahSize">
                <option value="17">17</option>
                <option value="36">36</option>
                <option value="52">52</option>
                <option value="56">56</option>
            </select>
        </div>

        <div id="pitoumDiv" class="size" style="display: none;">
            <label for="pitoumSize">גודל הכתב</label>
            <select id="pitoumSize" name="pitoumSize">
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
            </select>
        </div>

        <div id="tefilinDiv" style="display: none;">
            <label for="tefilinDiv">איזה שיטה</label>
            <select id="tefilinDiv" name="tefilinDiv">
                <option value="rachi">רשי</option>
                <option value="rabenouTam">רבינו תם</option>
            </select>
        </div>

        <div id="imageDiv">
            <label for="image">העלאת תמונה</label>
            <input type="file" id="image" name="image">
        </div>

        <div id="priceDiv">
            <input type="text" placeholder="מחיר">
        </div>
        <input type="submit" value="שלח">
    </form>
        `
    },
    sidebar: {
        container: 'sidebar',
        content: `
                  <div class="sideFilter" dir="rtl">
           <div class="typeWriter">
              <input type="radio" name="category" value="ארי"> ארי
      <input type="radio" name="category" value="בית יוסף"> בית יוסף
      <input type="radio" name="category" value="ספרד"> ספרד
      <input type="radio" name="category" value="חבד"> חבד
    </div>
    <div class="size">
      <input type="radio" name="size" value="12">12
      <input type="radio" name="size" value="15">15
      <input type="radio" name="size" value="20">20
      <input type="radio" name="size" value="25">25
    </div>
    <label for="price">מחיר</label>
    <input type="range" id="price" min="0" max="1000" step="10">
  </div>`
    }
}
routers.cart = {
    title: 'Panier',
    content: `
        <div class="cart-page">
            <h1 style=color:brown>Cart</h1>
            <div id="cart-container" class="cart-container">
            </div>
            <div class="cart-actions">
                <button onclick="clearCart()" class="clear-cart-btn">empty cart</button>
            </div>
        </div>
    `
};

function updateRoute() {
    const hash = window.location.hash.substring(1);
    const route = routers[hash] || routers.home;
    const sidebarDiv = document.getElementById("sidebar");

    document.getElementById('app').innerHTML = route.content;
    document.title = route.title;

    if (hash === 'cart') {
        setTimeout(() => {
            displayCart();
        }, 0);
    }

    if (hash === 'torah' || hash === 'mezuzah' || hash === 'tefillin' || hash === 'ketoret' || hash === 'meguila') {
        sidebarDiv.innerHTML = routers.sidebar.content;
        fetchProductsByType(hash);
    } else {
        sidebarDiv.innerHTML = '';
    }

    if (hash === 'addPost') {
        setTimeout(() => {
            showSubSelection();
        }, 0);
    }
}
window.addEventListener('hashchange', updateRoute);
window.addEventListener('load', updateRoute);
