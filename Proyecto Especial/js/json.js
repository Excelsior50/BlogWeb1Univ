"use strict";
document.addEventListener('DOMContentLoaded', async function(){
    
    let form = document.getElementById("formulario");
    let tabla = document.getElementById("myTable");
    let link = 'http://web-unicen.herokuapp.com/api/groups/grupo9/tabla';
    getData();

    var TrioDefault = [
        {
            "Generacion": "Primer",
            "Caracteristicas": "700 mil Unidades vendidas el 1er año. Inconfundible forma y acabado. Nacia un Mito.",
            "Motorizacion": "L6 2.8 /3.3 - V8 4.3/4.7/5.1/6.4/7.0",
            "Anio": "1964-1973",
        },
        {
            "Generacion": "Segunda",
            "Caracteristicas": "Modelo mas pequeño con menor consumo. Interiores mas lujosos.",
            "Motorizacion": "L4 2.3 - V6 2.8 - V8 4.9",
            "Anio": "1974-1978",
        },
        {
            "Generacion": "Tercera",
            "Caracteristicas": "Ruptura con generaciones anteriores, primeros 'Fox'. Para publico mas selecto y elegante.",
            "Motorizacion": "L4 2.3/2.3T - L6 3.3 - V6 2.8/3.8 - V8 4.2/4.9",
            "Anio": "1979-1993",
        }
    ]

    let ArrJs = [];


    function AgregarFila(nuevo){
        let fila = document.createElement("tr");
        for (let elem of Object.values(nuevo.thing)){
            let celda = document.createElement("td");
            celda.innerHTML = elem;
            fila.appendChild(celda);
        }
        
        let celdaPut = document.createElement("button");
            fila.appendChild(celdaPut);
            celdaPut.innerHTML = "Modificar";
            celdaPut.classList.add("btn-html");
            celdaPut.dataset.id = nuevo._id;
            celdaPut.addEventListener("click",modificarFila);

        let celdaDelete = document.createElement("button");
            fila.appendChild(celdaDelete);
            celdaDelete.innerHTML = "Borrar";
            celdaDelete.classList.add("btn-html");
            celdaDelete.dataset.id = nuevo._id;
            console.log(nuevo._id);
            celdaDelete.addEventListener("click",borrarFila);

        tabla.appendChild(fila);
    }

    function AgregarVarios(){
        for (let elem=0; elem<TrioDefault.length; elem++){
            let data =  {
            "thing": {
                "Generacion" : TrioDefault[elem].Generacion.value,
                "Caracteristicas" : TrioDefault[elem].Caracteristicas.value,
                "Motorizacion" : TrioDefault[elem].Motorizacion.value,
                "Anio" : TrioDefault[elem].Anio.value,
            }
            }
            let options = {
                "method": "POST",
                "headers": { "Content-Type": "application/json" },
                "body": JSON.stringify(data.thing)
            }
            AgregarFila(options);
        } 
    }

    async function modificarFila(){
        let url = "http://web-unicen.herokuapp.com/api/groups/grupo9/tabla/"+this.dataset.id;

        let formActu = document.getElementById('formu');
            formActu.classList.add("formActualizar");

        let BtnActualizar = document.querySelector("formu");

        BtnActualizar.addEventListener("submit", async function(){

            let actualizar = { 
                "thing": {
                    "Generacion" : formActu.generacion.value,
                    "Caracteristicas" : formActu.caracteristicas.value,
                    "Motorizacion" : formActu.motor.value,
                    "Anio" : formActu.anio.value,
                }
            }

            let options = {
                "method": "PUT",
                "headers": { "Content-Type": "application/json" },
                "body": JSON.stringify(actualizar)

            }
            try {
                let respuesta = await fetch(url, options); 
                if (!respuesta.ok) {
                    console.log("Actualizado");
                }
            }
            catch (respuesta) {
                console.log("error de conexion al Actualizar");
            }
        })
    }

    async function borrarFila(){
        let url = "http://web-unicen.herokuapp.com/api/groups/grupo9/tabla/"+this.dataset.id;
        console.log(url); 
        let r = await fetch (url,{
            "method": "DELETE",
        })
        let elemtBorrar = this.parentElement;
        console.log(elemtBorrar);
        elemtBorrar.parentElement.removeChild(elemtBorrar);
    }

    async function AgregarJs(){
        let nuevo = { 
            "thing": {
                "Generacion" : form.generacion.value,
                "Caracteristicas" : form.caracteristicas.value,
                "Motorizacion" : form.motor.value,
                "Anio" : form.anio.value,
            }
        }
        let options = {
                "method": "POST",
                "headers": { "Content-Type": "application/json" },
                "body": JSON.stringify(nuevo)
            }
        try {
            let respuesta = await fetch(link, options); 
            if (!respuesta.ok) {
                console.log("error");
            }
        }
        catch (respuesta) {
            console.log("error de conexion");
        }
        AgregarFila(nuevo);
    }


    async function getData() {
        try {
            let json;
            let respuesta = await fetch(link);
            console.log(respuesta);
            json = await respuesta.json();
            console.log(json);
            if (json.tabla.length > 0){
                for(let i=0; i<json.tabla.length;i++){
                    AgregarFila(json.tabla[i]);
                }
            }
        }
        catch (respuesta) {
            console.log("error de conexion");
        }
    }

    function BorrarJSON(){
        ArrJs = [];
        tabla.innerHTML = " ";
    }

    document.querySelector("#clearJson").
        addEventListener('click', BorrarJSON);

    document.querySelector("#addVarios").
        addEventListener('click', AgregarVarios);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        AgregarJs();  
    });

    window.addEventListener("DOMContentLoaded", function(){
        for (let elem of ArrJs){
            AgregarFila(elem);
        } 
    })
})