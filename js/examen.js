const btnCargar = document.getElementById("btnCargar");
const btnLimpiar = document.getElementById("limpiar");
const mensaje = document.getElementById("mensaje");
const table = document.getElementById("table");
const tbody = document.getElementById("tbody");
    
btnCargar.addEventListener("click", mostrar);
btnLimpiar.addEventListener("click", limpiar);
document.addEventListener("DOMContentLoaded", cargarLibros);    

function cargarLibros(){
    const url = "https://stephen-king-api.onrender.com/api/books";
    fetch(url)
    .then(response => response.json())
    .then(data =>{
        if(!data.data || !Array.isArray(data.data)){
            alert("El formato de la API no es una lista de libros");
        }
        const listaLibros = document.getElementById("libros");
        data.data.forEach(libro =>{
            const option = document.createElement("option");
            option.value = libro.id;
            option.textContent = libro.Title;
            listaLibros.appendChild(option);
            });
    })
    .catch(error =>{
        mensaje.innerHTML = "Surgió un error " + error;
    });
}
    
function mostrar(){
    const url = "https://stephen-king-api.onrender.com/api/books";
    const libroSeleccionado = document.getElementById("libros").value;
    
    if(libroSeleccionado == "Seleccionar libros"){
        mensaje.innerHTML = "Por favor, seleccione un libro";
        return;
    }
    
    axios.get(url)
    .then(response =>{
        const libro = response.data.data.find(libro => libro.id == libroSeleccionado);
        if(libro){
            tbody.innerHTML = "";
            const fila = document.createElement('tr');

            const columna1 = document.createElement('td');
            columna1.textContent = libro.id;
            fila.appendChild(columna1);
    
            const columna2 = document.createElement('td');
            columna2.textContent = libro.Title;
            fila.appendChild(columna2);
    
            const columna3 = document.createElement('td');
            columna3.textContent = libro.Year;
            fila.appendChild(columna3);
    
            const columna4 = document.createElement('td');
            columna4.textContent = libro.Pages;
            fila.appendChild(columna4);
    
            const columna5 = document.createElement('td');
            columna5.textContent = libro.Publisher;
            fila.appendChild(columna5);
    
            tbody.appendChild(fila);
            }else{
                mensaje.textContent = "Libro no encontrado";
            }
            })
            .catch(error =>{
                mensaje.innerHTML = "Surgió un error " + error;
            });
}

function limpiar(){
    tbody.innerHTML = "";
    mensaje.textContent = "";
}
    