export interface User {
    id?: number; // Opcional si es autogenerado
    primer_nombre: string;
    segundo_nombre?: string;
    primer_apellido: string;
    segundo_apellido?: string;
    use_email: string;
    use_pass: string;
    rol_id: string; // 'admin' o 'user'
  }