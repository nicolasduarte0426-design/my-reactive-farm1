# Cuestionario y proceso de la actividad
## 1. ¿Cuál es la diferencia entre un componente presentacional y un componente de página en React? Da ejemplos usando archivos del proyecto.
#### La diferencia es que un componente presentacional se enfoca solo en cómo se ve algo en pantalla y normalmente recibe datos por props, por ejemplo AnimalCard.jsx muestra la foto, el nombre y la especie sin manejar lógica compleja, en cambio un componente de página organiza toda la vista completa, maneja estados, llama a la API y coordina varios componentes, por ejemplo AnimalsPage.jsx que se encarga de cargar los animales, filtrar, manejar errores y luego pasar esa información a las tarjetas.

## 2.¿Para qué se utiliza useState en el proyecto? Menciona dos estados distintos y su función.
#### useState se usa para guardar valores que cambian con la interacción del usuario o con los datos que vienen de la API, por ejemplo el estado animals guarda toda la lista de animales que llega desde MockAPI y se usa para renderizar las tarjetas, también se usa searchQuery para guardar lo que la persona escribe en el buscador y así filtrar la lista en tiempo real.

## 3. ¿Cómo se usa useEffect para cargar datos desde MockAPI al inicio? Explica el flujo.
#### useEffect se usa para hacer la primera carga de datos apenas entra la página, el flujo es sencillo, cuando el componente se monta se ejecuta el useEffect, este llama a una función de animalsApi.js, cuando la API responde se guardan los datos en el estado animals, si falla se activa un estado error, y cuando termina todo se cambia loading a false para que la pantalla ya muestre el contenido real.

## 4. ¿Cómo maneja el proyecto los estados de loading, error y lista vacía? ¿Qué se muestra al usuario en cada caso?
#### El proyecto maneja loading, error y lista vacía de forma clara, si está loading se muestra un mensaje o un spinner indicando que los datos están cargando, si ocurre un error el usuario ve un mensaje amigable que explica que algo falló, y si la lista llega vacía se muestra una vista que indica que no hay elementos disponibles, esto permite que el usuario entienda lo que está pasando en cada momento.

## 5. ¿Qué significa que un formulario sea controlado en React? Relaciónalo con el formulario del proyecto.
#### Un formulario controlado significa que cada input depende del estado y no de su propio valor interno, es decir que value viene de useState y cada cambio actualiza ese estado, en el proyecto el formulario de animales funciona así, cada campo toma su valor de un estado como formData y cada cambio lo actualiza, esto hace más fácil validar, limpiar y enviar los datos.

## 6. ¿Por qué es buena práctica separar la lógica de datos en archivos como animalsApi.js en vez de hacer peticiones dentro de los componentes?
#### Es buena práctica separar la lógica de datos en archivos como animalsApi.js porque así los componentes quedan más limpios, reusables y fáciles de entender, además permite centralizar las peticiones, manejar errores en un solo lugar y evitar escribir la misma función varias veces, esto hace el código más ordenado y profesional.

## 7. ¿Qué hace que AnimalCard sea un componente reutilizable? ¿Cómo se podría usar una tarjeta similar en otro contexto?
#### AnimalCard es reutilizable porque no depende de dónde se use y solo recibe datos por props, muestra un animal pero podría mostrar cualquier otro tipo de entidad cambiando las props, por ejemplo una tarjeta similar podría mostrar un usuario, un producto o un curso si se le pasan otros datos y se cambia el diseño mínimo.

## 8. ¿Qué elementos del proyecto contribuyen a la accesibilidad? Menciona tres y explica su importancia.
#### Tres elementos que ayudan a la accesibilidad son el uso de alt en las imágenes para que personas con lectores de pantalla entiendan lo que se muestra, las etiquetas label conectadas a inputs para que los formularios sean claros y navegables, y un focus visible en botones o enlaces para que la página sea usable con teclado, cada una de estas cosas mejora mucho la experiencia de personas con distintas necesidades.

## 9. Antes de agregar una funcionalidad nueva, ¿qué pasos debes pensar según la filosofía de React? (ej.: qué datos, qué estado, dónde vive la lógica)
#### Antes de agregar una funcionalidad nueva en React es importante pensar qué datos se necesitan, qué parte de esos datos debe ser estado, en qué componente debe vivir ese estado, qué lógica debe separarse en un servicio o en un hook y cómo reaccionará la interfaz mientras se carga o si ocurre un error, esta forma de pensar evita problemas y mantiene el proyecto ordenado.

## 10. ¿Qué conceptos de React aprendidos en este proyecto podrías reutilizar en otro tipo de aplicación? Da al menos cuatro ejemplos.
#### Los conceptos de React que puedes reutilizar en otros proyectos incluyen el uso de useState para controlar formularios y filtros, el uso de useEffect para cargar datos externos, la organización entre componentes presentacionales y componentes de página, la separación de lógica en servicios como animalsApi.js, y la creación de componentes reutilizables como tarjetas y formularios.


### Explicación actividad 1
actividad-1: modificación del estado inicial
Qué cambié:
- Cambié el estado inicial de loading a true en src/pages/AnimalsPage.jsx
Qué observé:
- Al abrir la página aparece el indicador de carga inmediatamente, esto demuestra cómo el estado inicial impacta el render.
Relación con renderizado:- React renderiza según el estado inicial, si loading está a true la UI muestra la vista de carga hasta que setLoading(false) se ejecute.

### Explicacion Actividad 2
actividad-2: filtro por edad

Qué se hizo:
- Añadido estado ageFilter en src/pages/AnimalsPage.jsx
- Añadido select de filtro por edad en la UI
- Actualizada la lógica de filteredAnimals para combinar typeFilter y ageFilter
- Añadido manejo de casos con edad indefinida

Archivos modificados:
- src/pages/AnimalsPage.jsx
- src/components/Filters.jsx

Cómo probar:
1. Ir a /animals
2. Seleccionar 'Menores de 2 años' y comprobar que aparecen solo animales con age < 2
3. Seleccionar '2 años o más' y comprobar lo contrario
4. Probar combinando con otros filtros y con el buscador

### Explicacion actividad 3
actividad-3: mejoras UX en formulario de creación

Qué se hizo:
- Se implementó validación en tiempo real para los campos nombre, especie y edad
- Se añadió deshabilitado del botón de submit hasta que el formulario sea válido
- Auto-focus en el campo nombre al montar el componente
- Mensaje de éxito al crear y limpieza automática del formulario

Archivos modificados:
- src/components/AnimalForm.jsx

Cómo probar:
1. Ir a la UI que contiene el formulario de creación
2. Intentar enviar con campos vacíos, verificar que aparecen mensajes de error y el botón está deshabilitado
3. Completar los campos con valores válidos y enviar, verificar que aparece "Animal creado correctamente" y el formulario se limpia
4. Verificar que el primer input tiene focus después de crear o al abrir el formulario.
