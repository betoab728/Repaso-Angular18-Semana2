export class Alumno {
    constructor(
        public idalumno: number,
        public nombre: string,
        public apellidoPaterno: string,
        public apellidoMaterno: string,
        public sexo: string,
        public direccion: string,
        public correo: string,
        public telefono: string,
        public fechaNacimiento: Date,
        public estado: string
      ) {}
}
