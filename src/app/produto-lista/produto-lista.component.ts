import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produto-lista',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './produto-lista.component.html',
  styleUrl: './produto-lista.component.css'
})
export class ProdutoListaComponent {
  nomeProduto: string = '';
  indiceAlterar: number = -1;
  mensagemErro: string = '';
  tituloBotaoSalvarProduto: string = 'Cadastrar'

  produtos: Array<string> = [
    "iPhone 14",
    "Motorola G7",
    "Xioami 9",
    "Nokia"
  ]

  salvarProduto() {
    // Limpar mensagem de erro
    this.mensagemErro = '';

    if (this.nomeProduto.length < 3){
      this.mensagemErro = "Produto deve conter no mínimo 3 caracteres";
      return;
    }

    // Verificar se o produto está cadastrado
    let existeProduto = this.produtos.some(x => x === this.nomeProduto);
    if (existeProduto === true) {
      this.mensagemErro = `Produto já cadastrado com o nome '${this.nomeProduto}'`;
      return;
    }

    // Verificar se está no modo de cadastro
    if (this.indiceAlterar === -1) {
      // Adicionar o nome do produto que o usuário preencheu no input na lista de produtos
      this.produtos.push(this.nomeProduto);
    } else {
      // Alterar o nome do produto no indice que o usuário escolheu para editar
      this.produtos[this.indiceAlterar] = this.nomeProduto;
      // Reset para o usuário poder cadastrar novamente
      this.indiceAlterar = -1;
      // Redefinir o texto do botão para Cadastrar, para que o usuário saiba que está Cadastrando um produto
      this.tituloBotaoSalvarProduto = "Cadastrar";
    }
    // Limpar campo
    this.nomeProduto = "";
  }

  apagarProduto(nomeProduto: string) {
    let indiceProduto = this.produtos.findIndex(x => x === nomeProduto);
    this.produtos.splice(indiceProduto, 1);
  }

  // Preencher os campos com os dados do produto
  editarProduto(nomeProduto: string) {
    this.indiceAlterar = this.produtos.findIndex(x => x === nomeProduto);
    this.tituloBotaoSalvarProduto = "Editar";
    this.nomeProduto = nomeProduto;
  }
}
