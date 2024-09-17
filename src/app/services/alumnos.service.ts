import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { Alumno } from '../models/alumno.model';
import { tap, catchError,retry } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private apiUrl = 'http://localhost:8080/alumnos'; // URL API Spring Boot

  private alumnosSubject = new BehaviorSubject<Alumno[]>([]);
  alumnos$ = this.alumnosSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.apiUrl).pipe(
      retry(3), // Reintenta 3 veces en caso de errores transitorios
      tap((alumnos) => this.alumnosSubject.next(alumnos)),
      catchError((error) => this.handleError(error))
    );
  }
  
  getAlumnoById(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.apiUrl}/${id}`).pipe(
      retry(3), // Reintenta solo en errores transitorios
      catchError((error) => this.handleError(error))
    );
  }

  addAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(this.apiUrl, alumno).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  updateAlumno(id: number, alumno: Alumno): Observable<Alumno> {
    return this.http.put<Alumno>(`${this.apiUrl}/${id}`, alumno).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  deleteAlumno(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  // Método para obtener los alumnos almacenados en el servicio
  getStoredAlumnos(): Alumno[] {
    return this.alumnosSubject.value;
  }

   // Manejo de errores
   private handleError(error: HttpErrorResponse) {
    // Puedes mostrar el error en la consola si deseas

    let errorMessage = 'Error inesperado. Por favor intente más tarde.';

    if (error.status === 0) {
      // Error de red
      errorMessage = 'Error de conexión. Verifique su red.';
    } else {
      // Errores específicos del servidor
      switch (error.status) {
        case 400:
          errorMessage = 'Eror 400 - Solicitud incorrecta.';
          break;
        case 404:
          errorMessage = 'Eror 404 - Recurso no encontrado.';
          break;
        case 500:
          errorMessage = 'Eror 500- Error interno del servidor.';
          break;
        default:
          errorMessage = `Error inesperado: ${error.message}`;
          break;
      }
    }

    console.error('Ocurrió un error:', error.message);


    // Redirige a la página de error con el mensaje de error
    this.router.navigate(['/error'], { queryParams: { message: errorMessage } });


    // Devuelve un Observable con un mensaje de error
    return throwError(() => new Error('Error en la solicitud; por favor intente nuevamente más tarde.'));
  }

}
