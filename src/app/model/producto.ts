import { Categoria } from "./categoria";

export class Producto {
  idProducto?: number;
  nombreProducto: string="";
  descripcionProducto: string="";
  precioProducto: number = 0;
  existencia: number = 0;
  idCategoria?: Categoria;
  createAt: string = new Date().toISOString().split('T')[0];
}
