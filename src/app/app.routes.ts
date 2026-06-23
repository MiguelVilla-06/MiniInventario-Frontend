import { Routes } from '@angular/router';
import { ListaCategoria } from '../components/features/categorias/lista-categoria/lista-categoria';
import { CategoriaForm } from '../components/features/categorias/categoria-form/categoria-form';
import { Home } from '../components/shared/home/home';
import { ListaProducto } from '../components/features/productos/lista-producto/lista-producto';
import { ProductoForm } from '../components/features/productos/producto-form/producto-form';

export const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: Home },
  { path: 'ListaCategoria', component: ListaCategoria },
  { path: 'ListaCategorias', component: ListaCategoria },
  { path: 'CategoriaForm', component: CategoriaForm },
  { path: 'CategoriaForm/:id', component: CategoriaForm },
  { path: 'ProductoForm', component: ProductoForm },
  { path: 'ProductoForm/:id', component: ProductoForm },
  { path: 'ListaProductos', component: ListaProducto },
  { path: 'ListaProducto', component: ListaProducto }
];
