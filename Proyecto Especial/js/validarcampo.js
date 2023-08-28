"use strict";
document.addEventListener('DOMContentLoaded', function(){
    let refresh = document.getElementById("refresh");
    let form = document.getElementById("record");
    function Captcha() {
        var alpha = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
        for (let i = 0; i < 4; i++) {
            var a = alpha[Math.floor(Math.random() * alpha.length)];
            var b = alpha[Math.floor(Math.random() * alpha.length)];
            var c = alpha[Math.floor(Math.random() * alpha.length)];
            var d = alpha[Math.floor(Math.random() * alpha.length)];
        }
        var code = a + ' ' + b + ' ' + ' ' + c + ' ' + d;
        document.getElementById("Captcha").innerHTML = code;
        document.getElementById("Captcha").value = code;
    }
    
    function ValidarCaptcha() {
        var string1 = removeSpaces(document.getElementById('Captcha').value);
        var string2 = removeSpaces(document.getElementById('txtInput').value);
        var mensaje = document.getElementById("alerta");
        if (string1 == string2) {
            mensaje.innerHTML = "El Formulario ha sido Enviado.";
        }
        else {
            mensaje.innerHTML = "Fallo el envio. Intente Nuevamente.";
        }
    }
    
    function removeSpaces(string) {
        return string.split(' ').join('');
    }
    
    function validarFormulario() {
        var txtNombre = document.getElementById('nombre').value;
        var txtApellido = document.getElementById('apellido').value;
        var txtFecha = document.getElementById('dia').value;
        var txtCorreo = document.getElementById('correo').value;
        var txtPais = document.getElementById('pais').value;
        var txtCiudad = document.getElementById('ciudad').value;
    
        //Test nombre obligatorio
        if (txtNombre == null || txtNombre.length == 0 || /^\s+$/.test(txtNombre)) {
            alert('ERROR: El campo nombre no debe ir vacío');
            return false;
        }
    
        //Test apellido obligatorio
        if (txtApellido == null || txtApelido.length == 0 || /^\s+$/.test(txtApellido)) {
            alert('ERROR: El campo apellido no debe ir vacío');
            return false;
        }
    
        //Test fecha
        if (!isNaN(txtFecha)) {
            alert('ERROR: Debe elegir una fecha');
            return false;
        }
    
        //Test correo
        if (!(/\S+@\S+\.\S+/.test(txtCorreo))) {
            alert('ERROR: Debe escribir un correo válido');
            return false;
        }
    
        //Test pais obligatorio
        if (txtPais == null || txtPais.length == 0 || /^\s+$/.test(txtPais)) {
            alert('ERROR: El campo pais no debe ir vacío');
            return false;
        }
    
        //Test ciudad obligatorio
        if (txtCiudad == null || txtCiudad.length == 0 || /^\s+$/.test(txtCiudad)) {
            alert('ERROR: El campo ciudad no debe ir vacío');
            return false;
        }
    
        alert("Datos ingresados correctamente");
        return true;
    }
    
    window.addEventListener("load", Captcha);
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        ValidarCaptcha();
    });
    
    refresh.addEventListener("click", Captcha);
    let prueba = document.getElementById("prueba");
})
