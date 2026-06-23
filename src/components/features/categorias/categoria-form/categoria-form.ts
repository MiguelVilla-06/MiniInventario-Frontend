import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Categoria } from '../../../../app/model/categoria';
import { Router } from '@angular/router';
import { CategoriaService } from '../../../../app/service/categoria-service';
import Swal from 'sweetalert2';
import { NgClass } from '@angular/common'; // ¡Corregido el import de NgClass aquí!
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-categoria-form',
  // NgClass para poder usarlo con Bootstrap
  imports: [FormsModule, NgClass],
  templateUrl: './categoria-form.html',
  styleUrl: './categoria-form.css',
})
export class CategoriaForm implements OnInit {
  readonly title = 'Categorías form';
  laCategoria = signal(new Categoria());

  id = input<number>();
  private router = inject(Router);
  private service = inject(CategoriaService);

  ngOnInit(): void {
    this.cargarCategoria();
  }

  private cargarCategoria(): void {
    const elid = this.id();
    if (elid) {
      this.service.mostrarCategoria(elid).subscribe({
        next: (laCategoriaLeida) => this.laCategoria.set(laCategoriaLeida),
        error: (err) => console.error('Error al cargar la categoría:', err)
      });
    }
  }

  // MÉTODO PÚBLICO
  guardar(form: NgForm): void {
    if (form.invalid) return;
    if (this.id()) {
      this.actualizarCategoria();
    } else {
      this.guardarCategoria();
    }
  }


  private guardarCategoria(): void {

    const nuevaCategoria = { ...this.laCategoria() };

    delete nuevaCategoria.idCategoria;
    this.service.crearCategoria(nuevaCategoria).subscribe({
      next: (categoriaCreada) => {
        console.log('Categoría creada:', categoriaCreada);
        this.router.navigate(['/ListaCategoria']);
        Swal.fire({
          title: 'Categoría creada',
          text: `La categoría "${categoriaCreada.nombreCategoria}" ha sido creada exitosamente.`,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      },
      error: (err) => console.error('Error al crear la categoría:', err)
    });
  }

  private actualizarCategoria(): void {
    this.service.actualizarCategoria(this.laCategoria()).subscribe({
      next: () => {
        this.router.navigate(['/ListaCategoria']);
        Swal.fire({
          title: 'Categoría actualizada',
          text: `La categoría "${this.laCategoria().nombreCategoria}" ha sido actualizada exitosamente.`,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      },
      error: (err) => console.error('Error al actualizar la categoría:', err)
    });
  }

  cancelar(): void {
    this.router.navigate(['/ListaCategorias']);
  }
}
