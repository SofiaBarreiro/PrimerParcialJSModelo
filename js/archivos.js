window.onload = function () {

    xhr = new XMLHttpRequest();

    console.log('andando');

    tabla = document.getElementById('tabla');
    form = document.getElementById('form');
    form.hidden = true;


    traerPersonas();


};




function traerPersonas() {

    var url = "http://localhost:3000/materias";
    xhr.open('GET', url, true);
    //   setSpinner('show');
    xhr.onreadystatechange = manejadorRespuesta;

    xhr.send();
}


function manejadorRespuesta() {

    if (xhr.readyState == 4) {

        if (xhr.status == 200) {
            materias = JSON.parse(xhr.responseText);
            armarTabla(materias);

        }
    }


}


function armarTabla(materias) {

    var thead;

    if (thead == null) {
        thead = document.createElement('thead');
        var tr = document.createElement('tr');
        var encabezados = ['id', 'nombre', 'cuatrimestre', 'fechaFinal', 'turno'];
        thead.appendChild(tr);



        for (var i in encabezados) {

            var th = document.createElement('th');
            var text = document.createTextNode(encabezados[i]);
            th.appendChild(text);
            tr.appendChild(th);



        }


        tabla.appendChild(thead);

    }


    for (var i in materias) {
        var tr = document.createElement('tr');
        tabla.appendChild(tr);

        for (var j in materias[i]) {
            if (j != 'active') {

                var td = document.createElement('td');
                text = document.createTextNode(materias[i][j]);

                td.appendChild(text);
                tr.appendChild(td);

                td.addEventListener('dblclick', (e) => {
                    abrirFormulario();

                    mostrarFormulario(e.target.parentNode.firstChild.textContent);
                });
            }

        }
    }


}

function abrirFormulario() {

    tabla.hidden = true;
    form.hidden = false;

}



function cerrarFormulario() {

    var child = form.lastElementChild;
    while (child) {
        form.removeChild(child);
        child = form.lastElementChild;
    }


    tabla.hidden = false;
    form.hidden = true;

}



function mostrarFormulario(id) {


    for (var i = 0; i < materias.length; i++) {

        for (var j in materias[i]) {
            if (materias[i][j] == id) {

                personaA = materias[i];

            }

        }

    }


    cargarPersonaEnForm(personaA);


    var botonModificar = document.createElement("button");
    botonModificar.setAttribute('id', 'btnModificar');
    botonModificar.setAttribute("type", "button");
    botonModificar.textContent = 'Cambiar';
    // botonModificar.setAttribute('class', 'btn btn-warning');

    var botonEliminar = document.createElement("button");
    botonEliminar.setAttribute('id', 'btnEliminar');

    botonEliminar.setAttribute("type", "button");
    botonEliminar.textContent = 'Borrar';
    // botonEliminar.setAttribute('class', 'btn btn-warning');



    // botonEliminar.addEventListener("click", () => {
    //     var persona = modificarTabla('modificar', personaA.id);
    //     cerrarFormulario();
    //     borrarTabla();
    //     eliminarPersona(persona.id);
    //     traerPersonas();
    // })

    // botonModificar.addEventListener("click", () => {

    //     var persona = modificarTabla('modificar', personaA.id);
    //     if (persona != false) {

    //         cerrarFormulario();
    //         borrarTabla();
    //         modificarPersona(persona);
    //         traerPersonas();
    //     }

    // })
    form.appendChild(botonModificar);
    form.appendChild(botonEliminar);



    var botonCerrar = document.createElement("button");
    botonCerrar.setAttribute("type", "button");
    botonCerrar.textContent = 'Cerrar';
    botonCerrar.setAttribute('id', 'btnCerrar');

    // botonCerrar.setAttribute('class', 'btn btn-warning');


    botonCerrar.addEventListener('click', () => {
        cerrarFormulario();
    });
    form.appendChild(botonCerrar);


}
// 3)	Al hacer doble click en una fila de la grilla debe mostrarse, 
// en el centro de la página, una sección donde debe autocompletarse 
// los datos de la materia. Contendrá un texto para el nombre, 
// un select para el cuatrimestre (del 1 al 4), un radio para el turno (Mañana o Noche) y un date para la fecha, 
// un botón para Modificar (verde) y un botón Eliminar (rojo). (El id no debe mostrase al usuario)



function cargarPersonaEnForm(personaA) {


    console.log(personaA);
    var form = document.getElementById("form");

    for (var key in personaA) {

        var label = document.createElement("label");
        label.style.display = "block";
        var datoLabel = document.createTextNode(key);
        label.appendChild(datoLabel);
        form.appendChild(label);


        var uno;
        var dos;
        var tres;
        var cuatro;
        var select = document.createElement('select');


        switch (key) {
            case "cuatrimestre":
                select.setAttribute('id', "formSelect");
                console.log(select.textContent);

                uno = document.createElement("option");
                dos = document.createElement("option");
                tres = document.createElement("option");
                cuatro = document.createElement("option");

                uno.setAttribute("value", "1");
                dos.setAttribute("value", "2");
                tres.setAttribute("value", "3");
                cuatro.setAttribute("value", "4");
                uno.setAttribute("id", "uno");
                dos.setAttribute("id", "dos");
                tres.setAttribute("id", "tres");
                cuatro.setAttribute("id", "cuatro");
                var textUno = document.createTextNode("1");
                var textDos = document.createTextNode("2");
                var textTres = document.createTextNode("3");
                var textCuatro = document.createTextNode("4");

                uno.appendChild(textUno);
                dos.appendChild(textDos);
                tres.appendChild(textTres);
                cuatro.appendChild(textCuatro);
                select.appendChild(uno);
                select.appendChild(dos);
                select.appendChild(tres);
                select.appendChild(cuatro);


                form.appendChild(select);

                break;

            case 'fechaFinal':

                form.appendChild(createDateInput('inputFecha'));

                break;
            case 'turno':
                var fila = document.createElement('tr');

            
                form.appendChild(createRadioButton('Mañana', fila));
                form.appendChild(createRadioButton('Noche', fila));


                break;
            default:
                var dato;
                dato = document.createElement("input");
                dato.setAttribute("id", key);
                dato.setAttribute("type", "text");
                dato.style.display = "block";
                dato.setAttribute('class', "form-control")
                dato.setAttribute('aria-describedby', 'emailHelp');
                dato.setAttribute('position', 'fixed');


                switch (key) {

                    case ('id'):
                        dato.id = key;
                        label.style.display = "none";
                        dato.style.display = "none";
                    default:
                        dato.placeholder = key;
                        break;

                }


                form.appendChild(dato);
                break;


        }


    }

}


function createRadioButton(textoRadio, fila){

    var radio = document.createElement('input');
    radio.setAttribute('type', 'radio');
    radio.setAttribute('name', textoRadio);
    radio.setAttribute('id', textoRadio);

    var labelRadio = document.createElement("label");
    labelRadio.setAttribute('for', textoRadio);
    var datoLabelRadio = document.createTextNode(textoRadio);
    labelRadio.appendChild(datoLabelRadio);


    fila.appendChild(labelRadio);
    fila.appendChild(radio);
    console.log(radio);
    return fila;

}



function createDateInput(textoFecha){

    var input = document.createElement('input');
    input.setAttribute('type', 'date');
    input.setAttribute('name', textoFecha);
    input.setAttribute('id', textoFecha);


    return input;

}