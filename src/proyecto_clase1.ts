//A. Modelo (Interfaces)

interface IEstudiante{
    id: number;
    nombre: string;
    edad: number;
    carrera: string;
    activo: boolean;
    promedio: number;
}

interface IResultado<T>{
    ok: boolean;
    mensaje: string;
    data?: T;
}

//B. Lógica (Clases)

class Estudiante implements IEstudiante{
    constructor(
        public id: number,
        public nombre: string,
        public edad: number,
        public carrera: string,
        public activo: boolean,
        public promedio: number,
    ){}
}

class SistemaEstudiantes{
    private estudiantes: Estudiante[] = [];

    agregar(est: Estudiante): IResultado<Estudiante>{
        for(let i = 0; i<this.estudiantes.length;i++){
            if(this.estudiantes[i].id === est.id){
                return{ok:false, mensaje: "ID Repetido"};
            }
        }

    if (est.edad < 15 || est.edad > 80) {
      return { ok: false, mensaje: "Edad inválida" };
    }

    if (est.promedio < 0 || est.promedio > 10) {
      return { ok: false, mensaje: "Promedio inválido" };
    }

    this.estudiantes.push(est);
    return { ok: true, mensaje: "Estudiante agregado", data: est };
  }

  listar(): Estudiante[] {
    const lista: Estudiante[] = [];
    for (let i = 0; i < this.estudiantes.length; i++) {
      lista.push(this.estudiantes[i]);
    }
    return lista;
  }

  buscarPorId(id: number): IResultado<Estudiante> {
    for (let i = 0; i < this.estudiantes.length; i++) {
      if (this.estudiantes[i].id === id) {
        return { ok: true, mensaje: "Estudiante encontrado", data: this.estudiantes[i] };
      }
    }
    return { ok: false, mensaje: "Estudiante no existe" };
  }

  actualizarPromedio(id: number, nuevoPromedio: number): IResultado<Estudiante> {
    if (nuevoPromedio < 0 || nuevoPromedio > 10) {
      return { ok: false, mensaje: "Promedio inválido" };
    }

    for (let i = 0; i < this.estudiantes.length; i++) {
      if (this.estudiantes[i].id === id) {
        this.estudiantes[i].promedio = nuevoPromedio;
        return { ok: true, mensaje: "Promedio actualizado", data: this.estudiantes[i] };
      }
    }
    return { ok: false, mensaje: "Estudiante no existe" };
  }

  cambiarEstado(id: number, activo: boolean): IResultado<Estudiante> {
    for (let i = 0; i < this.estudiantes.length; i++) {
      if (this.estudiantes[i].id === id) {
        this.estudiantes[i].activo = activo;
        return { ok: true, mensaje: "Estado actualizado", data: this.estudiantes[i] };
      }
    }
    return { ok: false, mensaje: "Estudiante no existe" };
  }

  listarActivos(): Estudiante[] {
    const activos: Estudiante[] = [];
    for (let i = 0; i < this.estudiantes.length; i++) {
      if (this.estudiantes[i].activo) {
        activos.push(this.estudiantes[i]);
      }
    }
    return activos;
  }

  promedioGeneral(): number {
    let suma = 0;
    let contador = 0;

    for (let i = 0; i < this.estudiantes.length; i++) {
      suma += this.estudiantes[i].promedio;
      contador++;
    }

    return contador === 0 ? 0 : suma / contador;
  }
}

function mostrarMenu(): void {
  console.log("=== SISTEMA DE ESTUDIANTES ===");
}

function ejecutarDemo(sistema: SistemaEstudiantes): void {
  console.log("\nAgregando estudiantes...");
  console.log(sistema.agregar(new Estudiante(1, "Anthony", 25, "Software", true, 9)));
  console.log(sistema.agregar(new Estudiante(2, "Fernando", 20, "Interfaces", true, 8)));
  console.log(sistema.agregar(new Estudiante(3, "Jhostin", 22, "Metodologías", true, 10)));

  console.log("\nListar todos:");
  console.log(sistema.listar());

  console.log("\nBuscar por ID 2:");
  console.log(sistema.buscarPorId(2));

  console.log("\nActualizar promedio ID 2:");
  console.log(sistema.actualizarPromedio(2, 9));

  console.log("\nCambiar estado a inactivo ID 3:");
  console.log(sistema.cambiarEstado(3, false));

  console.log("\nListar solo activos:");
  console.log(sistema.listarActivos());

  console.log("\nPromedio general:");
  console.log(sistema.promedioGeneral());
}

mostrarMenu();
const sistema = new SistemaEstudiantes();
ejecutarDemo(sistema);