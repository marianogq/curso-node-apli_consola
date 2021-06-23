require ('colors');

const mostrarMenu = ()=>{
    return new Promise(resolve=>{
        console.clear();
        console.log('========================'.yellow);
        console.log(' Seleccione una opción '.yellow);
        console.log('========================\n'.yellow);
        console.log(`${'1'.yellow}. Crear Tarea`);
        console.log(`${'2'.yellow}. Listar Tareas`);
        console.log(`${'3'.yellow}. Listar Tareas Completadas`);
        console.log(`${'4'.yellow}. Listar Tareas Pendientes`);
        console.log(`${'5'.yellow}. Completar Tarea(s)`);
        console.log(`${'6'.yellow}. Borrar Tarea`);
        console.log(`${'0'.yellow}. Salir\n`);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question('Seleccione una opción: ', (opt)=>{
            readline.close();
            resolve(opt);
        })
    });

}

const pausa = ()=>{
    return new Promise(resolve=>{
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question(`\nPresione ${'ENTER'.yellow} para continuar\n`, (opt)=>{
            readline.close();
            resolve();
        })
    });

}

module.exports = {
    mostrarMenu,
    pausa
}