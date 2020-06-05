window.onload = function () {

    xhr = new XMLHttpRequest();

    console.log('andando');

    tabla = document.getElementById('tabla');
    form = document.getElementById('form');
    form.hidden = true;


    traerPersonas();


};




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


    form.hidden = true;

}



function mostrarFormulario(id) {


    for (var i = 0; i < materias.length; i++) {



        if (materias[i].id == id) {

            personaA = materias[i];

        }

    }


    crearFormulario(personaA);

    crearBotones();

    eventoRadioButton();

    eventosBotones();
    insertarDatoEnForm(personaA);

}


function crearBotones() {

    var botonModificar = document.createElement("button");
    botonModificar.setAttribute('id', 'btnModificar');
    botonModificar.setAttribute("type", "button");
    botonModificar.textContent = 'Cambiar';

    var botonEliminar = document.createElement("button");
    botonEliminar.setAttribute('id', 'btnEliminar');

    botonEliminar.setAttribute("type", "button");
    botonEliminar.textContent = 'Borrar';



    var botonCerrar = document.createElement("button");
    botonCerrar.setAttribute("type", "button");
    botonCerrar.textContent = 'Cerrar';
    botonCerrar.setAttribute('id', 'btnCerrar');


    form.appendChild(botonModificar);
    form.appendChild(botonEliminar);
    form.appendChild(botonCerrar);

}



function crearFormulario(personaA) {



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


                        // dato.textContent = 

                        break;

                }


                form.appendChild(dato);
                break;
        }


    }

}


function createRadioButton(textoRadio, fila) {

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
    return fila;

}
function eventoRadioButton() {

    var manana = document.getElementById('Mañana');
    var noche = document.getElementById('Noche');
    manana.addEventListener('click', function () {

        manana.checked = true;
        noche.checked = false;

    });
    noche.addEventListener('click', function () {

        manana.checked = false;
        noche.checked = true;

    });


}



function createDateInput(textoFecha) {

    var input = document.createElement('input');
    input.setAttribute('type', 'date');
    input.setAttribute('name', textoFecha);
    input.setAttribute('id', textoFecha);


    return input;

}



function eventosBotones() {

    document.getElementById('btnCerrar').addEventListener('click', () => {
        cerrarFormulario();

        tabla.hidden = false;

    });



    document.getElementById('btnEliminar').addEventListener("click", () => {
        var id = document.getElementById('id').value;

        jsonNuevo = {
            "id": id

        }
        cerrarFormulario();
        setSpinner('show');

        eliminarPersona(jsonNuevo);
    });

    document.getElementById('btnModificar').addEventListener("click", () => {




        objectJson = obtenerDatosForm();

        if (objectJson != null) {

            cerrarFormulario();
            setSpinner('show');

            modificarPersonas(objectJson);


        }



    })


}
function setSpinner(display) {

    body = document.getElementById('body');

    if (display == "show") {

        body.classList.add("showSpinner");

    }else{


        body.classList.remove("showSpinner");
            tabla.hidden = false;


    }

}


function obtenerDatosForm() {

    var id = document.getElementById('id').value;

    var nombre = document.getElementById('nombre').value;
    var cuatrimestre = document.getElementById('formSelect').value;
    var fechaFinal = document.getElementById('inputFecha').value;

    var check = false;
    if (document.getElementById('Mañana').checked) {

        var turno = "Mañana";

        check = true;
    } else {


        if (document.getElementById('Noche').checked) {

            var turno = "Noche";
            check = true;

        } else {

            document.getElementById('Mañana').style.boxShadow = "1 1 1 4px rgb(153, 17, 17)";
            document.getElementById('Noche').style.boxShadow = "0 0 0 4px rgb(153, 17, 17)";

        }


    }
    if (validarCampos(nombre, fechaFinal) && check == true) {

        objetoJson = {
            "id": id,
            "nombre": nombre,
            "cuatrimestre": cuatrimestre,
            "fechaFinal": reconvertirFecha(fechaFinal),
            "turno": turno,


        }
    } else {

        objetoJson = null;

    }

    return objetoJson;

}

function validarCampos(nombre, fecha) {


    var retorno = true;
    if (nombre.length <= 6) {

        document.getElementById('nombre').style.backgroundColor = "rgb(153, 17, 17)";

        retorno = false;

    }


    if (!compararFechas(fecha)) {
        document.getElementById('inputFecha').style.backgroundColor = "rgb(153, 17, 17)";
        retorno = false;


    }

    return retorno;


}

function compararFechas(fecha) {

    var retorno = true;

    var array = fecha.split("-");

    var fechaProxima = new Date(array[0], array[1], array[2]);

    var objetoFecha = new Date();
    var hoy = objetoFecha.getFullYear() + '-' + (objetoFecha.getMonth() + 1) + '-' + objetoFecha.getDate();//falta arreglar la fecha

    // console.log(hoy + fechaProxima);


    return retorno;


}




function insertarDatoEnForm(personaA) {

    document.getElementById('id').value = personaA.id;

    document.getElementById('nombre').value = personaA.nombre;
    document.getElementById('formSelect').value = personaA.cuatrimestre;
    document.getElementById('inputFecha').value = transformarfecha(personaA.fechaFinal);

    if (personaA.turno == 'Mañana') {

        document.getElementById('Mañana').click();

    }

    if (personaA.turno == 'Noche') {

        document.getElementById('Noche').click();

    }

    document.getElementById('formSelect').disabled = true;

}


function transformarfecha(fecha) {
    var array = fecha.split('/');

    fechaNueva = array[2] + '-' + array[1] + '-' + array[0];

    return fechaNueva;

}


function reconvertirFecha(fecha) {


    var array = fecha.split('-');

    fechaNueva = array[2] + '/' + array[1] + '/' + array[0];

    return fechaNueva;


}
function cambiarFila(objectJson) {




    document.querySelectorAll('tr').forEach(function (value, index) {




        if (value.children[0].textContent == objectJson.id) {

            value.children[1].textContent = objectJson.nombre;
            value.children[3].textContent = objectJson.fechaFinal;
            value.children[4].textContent = objectJson.turno;


        }

    });


}


function eliminarFilaDom(jsonNuevo) {



    document.querySelectorAll('tr').forEach(function (value, index) {


        if (value.children[0].textContent == jsonNuevo.id) {

            tabla.removeChild(value);



        }

    });
}