# Pieca® — Plataforma E-Commerce de Rocas y Minerales

> *"Entregándote las mejores piedras para ti."*
> 

---

## Descripción del Proyecto

**Pieca®** es una plataforma web integral de comercio electrónico diseñada para la exhibición, catalogación y comercialización de ejemplares geológicos y rocas naturales. El sistema conecta a fanáticos de las piedras con productos recolectados manualmente, ofreciendo una experiencia interactiva para consultar especificaciones físicas completas (peso, dimensiones, volumen), gestionar un carro de compras y procesar pedidos.

---

## Funcionalidades Principales

* **Catálogo Dinámico e Interactivo:** Carga y renderizado automático del inventario desde fuentes JSON, con un buscador en tiempo real por coincidencia de texto.


* **Carrusel de Portada:** Desplazamiento dinámico en la página principal con citas temáticas aleatorias y cálculo de posiciones relativas.


* **Detalle de Producto:** Vista detallada de especificaciones físicas (peso, altura, anchura, longitud, volumen, costo de envío y precio formateado en CLP mediante `Intl.NumberFormat`).


* **Autenticación y Validación de Clientes:**
* Almacenamiento local de sesión mediante `localStorage`.
* Validación estricta de dominios de correo permitidos (`@duoc.cl`, `@profesor.duoc.cl` y `@gmail.com`).
* Validación algorítmica de RUT chileno usando el cálculo de Módulo 11 para la verificación del dígito verificador.


* **Carrito de Compras Persistente:** Modificación de cantidades unitarias, eliminación de ítems por ID y cálculo automático del total de la orden.
* **Comprobante y Estado de Envío:** Generación de recibo digital tras el checkout con estado de procesamiento y fecha del pedido.
* **Panel de Administración (`admin.html`):**
* Vista de inventario con opción para añadir nuevos productos Pieca o eliminarlas del catálogo.
* Gestión simulada de usuarios registrados con visualización de RUT y roles.
* Registro histórico de transacciones comerciales y boletas emitidas.


* **Módulo de Blog:** Sección de artículos informativos y divulgación geológica con acceso desde el pie de página.
* **Navegación Condicional:** Encabezado y pie de página estandarizados que adaptan sus enlaces según si el usuario ha iniciado sesión.

---

## Estructura del Proyecto

```text
pieca-e-commerce/
├── index.html            # Landing page con banner interactivo, carrusel y sección informativa
├── catalog.html          # Catálogo completo con buscador dinámico
├── product.html          # Vista de ficha técnica individual del producto
├── cart.html             # Gestión de ítems agregados y cálculo total
├── receipt.html          # Comprobante de compra y seguimiento del pedido
├── login.html            # Acceso de usuarios
├── register.html         # Formulario de registro con validación de RUT y correo
├── admin.html            # Panel de control de inventario, usuarios y ventas
├── blog.html             # Sección de artículos Pieca y noticias
├── contact.html          # Formulario de contacto con validación de campos
└── assets/
    ├── css/
    │   └── main.css      # Hoja de estilos global, temas oscuros, tablas y transiciones
    ├── js/
    │   ├── global.js     # Control de sesión y renderizado del header y footer dinámicos
    │   ├── main.js       # Inicialización del carrusel y animaciones de la portada
    │   ├── catalog.js    # Consumo de datos y filtrado de productos
    │   ├── product.js    # Lógica de carga de especificaciones y adición al carrito
    │   ├── cart.js       # Control de cantidades, borrado y proceso de checkout
    │   ├── account.js    # Validaciones de Módulo 11 (RUT), dominios y registro
    │   ├── admin.js      # Controlador de pestañas del panel, bajas y altas de stock
    │   └── contact.js    # Manejo del formulario de contacto
    │   └── receipt.js    # Manejo de la boleta
    ├── data.json         # Base de datos de inventario base en formato JSON
    └── images/           # Recursos gráficos y fotografías de los productos

```

---
| ID | Nombre | Peso (g) | Altura (cm) | Anchura (cm) | Longitud (cm) | Volumen (cm³) | Precio (CLP) |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| `0` | Piedra algo ovalada | 98 | 53 | 65 | 45 | 155.122 | $1.299 |
| `1` | Piedra más ovalada | 402 | 37 | 52 | 6 | 11.819 | $1.499 |
| `2` | Piedra | 305 | 27 | 9 | 42 | 10.147 | $4.999 |
| `3` | Piedra rocosa | 540 | 3 | 69 | 75 | 13.059 | $4.299 |
| `4` | Piedra porosa | 291 | 37 | 41 | 4 | 5.650 | $1.299 |
| `5` | Piedra piedrosa | 15 | 13 | 42 | 10 | 5.347 | $1.899 |
| `6` | Piedra plana | 28 | 58 | 55 | 26 | 82.754 | $4.099 |
| `7` | Piedra no plana | 617 | 60 | 39 | 110 | 258.565 | $1.399 |
| `8` | Piedra puntiaguda | 83 | 21 | 13 | 60 | 16.568 | $2.799 |
| `9` | Piedra blanca | 144 | 11 | 34 | 66 | 24.836 | $1.899 |
| `10` | Piedra no blanca | 677 | 6 | 20 | 17 | 2.130 | $1.099 |
| `11` | Piedra café | 229 | 56 | 12 | 16 | 10.875 | $2.599 |
| `12` | Piedra bipolar | 558 | 35 | 113 | 5 | 19.604 | $3.199 |
| `13` | Piedra negra | 40 | 23 | 8 | 52 | 9.843 | $3.299 |
| `14` | Piedra ondulada | 21 | 16 | 22 | 14 | 4.928 | $1.299 |
| `15` | Piedra Stone | 21 | 16 | 22 | 14 | 4.928 | $2.199 |
| `16` | Piedra musgosa | 15 | 45 | 12 | 27 | 14.580 | $1.399 |
| `17` | Piedra Peresoza | 4 | 15 | 25 | 17 | 6.375 | $1.499 |
| `18` | Piedra Sigma | 12.000 | 405 | 154 | 80 | 62.370 | $4.206.767 |
---

## Tecnologías y Estándares de Implementación

* **Frontend:** HTML5 semántico estructurado en módulos claros.


* **Hojas de Estilo:** CSS3 vanilla con diseño responsivo, Flexbox, CSS Grid y variables de color en tonos oscuros.


* **Lógica del Cliente:** JavaScript estándar (ES6+) con carga diferida (`defer`).


* **Persistencia:** Simulación completa del estado de sesión, carrito de compras, recibos y modificaciones del inventario a traves de "Web Storage API" (`localStorage`).
* **Reglas de Entrada:** Validación de expresiones regulares en formularios (`oninput` y atributos `pattern`).



---

## Derechos de Autor

© 2026 Pieca®. Todos los derechos reservados.
