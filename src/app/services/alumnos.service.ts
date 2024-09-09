import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';
import { Alumno } from '../models/alumno.model';
import { tap } from 'rxjs/operators';
import { console } from 'inspector';
 

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private apiUrl = 'http://localhost:8080/alumnos'; // URL API Spring Boot

  private alumnosSubject = new BehaviorSubject<Alumno[]>([]);
  alumnos$ = this.alumnosSubject.asObservable();

  constructor(private http: HttpClient) { }

  getAlumnos(): Observable<Alumno[]> {

    
    return this.http.get<Alumno[]>(this.apiUrl).pipe(
      
      tap((alumnos) => this.alumnosSubject.next(alumnos))
     
    );
  }

  getAlumnoById(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.apiUrl}/${id}`);
  }

  addAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(this.apiUrl, alumno);
  }

  updateAlumno(id: number, alumno: Alumno): Observable<Alumno> {
    return this.http.put<Alumno>(`${this.apiUrl}/${id}`, alumno);
  }

  deleteAlumno(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }

  // Método para obtener los alumnos almacenados en el servicio
  getStoredAlumnos(): Alumno[] {
    return this.alumnosSubject.value;
  }
}
