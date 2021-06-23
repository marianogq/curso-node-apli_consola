require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoCheckList
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

console.clear();
const main = async()=>{
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if(tareasDB){ // Cargar Tareas
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        // Imprimimos el Menu
       opt = await inquirerMenu(); 

       switch (opt) {
            case '1': // Crear Tarea
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc);
               break;
            case '2': // Listar Tareas
                tareas.listadoCompleto();
            break;
            case '3': // Listar Completadas
                tareas.listarPendientesCompletadas(true);
            break;
            case '4': // Listar Pendientes
                tareas.listarPendientesCompletadas(false);
            break;
            case '5': // Completar | Pendiente
                const ids= await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;
            case '6': // Borrar Tarea
                console.log('');
                const id = await listadoTareasBorrar(tareas.listadoArr);
                console.log('');
                if(id !=='0'){
                    const ok = await confirmar('¿Está seguro de Borrar la Tarea?');
                    if (ok){
                        tareas.borrarTarea(id);
                        console.log('');
                        console.log('Tarea Borrada Correctamente!!'.green);
                    } 
                }
            break;
       }
       guardarDB(tareas.listadoArr);
       await pausa();
    } while (opt !== '0');
    
}

main();