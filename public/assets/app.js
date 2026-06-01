const API = 'http://localhost:3000/api/productos';

// ─── Utilidades ───────────────────────────────────────────

function mostrarMensaje(texto, tipo = 'exito') {
  const el = document.getElementById('mensaje');
  el.textContent = texto;
  el.className = `mensaje ${tipo}`;
  setTimeout(() => { el.className = 'mensaje oculto'; }, 3000);
}

function mostrarError(texto) {
  const el = document.getElementById('errorFormulario');
  el.textContent = texto;
  el.className = 'error';
  setTimeout(() => { el.className = 'error oculto'; }, 3000);
}

// ─── GET: Cargar todos los productos ──────────────────────

async function cargarProductos() {
  const cargando = document.getElementById('cargando');
  const tabla = document.getElementById('tablaProductos');

  try {
    const respuesta = await fetch(API);
    if (!respuesta.ok) throw new Error('Error al cargar productos');

    const productos = await respuesta.json();

    cargando.classList.add('oculto');
    tabla.classList.remove('oculto');
    renderizarTabla(productos);

  } catch (error) {
    cargando.textContent = 'No se pudo conectar con el servidor.';
  }
}

function renderizarTabla(productos) {
  const cuerpo = document.getElementById('cuerpoTabla');
  cuerpo.innerHTML = '';

  productos.forEach(p => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${p.id}</td>
      <td>${p.nombre}</td>
      <td>$${p.precio.toLocaleString()}</td>
      <td>
        <span class="badge ${p.disponible ? 'disponible' : 'no-disponible'}">
          ${p.disponible ? 'Disponible' : 'No disponible'}
        </span>
      </td>
      <td>
        <button 
          class="btn-disponible ${p.disponible ? '' : 'no-disponible'}" 
          onclick="cambiarDisponibilidad(${p.id}, ${p.nombre ? `'${p.nombre}'` : ''}, ${p.precio}, ${p.disponible})">
          ${p.disponible ? '✅ Disponible' : '⚠️ No disponible'}
        </button>
        <button class="btn-eliminar" onclick="eliminarProducto(${p.id})">
          🗑️ Eliminar
        </button>
      </td>
    `;
    cuerpo.appendChild(fila);
  });
}

// ─── POST: Crear producto ──────────────────────────────────

async function agregarProducto() {
  const nombre = document.getElementById('nombre').value.trim();
  const precio = document.getElementById('precio').value.trim();
  const btn = document.getElementById('btnAgregar');

  if (!nombre || !precio) {
    mostrarError('nombre y precio son obligatorios');
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Agregando...';

  try {
    const respuesta = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, precio: Number(precio) })
    });

    if (!respuesta.ok) throw new Error('Error al crear producto');

    document.getElementById('nombre').value = '';
    document.getElementById('precio').value = '';
    mostrarMensaje('Producto agregado correctamente');
    cargarProductos();

  } catch (error) {
    mostrarMensaje('No se pudo agregar el producto', 'error-msg');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Agregar Producto';
  }
}

// ─── PUT: Cambiar disponibilidad ───────────────────────────

async function cambiarDisponibilidad(id, nombre, precio, disponibleActual) {
  try {
    const respuesta = await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre,
        precio,
        disponible: !disponibleActual
      })
    });

    if (!respuesta.ok) throw new Error('Error al actualizar');

    mostrarMensaje('Disponibilidad actualizada');
    cargarProductos();

  } catch (error) {
    mostrarMensaje('No se pudo actualizar el producto', 'error-msg');
  }
}

// ─── DELETE: Eliminar producto ─────────────────────────────

async function eliminarProducto(id) {
  const confirmacion = confirm('¿Estás segura de que deseas eliminar este producto?');
  if (!confirmacion) return;

  try {
    const respuesta = await fetch(`${API}/${id}`, {
      method: 'DELETE'
    });

    if (!respuesta.ok) throw new Error('Error al eliminar');

    mostrarMensaje('Producto eliminado correctamente');
    cargarProductos();

  } catch (error) {
    mostrarMensaje('No se pudo eliminar el producto', 'error-msg');
  }
}

// ─── Evento del botón ─────────────────────────────────────

document.getElementById('btnAgregar').addEventListener('click', agregarProducto);

// ─── Cargar productos al abrir la página ──────────────────

cargarProductos();