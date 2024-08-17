import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProdutoListaComponent } from './produto-lista/produto-lista.component';
import { FilmeListaComponent } from './filme-lista/filme-lista.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink, // Diretiva usada para criar links que permitem a navegação entre componentes
    RouterLinkActive, // Diretiva usada para aplicar classes CSS dinamicamente em um link
    RouterOutlet, // Componente Angular que atua como um componente de
    //  ancoragem ou contâiner onde os componentes serão renderizados
    FormsModule,
    NavbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  nome: string = 'TV Tubalão';
}
