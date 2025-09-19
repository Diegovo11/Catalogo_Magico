// ===== VARIABLES GLOBALES =====
let productosData = null;
let categoriaActual = 'todos';

// ===== FUNCIONALIDAD DE TRANSICIÓN DE PANTALLAS =====

// Transición automática después de 4 segundos
setTimeout(() => {
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainCatalog = document.getElementById('main-catalog');
    
    // Desvanecer pantalla de bienvenida
    welcomeScreen.style.opacity = '0';
    welcomeScreen.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        mainCatalog.classList.remove('hidden');
        
        // Animar entrada del catálogo
        setTimeout(() => {
            mainCatalog.style.opacity = '1';
            mainCatalog.style.transform = 'translateY(0)';
            
            // Cargar productos después de la transición
            cargarProductos();
        }, 50);
    }, 800);
}, 4000);

// ===== CARGA DE DATOS =====

// Función para cargar productos desde JSON
async function cargarProductos() {
    try {
        mostrarCargando();
        const response = await fetch('productos.json');
        productosData = await response.json();
        
        renderizarCategorias();
        renderizarProductos(productosData.productos);
        configurarEventListeners();
        
    } catch (error) {
        console.error('Error al cargar productos:', error);
        mostrarError('Error al cargar los productos. Por favor, recarga la página.');
    }
}

// ===== RENDERIZADO DE COMPONENTES =====

// Renderizar categorías dinámicamente
function renderizarCategorias() {
    const navContainer = document.getElementById('catalog-nav');
    navContainer.innerHTML = '';
    
    productosData.categorias.forEach(categoria => {
        const btn = document.createElement('button');
        btn.className = `nav-btn ${categoria.activa ? 'active' : ''}`;
        btn.textContent = categoria.nombre;
        btn.setAttribute('data-categoria', categoria.id);
        navContainer.appendChild(btn);
    });
}

// Renderizar productos dinámicamente
function renderizarProductos(productos) {
    const gridContainer = document.getElementById('products-grid');
    gridContainer.innerHTML = '';
    
    productos.forEach(producto => {
        if (categoriaActual === 'todos' || producto.categoria === categoriaActual) {
            const productCard = crearTarjetaProducto(producto);
            gridContainer.appendChild(productCard);
        }
    });
    
    // Configurar eventos de los botones de carrito
    configurarBotonesCarrito();
}

// Crear tarjeta individual de producto
function crearTarjetaProducto(producto) {
    const card = document.createElement('div');
    card.className = `product-card ${!producto.disponible ? 'product-unavailable' : ''}`;
    card.setAttribute('data-id', producto.id);
    
    card.innerHTML = `
        <div class="product-image">
            ${crearImagenProducto(producto)}
        </div>
        <h3 class="product-name">${producto.nombre}</h3>
        <p class="product-description">${producto.descripcion}</p>
        <p class="product-price">$${producto.precio.toFixed(2)}</p>
        <button class="add-to-cart" ${!producto.disponible ? 'disabled' : ''}>
            ${producto.disponible ? 'Agregar al Carrito' : 'No Disponible'}
        </button>
    `;
    
    return card;
}

// Crear imagen del producto con fallback
function crearImagenProducto(producto) {
    return `
        <img src="${producto.imagen}" 
             alt="${producto.nombre}"
             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
             loading="lazy">
        <div class="emoji-placeholder" style="display: none;">🎀</div>
    `;
}

// ===== EVENT LISTENERS =====

// Configurar todos los event listeners
function configurarEventListeners() {
    // Event listeners para navegación
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const categoria = e.target.getAttribute('data-categoria');
            cambiarCategoria(categoria, e.target);
        });
    });
}

// Configurar botones de carrito
function configurarBotonesCarrito() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (btn.disabled) return;
            
            const productCard = e.target.closest('.product-card');
            const productId = parseInt(productCard.getAttribute('data-id'));
            const producto = productosData.productos.find(p => p.id === productId);
            
            if (producto) {
                agregarAlCarrito(producto, btn);
            }
        });
    });
}

// ===== FUNCIONALIDAD DEL CATÁLOGO =====

// Cambiar categoría activa
function cambiarCategoria(nuevaCategoria, btnElement) {
    categoriaActual = nuevaCategoria;
    
    // Actualizar botones activos
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    btnElement.classList.add('active');
    
    // Filtrar y mostrar productos
    filtrarProductos(nuevaCategoria);
}

// Filtrar productos con animación
function filtrarProductos(categoria) {
    const productCards = document.querySelectorAll('.product-card');
    
    // Animación de salida
    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
    });
    
    setTimeout(() => {
        renderizarProductos(productosData.productos);
        
        // Animación de entrada
        setTimeout(() => {
            const newCards = document.querySelectorAll('.product-card');
            newCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, index * 100);
            });
        }, 50);
    }, 200);
}

// Agregar producto al carrito
function agregarAlCarrito(producto, btnElement) {
    // Efecto visual de agregado
    btnElement.style.background = '#10b981';
    btnElement.textContent = '¡Agregado!';
    
    setTimeout(() => {
        btnElement.style.background = '';
        btnElement.textContent = 'Agregar al Carrito';
    }, 1500);
    
    // Mostrar notificación
    mostrarNotificacion(`${producto.nombre} agregado al carrito`);
    
    // Aquí puedes agregar lógica del carrito real
    console.log('Producto agregado:', producto);
}

// ===== FUNCIONES DE UI =====

// Mostrar indicador de carga
function mostrarCargando() {
    const gridContainer = document.getElementById('products-grid');
    gridContainer.innerHTML = '<div class="loading">Cargando productos...</div>';
}

// Mostrar mensaje de error
function mostrarError(mensaje) {
    const gridContainer = document.getElementById('products-grid');
    gridContainer.innerHTML = `<div class="loading" style="color: #ef4444;">${mensaje}</div>`;
}

// Mostrar notificaciones
function mostrarNotificacion(mensaje) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = mensaje;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #6b46c1, #ec4899);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ===== FUNCIONES DE ADMINISTRACIÓN =====

// Función para agregar nuevo producto (para uso futuro)
function agregarNuevoProducto(nuevoProducto) {
    productosData.productos.push({
        ...nuevoProducto,
        id: Math.max(...productosData.productos.map(p => p.id)) + 1
    });
    renderizarProductos(productosData.productos);
}

// Función para eliminar producto (para uso futuro)
function eliminarProducto(id) {
    productosData.productos = productosData.productos.filter(p => p.id !== id);
    renderizarProductos(productosData.productos);
}

// Función para actualizar producto (para uso futuro)
function actualizarProducto(id, datosActualizados) {
    const index = productosData.productos.findIndex(p => p.id === id);
    if (index !== -1) {
        productosData.productos[index] = { ...productosData.productos[index], ...datosActualizados };
        renderizarProductos(productosData.productos);
    }
}
