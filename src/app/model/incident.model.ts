import { Categoria } from './category.model';  
import  { User } from './user.model'; 
export interface Incident {
  incidenciaId: number;
  descripcion: string;
  direccion: string;
  fecha: Date;
  latitud: number;
  longitud: number;
  localidad: string;
  usuarioId: number;
  categoriaId: number;
}