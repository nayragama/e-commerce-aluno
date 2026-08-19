import { Injectable, inject } from '@angular/core';
import { CarrinhoService } from '../services/carrinho.service';

type ItemCarrinho = {
    nome: string;
    preco: number;
}

@Injectable({providedIn: 'root',})

export class CarrinhoFacade {
    private carrinhoService = inject(CarrinhoService);

    itens = this.carrinhoService.itens;
    quantidade = this.carrinhoService.quantidadeItens;
    total = this.carrinhoService.totalItens;
    carrinhoVazio = this.carrinhoService.carrinhoVazio;

    adicionarProduto(produto: ItemCarrinho) {
       this.carrinhoService.adicionar(produto);
    }

    limparCarrinho() {
        this.carrinhoService.limpar();
    }
}