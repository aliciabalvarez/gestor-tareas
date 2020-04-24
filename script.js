"use strict"
var tareas = {
    porHacer: [],
    completadas: []
};
pintarLocalStorage();
for(let i=0;i<tareas.porHacer.length;i++){
    pintaTareaEnDOM(".tareas-por-hacer",tareas.porHacer[i])
}
for(let i=0;i<tareas.completadas.length;i++){
    pintaTareaEnDOM(".tareas-completadas",tareas.completadas[i])
}
function guardarLocalStorage(){
    localStorage.setItem('datos', JSON.stringify(tareas));
}
function pintarLocalStorage(){
                                           
    var guardado = localStorage.getItem('datos');
    var objetoTareas = JSON.parse(guardado);
    if(objetoTareas){
        tareas = objetoTareas
    }
    console.log("Recarga la página para actualizar la lista (si sufre algún cambio):")
    console.log(tareas)
}
function trabajarConEntradaLimpia(){
    var entradaInputLimpia = entradaActividad.value.trim()
    var patron = /[ ]{1,}/gi;
    var reemplaza = entradaInputLimpia.replace (patron," ");
        if(entradaActividad.value == 0){
            $(".alert-vacio").css({
                "display":"flex"
            })
        }else{
            $(".alert-vacio").css({
                "display":"none"
            })

            let datos = {
                actividad:reemplaza,
                prioridad: $(".prioSeleccionada").text(),
                nombre: inputNombre.value
            }
            tareas.porHacer.push(datos)
            pintaTareaEnDOM(".tareas-por-hacer",datos);
            guardarLocalStorage();
            console.log(tareas)
        }
}
$("#btnAlta").on({
    click:function(){
        $("#btnMedia").removeClass("prioSeleccionada");
        $("#btnBaja").removeClass("prioSeleccionada");
        $("#btnAlta").addClass("prioSeleccionada");
        
    }
})
$("#btnMedia").on({
    click:function(){
        $("#btnMedia").addClass("prioSeleccionada");
        $("#btnAlta").removeClass("prioSeleccionada");
        $("#btnBaja").removeClass("prioSeleccionada");
    }
})
$("#btnBaja").on({
    click:function(){
        $("#btnBaja").addClass("prioSeleccionada");
        $("#btnMedia").removeClass("prioSeleccionada");
        $("#btnAlta").removeClass("prioSeleccionada");
    }
})
$("#entradaActividad").on({
    keypress:function (evento){
        if(evento.which == 13) {
            trabajarConEntradaLimpia()
        }
    }
})
$("#boton-guardar").on({
    click:function(){
        trabajarConEntradaLimpia()
    }
})
$("#guardaNombre").on({
    click:function(){
        trabajarConEntradaLimpia()
    }
})
$("#inputNombre").on({
    keypress:function (evento){
        if(evento.which == 13) {
            trabajarConEntradaLimpia()
        }
    }
})
function pintaTareaEnDOM(dondePintar,datos){
    let nodoDivContenedorTarea = document.createElement("div")
    nodoDivContenedorTarea.classList.add("contenedor-tarea")
    let nodoDivTarea = document.createElement("div");
    nodoDivTarea.classList.add("tarea");
    let nodop = document.createElement("p");
    let nodoDivExtras = document.createElement("div")
    nodoDivExtras.classList.add("pintar-extras")
    let nodopPrioridad = document.createElement("p")
    nodopPrioridad.classList.add("pPrioridad")
    nodopPrioridad.innerHTML = "Prioridad:"
    let nodopNombre = document.createElement("p")
    nodopNombre.classList.add("pNombre")
    nodopNombre.innerHTML = ("Nombre:")
    let nodoSpanPrioridad = document.createElement("span")
    nodoSpanPrioridad.classList.add("spanPrioridad")
    nodoSpanPrioridad.innerHTML =" "+ datos.prioridad
    let nodoSpanNombre = document.createElement("span")
    nodoSpanNombre.classList.add("spanNombre")
    nodoSpanNombre.innerHTML = " "+ datos.nombre;   
    nodop.innerHTML = datos.actividad;
    let nodoDivBorrar = document.createElement("div");
    nodoDivBorrar.classList.add("boton-borrar")
    let iconoBorrar = document.createElement("span")
    iconoBorrar.innerHTML = "<i class='far fa-trash-alt'></i>"
    let nodoDivActivo = document.createElement("div");
    let iconoActivo = document.createElement("span")
    iconoActivo.innerHTML = "<i class='far fa-check-circle'></i>"
    $(nodoDivBorrar).on({
        click:function(){
            $(nodoDivContenedorTarea).remove();
            for(let i=0;i<tareas.porHacer.length;i++){
                if(tareas.porHacer[i].actividad==datos.actividad){
                    var index = tareas.porHacer.indexOf(tareas.porHacer[i]);
                    if (index > -1) {
                        tareas.porHacer.splice(index, 1);
                    }                            
                    guardarLocalStorage();                       
                }    
            }
            for(let i=0;i<tareas.completadas.length;i++){
                if(tareas.completadas[i].actividad==datos.actividad){
                    var index = tareas.completadas.indexOf(tareas.completadas[i]);
                        if (index > -1) {
                            tareas.completadas.splice(index, 1);
                        }
                        guardarLocalStorage();                        
                } 
            }
        }
    })
    let mepintoEnPorHacer = ( dondePintar == ".tareas-por-hacer");
    if(mepintoEnPorHacer == true){ 
        $(nodoDivActivo).on({
            click:function(){
                pintaTareaEnDOM(".tareas-completadas" , datos)
                $(nodoDivContenedorTarea).remove();
                let datosCompletadas = datos;
                tareas.completadas.push(datosCompletadas)                 
                for(let i=0;i<tareas.porHacer.length;i++){
                    if(tareas.porHacer[i]==datosCompletadas){
                        var index = tareas.porHacer.indexOf(tareas.porHacer[i]);
                        if (index > -1) {
                            tareas.porHacer.splice(index, 1);
                        }                            
                        guardarLocalStorage();
                    }  
                }  
            },   
        })  
    } 
    else{
        $(nodoDivActivo).on({
            click:function(){
                pintaTareaEnDOM(".tareas-por-hacer" , datos)
                $(nodoDivContenedorTarea).remove();
                let datosCompletadas = datos;
                tareas.porHacer.push(datosCompletadas)
                for(let i=0;i<tareas.completadas.length;i++){
                    if(tareas.completadas[i]==datosCompletadas){
                        var index = tareas.completadas.indexOf(tareas.completadas[i]);
                        if (index > -1) {
                            tareas.completadas.splice(index, 1);
                        }
                        guardarLocalStorage(); 
                    }    
                }   
            }
        }),
        $(iconoActivo).css({
            "color":"greenyellow"
        }),
        $( iconoActivo ).mouseenter(function() {
            $( this ).css({
                "color":"#6a9b22",
                "transition":"0.3s"
            })
        });
        $( iconoActivo ).mouseleave(function() {
            $( this ).css({
                "color":"greenyellow",
                "transition":"0.3s"
            })
        });
        $(nodop).css({
            "text-decoration":"line-through"
        })
    }
    nodoDivActivo.classList.add("boton-activo")
    nodoDivTarea.append(nodop);
    nodoDivTarea.append(nodoDivBorrar);
    nodoDivBorrar.append(iconoBorrar)
    nodoDivTarea.append(nodoDivActivo);
    nodoDivActivo.append(iconoActivo)
    nodoDivContenedorTarea.append(nodoDivTarea)
    nodoDivContenedorTarea.append(nodoDivExtras)
    nodoDivExtras.append(nodopPrioridad)
    nodoDivExtras.append(nodopNombre)
    nodopNombre.append(nodoSpanNombre)
    nodopPrioridad.append(nodoSpanPrioridad)
    let nodoTotalCajas = document.querySelector(dondePintar);
    nodoTotalCajas.append(nodoDivContenedorTarea);
    entradaActividad.value = ""
    inputNombre.value = ""
};