import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CarrinhoServise } from '../../../core/services/carrinho.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatToolbarModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
 nomeLoja = 'Loja Da Nayra';
 private carrinhoService = inject(CarrinhoServise);
 quantidadeHeader = this.carrinhoService.quantidadeItens;
}