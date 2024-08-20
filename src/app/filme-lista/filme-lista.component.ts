import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

interface Filme {
  id: number;
  nome: string;
  duracao: number;
  lancamento: string;
  autor: string;
  orcamento: number;
  categoria: string;
}

@Component({
  selector: 'app-filme-lista',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    DropdownModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './filme-lista.component.html',
  styleUrl: './filme-lista.component.css'
})
export class FilmeListaComponent {
  filmes: Array<Filme> = [];
  carregandoFilmes: boolean = false;

  categorias = [
    { "id": "Terror", "nome": "Terror" },
    { "id": "Suspense", "nome": "Suspense" },
    { "id": "Ação", "nome": "Ação" },
  ]

  visible: boolean = false;

  nome: string = "";
  duracao: number = 0;
  lancamento: string = "";
  autor: string = "";
  orcamento: number = 0;
  categoria: any = "";


  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router) {
  }

  ngOnInit() {
    this.consultar();
  }

  consultar() {
    this.carregandoFilmes = true;
    this.httpClient.get<Array<Filme>>("http://localhost:3000/filmes")
      .subscribe(x => this.aposConsultar(x));
  }

  aposConsultar(dados: Array<Filme>) {
    this.filmes = dados;
    this.carregandoFilmes = false;
  }

  apagar(filme: Filme) {
    this.confirmationService.confirm({
      // target: event.target as EventTarget,
      message: `Deseja realmente apagar '${filme.nome}'?`,
      header: 'CUIDADO',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: "Sim",
      rejectLabel: "Não",
      // acceptIcon:"none",
      // rejectIcon:"none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.httpClient.delete(`http://localhost:3000/filmes/${filme.id}`)
          .subscribe(x => this.apagouRegistro());
      },
      reject: () => {
        this.messageService.add({ severity: 'success', detail: 'Seu registro não foi apagado.', life: 3000 });
      }
    });
  }

  apagouRegistro() {
    this.messageService.add({ detail: "Registro apagado com sucesso", severity: "success" });
    // Atualizar os registros pois o filme foi apagado
    this.consultar();
  }

  salvar() {
    let dados = {
      nome: this.nome,
      duracao: this.duracao,
      autor: this.autor,
      lancamento: this.lancamento,
      orcamento: this.orcamento,
      categoria: this.categoria["nome"],
    }
    this.httpClient.post("http://localhost:3000/filmes", dados)
      .subscribe(x => this.aposSalvar(x));
  }

  aposSalvar(x: any) {
    this.limparCampos();
    this.consultar();
    this.visible = false;
  }

  limparCampos() {
    this.nome = "";
    this.duracao = 0;
    this.autor = "";
    this.lancamento = "";
    this.orcamento = 0;
    this.categoria = "";
  }

  editar(id: number) {
    // private router: Router,
    this.router.navigate([`/filmes/${id}`]);
  }

  showDialog() {
    this.visible = true;
  }
}


