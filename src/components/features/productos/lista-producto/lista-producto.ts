import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductoService } from '../../../../app/service/producto-service';
import { Producto } from '../../../../app/model/producto';
import Swal from 'sweetalert2';
import { Categoria } from '../../../../app/model/categoria';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-producto',
  imports: [],
  templateUrl: './lista-producto.html',
  styleUrl: './lista-producto.css',
})
export class ListaProducto implements OnInit {
  readonly titulo: string = 'Productos';

  listaProductos = signal<Producto[]>([]);

  private service = inject(ProductoService);

  private router = inject(Router);

  ngOnInit(): void {
    this.cargarProductos();
  }

  private cargarProductos(): void {
    this.service.mostrarProductos().subscribe({
      next: losProductos => {
        this.listaProductos.set(losProductos);
        console.log('Productos cargados:', losProductos);
      },
      error: err => console.error('Error al cargar productos:', err)
    });
  }

  eliminar(producto: Producto): void {
    if (producto.idProducto === undefined) {
      Swal.fire('Error', 'No se puede eliminar un producto sin un ID válido.', 'error');
      return;
    }

    Swal.fire({
      title: `¿Estás seguro de eliminar este producto: ${producto.nombreProducto  }?`,
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminarProducto(producto.idProducto!).subscribe({
          next: () => {
            this.cargarProductos();
            Swal.fire({
              title: "¡Producto eliminado!",
              text: `El producto "${producto.nombreProducto}" ha sido eliminado.`,
              icon: "success"
            });
          },
          error: (err) => {
            console.error('Error al eliminar:', err);
            Swal.fire('Error', 'No se pudo eliminar el producto del servidor.', 'error');
          }
        });
      }
    });
  }

  irAForm(producto?: Producto): void {
    if (producto) {
      this.router.navigate(['/ProductoForm', producto.idProducto]);
    } else {
      this.router.navigate(['/ProductoForm']);
    }
  }
}
