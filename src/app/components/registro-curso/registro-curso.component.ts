import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-registro-curso',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './registro-curso.component.html',
  styleUrl: './registro-curso.component.css'
})

export class RegistroCursoComponent {

  cursoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.cursoForm = this.fb.group({
      nombreCurso: ['', [Validators.required, Validators.minLength(5)]],
      profesor: ['', Validators.required],
      duracion: ['', [Validators.required, this.validateDuracion]],
      fechaInicio: ['', Validators.required],
      emailContacto: ['', [Validators.required, Validators.email], this.emailValidator]
    });
  }

  // Validador personalizado síncrono (ej: duración entre 1 y 52 semanas)
  validateDuracion(control: AbstractControl) {
    const duracion = control.value;
    if (duracion < 1 || duracion > 52) {
      return { invalidDuracion: true };
    }
    return null;
  }

  // Validador asíncrono de email
  emailValidator(control: AbstractControl): Observable<any> {
    return new Observable(observer => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          observer.next({ emailTaken: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 2000);
    });
  }

  // Método para enviar el formulario
  onSubmit() {
    if (this.cursoForm.valid) {
      console.log('Formulario enviado', this.cursoForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}