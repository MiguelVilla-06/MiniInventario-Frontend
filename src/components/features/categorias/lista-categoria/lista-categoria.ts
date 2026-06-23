import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- 1. AGREGA ESTA IMPORTACIÓN
import { Categoria } from '../../../../app/model/categoria';
import { CategoriaService } from '../../../../app/service/categoria-service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-categoria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-categoria.html',
  styleUrl: './lista-categoria.css',
})
export class ListaCategoria implements OnInit {
  readonly titulo: string = 'Categorías de productos';


  listaCategorias = signal<Categoria[]>([]);


  private service = inject(CategoriaService);

  private router = inject(Router);

  ngOnInit(): void {
    this.cargarCategorias();
  }

  private cargarCategorias(): void {
    this.service.mostrarCategorias().subscribe({
      next: lasCategorias => {
        this.listaCategorias.set(lasCategorias);
        console.log('Categorías cargadas:', lasCategorias);
      },
      error: err => console.error('Error al cargar categorías:', err)
    });
  }

  eliminar(categoria: Categoria): void {
    if (categoria.idCategoria === undefined) {
      Swal.fire('Error', 'No se puede eliminar una categoría sin un ID válido.', 'error');
      return;
    }

    Swal.fire({
      title: `¿Estás seguro de eliminar esta categoría: ${categoria.nombreCategoria}?`,
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminarCategoria(categoria.idCategoria!).subscribe({
          next: () => {
            this.cargarCategorias();
            Swal.fire({
              title: "¡Categoría eliminada!",
              text: `La categoría "${categoria.nombreCategoria}" ha sido eliminada.`,
              icon: "success"
            });
          },
          error: (err) => {
            console.error('Error al eliminar:', err);
            Swal.fire('Error', 'No se pudo eliminar la categoría del servidor.', 'error');
          }
        });
      }
    });
  }

  irAForm(categoria?: Categoria): void {
    if (categoria) {
      this.router.navigate(['/CategoriaForm', categoria.idCategoria]);
    } else {
      this.router.navigate(['/CategoriaForm']);
    }
  }
}
