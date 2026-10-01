const url = "http://localhost:8080/coches";

function pintarCoches(datos) {
  let texto = "";

  for (let i = 0; i < datos.length; i++) {
    let nombreMarca = "Sin marca";

    if (datos[i].marca != null) {
      nombreMarca = datos[i].marca.nombre;
    }

    texto = texto + "<div class='tarjeta'>";
    texto = texto + "<h3>" + nombreMarca + " " + datos[i].modelo + "</h3>";
    texto = texto + "<p>Id: " + datos[i].id + "</p>";
    texto = texto + "<p>Año: " + datos[i].anio + "</p>";
    texto = texto + "<p>Precio: " + datos[i].precio + " €</p>";
    texto = texto + "</div>";
  }

  document.getElementById("listado").innerHTML = texto;
}

function verTodos() {
  document.getElementById("mensaje").textContent = "";

  fetch(url)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      console.log(datos);
      pintarCoches(datos);
    })
    .catch(function (error) {
      document.getElementById("mensaje").textContent =
        "No se pudo conectar con el servidor";
      console.log(error);
    });
}

function verUno() {
  const id = document.getElementById("idBuscar").value;

  if (id === "") {
    document.getElementById("mensaje").textContent = "Escribe un id";
    return;
  }

  fetch(url + "/" + id)
    .then(function (respuesta) {
      if (respuesta.ok === false) {
        document.getElementById("mensaje").textContent =
          "No existe el coche con id " + id;
        document.getElementById("listado").innerHTML = "";
        return null;
      }
      return respuesta.json();
    })
    .then(function (coche) {
      if (coche !== null) {
        console.log(coche);
        pintarCoches([coche]);
        document.getElementById("mensaje").textContent = "";
      }
    })
    .catch(function (error) {
      document.getElementById("mensaje").textContent =
        "No se pudo conectar con el servidor";
      console.log(error);
    });
}

function anadir() {
  const modelo = document.getElementById("modelo").value;
  const anio = document.getElementById("anio").value;
  const precio = document.getElementById("precio").value;
  const marcaId = document.getElementById("marcaId").value;

  if (modelo === "" || anio === "" || precio === "") {
    document.getElementById("mensaje").textContent =
      "Rellena modelo, año y precio";
    return;
  }

  let marca = null;
  if (marcaId !== "") {
    marca = { id: parseInt(marcaId) };
  }

  const nuevo = {
    modelo: modelo,
    anio: parseInt(anio),
    precio: parseFloat(precio),
    marca: marca,
  };

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevo),
  })
    .then(function (respuesta) {
      if (respuesta.ok === false) {
        document.getElementById("mensaje").textContent =
          "Error al añadir (¿existe esa marca?)";
        return null;
      }
      return respuesta.json();
    })
    .then(function (coche) {
      if (coche !== null) {
        console.log(coche);

        verTodos();
        document.getElementById("mensaje").textContent =
          "Coche añadido con id " + coche.id;
      }
    })
    .catch(function (error) {
      document.getElementById("mensaje").textContent =
        "No se pudo conectar con el servidor";
      console.log(error);
    });
}

function borrar() {
  const id = document.getElementById("idBorrar").value;

  if (id === "") {
    document.getElementById("mensaje").textContent = "Escribe un id";
    return;
  }

  fetch(url + "/" + id, { method: "DELETE" })
    .then(function (respuesta) {
      if (respuesta.ok) {
        verTodos();
        document.getElementById("mensaje").textContent =
          "Coche " + id + " borrado";
      } else {
        document.getElementById("mensaje").textContent =
          "No existe el coche con id " + id;
      }
    })
    .catch(function (error) {
      document.getElementById("mensaje").textContent =
        "No se pudo conectar con el servidor";
      console.log(error);
    });
}

function modificar() {
  const id = document.getElementById("idModificar").value;
  const modelo = document.getElementById("modeloModificar").value;
  const anio = document.getElementById("anioModificar").value;
  const precio = document.getElementById("precioModificar").value;
  const marcaId = document.getElementById("marcaIdModificar").value;

  if (
    id === "" ||
    modelo === "" ||
    anio === "" ||
    precio === "" ||
    marcaId === ""
  ) {
    document.getElementById("mensaje").textContent =
      "Rellena id, modelo, año, precio y marca";
    return;
  }

  const coche = {
    modelo: modelo,
    anio: parseInt(anio),
    precio: parseFloat(precio),
    marca: { id: parseInt(marcaId) },
  };

  fetch(url + "/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(coche),
  })
    .then(function (respuesta) {
      if (respuesta.ok === false) {
        document.getElementById("mensaje").textContent =
          "Error al modificar (¿existe ese coche y esa marca?)";
        return null;
      }
      return respuesta.json();
    })

    .then(function (guardado) {
      if (guardado !== null) {
        console.log(guardado);
        verTodos();
        document.getElementById("mensaje").textContent =
          "Coche " + id + " modificado";
      }
    })
    .catch(function (error) {
      document.getElementById("mensaje").textContent =
        "No se pudo conectar con el servidor";
      console.log(error);
    });
}
