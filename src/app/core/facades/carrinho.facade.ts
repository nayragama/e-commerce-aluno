import { Injectable, inject } from '@angular/core';
import { CarrinhoService } from '../services/carrinho.service';
import { ItemCarrinho } from '../models/item-carrinho';

@Injectable({
   providedIn: 'root',
})
export class CarrinhoFacade {
   
    private carrinhoService = inject(CarrinhoService);

    itensCarrinho = this.carrinhoService.itens;
    quantidadeCarrinho = this.carrinhoService.quantidade;
    totalCarrinho = this.carrinhoService.total;
    carrinhoVazio = this.carrinhoService.carrinhoVazio;
   
    adicionarProduto(produto: ItemCarrinho) {
        this.carrinhoService.adicionar(produto);
    }

    removerItem(index: number) {
        this.carrinhoService.removerPorIndice(index);
    }

    limparCarrinho() {
        this.carrinhoService.limpar();
    }
}