export interface Incident {
  incidenciaId: number;
  descripcion: string;
  direccion: string;
  fecha: Date;
  latitud: number;
  longitud: number;
  localidad: string;
  usuario_id: number; 
  categoria_id: number
}