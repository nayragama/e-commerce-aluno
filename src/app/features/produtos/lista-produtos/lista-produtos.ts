import { Component } from '@angular/core';
import { Produto } from '../produto/produto';
import { signal } from '@angular/core';
import { computed } from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { effect } from '@angular/core';
import { title } from 'process';
import { strict } from 'assert';
import { error } from 'console';
import { produtosService } from '../produto/produtos.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  private produtosService = inject(produtosService);
  //!============= Sgnals ==============
 produtos = signal<{nome: string; preco: number}[]>([]);
 carregando = signal(true);
 erro = signal<string | null>(null);
  //!função para exibir produtos selecionados pelo usuarios no console
  exibirProduto (nome: string){
    console.log ('Produto Selecionado: ', nome);
    this.produtoSelecionado.set(nome);
  }
  //!função que adicionar produtos usando metodo update
  adicionarProduto(){
    this.produtos.update(listaAtual =>[
      ...listaAtual,
      {nome:'playstation 5', preco:3000}
]);
  }
  //!função que contabiliza a quatidade de itens de produtos na lista
  totalProdutos = computed(() => this.produtos().length);
  //!função que calcula o valor total do produtos usando o metado computed
  valorTotal = computed(()=>
  {return this.produtos().reduce((total, item) =>
    total + item.preco,0)});
    //!função que substituir a lista atual usando metodo set()
    substituirProdutos(){
      this.produtos.set([
        {nome:'Teclado', preco: 50},
        {nome:'Mouse', preco: 15},
        {nome:'Monitor', preco: 500},
        {nome:'Desktop', preco: 1500},
        {nome:'headset', preco: 30},
      ])
    }
    //?=============== MÉTODO HTTP CLINT (API) ==============
    carregarProdutos(){
      this.erro.set(null); //Limpa o estado de erro antes de iniciar a requisição
      this.carregando.set(true); //ativar o sinal de carregamento antes de iniciar a requisição
      this.produtosService.buscarProdutos().subscribe({
        next: (dados) => {
          const produtos = this.produtosService.transformarProdutos(dados);
          this.produtos.set(produtos);
          this.carregando.set(false);
        },
        error: (erro) => {
          console.error('Erro ao carregar produtos:', erro);
          this.carregando.set(false);
        }
      });
     }
//** =================== CONSTRUCTOR =====================
    //! metodo para monitorar alterações em tempo real usando effect
    constructor(){
      //? Carrega a API
      this.carregarProdutos();
      //! effect continuam iguais - não mexer
      effect(() => {
        console.log ('Lista de Produtos Alterados: ', this.produtos());
      });
      effect(() => {
        console.log('Valor Total Atualizado: ', this.valorTotal());
      });
      effect(() => {
        if (typeof document !== 'undefined'){
       document.title = `(${this.totalProdutos()}) -Loja da Nayra`;
        }
      });
    }
    //! Metodo para criar um estado de seleção com signal string | null
    produtoSelecionado = signal <string | null>(null);
    //! metodo para criar um estado para carrinho com signal
    carrinho = signal <{nome: string; preco: number}[]>([]);
    adicionarAoCarrinho(produto:{nome: string; preco: number}){
      this.carrinho.update(listaAtual =>[...listaAtual, produto]
        );
          }
  //! totalProdutos = computed(() => this.produtos().length;
  //metodo para calcular a quantidade total de itns no carrinho
  quantidadeCarrinho = computed(() => this.carrinho().length);
  //metodo para calcular o valor total dos itens do carrinho
  totalCarrinho = computed(() => {
    return this.carrinho().reduce((total, item) =>
    total + item.preco,0)});
    //! valorTotal = computed(() => {
    //! return this.produtos().reduce((total, item) =>     
 }