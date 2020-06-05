

function traerPersonas() {

    setSpinner('show');

    document.getElementById('spinner').hidden = false;

    var url = "http://localhost:3000/materias";
    xhr.open('GET', url, true);
    xhr.onreadystatechange = manejadorRespuesta;

    xhr.send();
}


function manejadorRespuesta() {

    if (xhr.readyState == 4) {

        if (xhr.status == 200) {
            materias = JSON.parse(xhr.responseText);

            armarTabla(materias);
            // setSpinner();


        }
    } 

}


function modificarPersonas(objectJson) {
    setSpinner('show');
    var url = "http://localhost:3000/editar";
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(objectJson));
    xhr.onreadystatechange = manejadorRespuesta2;


}



function manejadorRespuesta2() {

    if (xhr.readyState == 4) {

        if (xhr.status == 200) {
            var respuesta = JSON.parse(xhr.responseText);
            if (respuesta.type == "ok") {
                cerrarFormulario();

                if (objectJson != null) {
                    cambiarFila(objectJson);
                    setSpinner();


                }
            }
        }
    }

}


function eliminarPersona(objeto) {
    setSpinner('show');

    var url = "http://localhost:3000/eliminar";
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(objeto));
    xhr.onreadystatechange = manejadorRespuesta3;

}



function manejadorRespuesta3() {

    if (xhr.readyState == 4) {

        if (xhr.status == 200) {
            var respuesta = JSON.parse(xhr.responseText);
            if (respuesta.type == "ok") {

                cerrarFormulario();

                eliminarFilaDom(jsonNuevo);
                setSpinner();

            }
        }
    }

}