import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Producto } from '../model/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private http: HttpClient = inject(HttpClient);
  private readonly urlEndPoint: string = 'http://localhost:8084/api/v1/productos';

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  mostrarProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.urlEndPoint);
  }

  mostrarProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.urlEndPoint}/${id}`);
  }

  crearProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.urlEndPoint, producto, { headers: this.httpHeaders });
  }

  eliminarProducto(id: number): Observable<Producto> {
    return this.http.delete<Producto>(`${this.urlEndPoint}/${id}`);
  }

  actualizarProducto(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.urlEndPoint}/${producto.idProducto}`, producto, { headers: this.httpHeaders });
  }
}
