import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculadora',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './calculadora.html',
  styleUrl: './calculadora.css',
})
export class Calculadora {
  titulo: string = 'Operaciones Básicas';
  resultado: number = 0;
  numero1: number = 10;
  numero2: number = 10;

  sumar(): void {
    this.resultado = this.numero1 + this.numero2;
  }

  restar(): void {
    this.resultado = this.numero1 - this.numero2;
  }

  multiplicar(): void {
    this.resultado = this.numero1 * this.numero2;
  }

  dividir(): void {
    if (this.numero2 !== 0) {
      this.resultado = this.numero1 / this.numero2;
    } else {
      alert("No se puede dividir por cero");
    }
  }
}
