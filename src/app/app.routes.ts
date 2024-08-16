import { Routes } from '@angular/router';
import { ProdutoListaComponent } from './produto-lista/produto-lista.component';
import { FilmeListaComponent } from './filme-lista/filme-lista.component';

export const routes: Routes = [
    { "path": "produtos", component: ProdutoListaComponent },
    { "path": "filmes", component: FilmeListaComponent },
];