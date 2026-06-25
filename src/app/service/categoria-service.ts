import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Categoria } from '../model/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private http: HttpClient = inject(HttpClient);
  private readonly urlEndPoint: string = 'https://miniinventario-backend-90d7.onrender.com/api/v1/categoria';

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  mostrarCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.urlEndPoint);
  }

  mostrarCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.urlEndPoint}/${id}`);
  }

  crearCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.urlEndPoint, categoria, { headers: this.httpHeaders });
  }

  eliminarCategoria(id: number): Observable<Categoria> {
    return this.http.delete<Categoria>(`${this.urlEndPoint}/${id}`);
  }

  actualizarCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.urlEndPoint}/${categoria.idCategoria}`, categoria, { headers: this.httpHeaders });
  }
}
