export class Categoria {
  idCategoria?: number;
  nombreCategoria: string="";
  descripcionCategoria: string="";
  createAt: string = new Date().toISOString().split('T')[0];
}
