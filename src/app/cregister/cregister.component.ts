import { Component } from '@angular/core';

@Component({
  selector: 'app-cregister',
  templateUrl: './cregister.component.html',
  styleUrl: './cregister.component.css'
})
export class CregisterComponent {

  onSubmit(formValue: any) {
    console.log('Formulario enviado', formValue);
    // Aquí puedes manejar la lógica para registrar al usuario
  }

}
