# Catálogo Moños Mágicos - Guía de Administración

## 📋 Cómo Agregar/Eliminar Productos Fácilmente

### ✨ Agregar un Nuevo Producto

Para agregar un nuevo moño al catálogo, simplemente edita el archivo `productos.json` y agrega un nuevo objeto en el array "productos":

```json
{
  "id": 9,
  "nombre": "Moño Nuevo Estilo",
  "precio": 32.00,
  "categoria": "elegantes",
  "imagen": "moños/nuevo_moño.png",
  "descripcion": "Descripción del nuevo moño",
  "disponible": true
}
```

### 🗑️ Eliminar un Producto

Para eliminar un producto, simplemente borra su objeto completo del archivo `productos.json` o cambia `"disponible": false`.

### 🖼️ Agregar Imágenes

1. **Coloca la imagen** en la carpeta correspondiente:
   - Moños → `moños/`
   - Diademas → `diademas/`
   - Balerinas → `balerinas/`

2. **Actualiza la ruta** en el archivo JSON:
   ```json
   "imagen": "moños/mi_nueva_imagen.png"
   ```

3. **Formatos recomendados**:
   - PNG, JPG, JPEG, WEBP
   - Tamaño recomendado: 400x400px
   - Peso máximo: 500KB para mejor rendimiento

### 🏷️ Categorías Disponibles

- `"clasicos"` → Moños Clásicos
- `"elegantes"` → Moños Elegantes  
- `"infantiles"` → Moños Infantiles
- `"accesorios"` → Accesorios

### 📋 Campos Obligatorios

| Campo | Tipo | Descripción | Ejemplo |
|-------|------|-------------|---------|
| `id` | Número | Identificador único | `9` |
| `nombre` | Texto | Nombre del producto | `"Moño Rosa Elegante"` |
| `precio` | Número | Precio en dólares | `25.00` |
| `categoria` | Texto | Categoría del producto | `"elegantes"` |
| `imagen` | Texto | Ruta de la imagen | `"moños/moño_1.png"` |
| `descripcion` | Texto | Descripción del producto | `"Hermoso moño..."` |
| `disponible` | Boolean | Si está disponible | `true` o `false` |

### 🔄 Agregar Nueva Categoría

1. **Agrega la categoría** al array "categorias" en `productos.json`:
```json
{
  "id": "nueva_categoria",
  "nombre": "Nueva Categoría",
  "activa": false
}
```

2. **Asigna productos** a esa categoría usando el `id` de la categoría.

### 💡 Ejemplos Prácticos

#### Agregar un moño navideño:
```json
{
  "id": 10,
  "nombre": "Moño Navideño Especial",
  "precio": 35.00,
  "categoria": "elegantes",
  "imagen": "moños/navidad_2024.png",
  "descripcion": "Hermoso moño temático navideño con detalles dorados y rojos",
  "disponible": true
}
```

#### Marcar producto como agotado:
```json
{
  "id": 5,
  "nombre": "Moño Vintage",
  "precio": 28.00,
  "categoria": "clasicos",
  "imagen": "moños/moños_5.png",
  "descripcion": "Estilo retro con un toque moderno y sofisticado",
  "disponible": false
}
```

### 🚀 Ventajas de Este Sistema

✅ **No necesitas tocar código HTML/CSS/JS**  
✅ **Solo editas un archivo JSON simple**  
✅ **Las imágenes se cargan automáticamente**  
✅ **Fallback automático a emoji si la imagen falla**  
✅ **Filtrado automático por categorías**  
✅ **Sistema de disponibilidad integrado**  
✅ **Responsive y optimizado**  

### 🔧 Troubleshooting

**¿La imagen no carga?**
- Verifica que la ruta sea correcta
- Asegúrate de que el archivo existe
- Comprueba que el formato sea compatible (PNG, JPG, JPEG, WEBP)

**¿No aparece el producto?**
- Verifica que el JSON sea válido (sin comas extra al final)
- Comprueba que todos los campos obligatorios estén presentes
- Asegúrate de que `"disponible": true`

**¿Categoría no funciona?**
- Verifica que exista en el array "categorias"
- Comprueba que el `id` de categoría coincida exactamente

### 📞 Soporte

Si necesitas ayuda adicional o quieres agregar funcionalidades más avanzadas, no dudes en preguntar.
