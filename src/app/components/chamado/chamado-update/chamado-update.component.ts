import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css']
})
export class ChamadoUpdateComponent implements OnInit {

  chamado: Chamado = {
    idPrioridade:   '',
    idStatus:       '',
    titulo:         '',
    observacoes:    '',
    idTecnico:      '',
    idCliente:      '',
    nomeCliente:    '',
    nomeTecnico:    ''
  }

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  idPrioridade:   FormControl = new FormControl(null, [Validators.required]);
  idStatus:       FormControl = new FormControl(null, [Validators.required]);
  titulo:         FormControl = new FormControl(null, [Validators.required]);
  observacoes:    FormControl = new FormControl(null, [Validators.required]);
  idTecnico:      FormControl = new FormControl(null, [Validators.required]);
  idCliente:      FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private toastService:   ToastrService,
    private router:         Router,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.chamado.id = this.activateRoute.snapshot.paramMap.get('id');
    this.findById();
    this.findAllClientes();
    this.findAllTecnicos();
  }

  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe(resposta => {
      this.chamado = resposta;
    }, ex =>{
      this.toastService.error(ex.error.error);
    });
  }

  update():void{
    this.chamadoService.update(this.chamado).subscribe(resposta => {
      this.toastService.success('Chamado atualizado com sucesso!', 'Atualizar chamado');
      this.router.navigate(['chamados']);
    }, ex => {
      // console.log(ex);
      this.toastService.error(ex.error.error);
    })
  }

  findAllClientes():void{
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }

  findAllTecnicos():void{
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    })
  }

  validaCampos(): boolean {
    return this.idPrioridade.valid && 
           this.idStatus.valid &&
           this.titulo.valid &&
           this.observacoes.valid &&
           this.idTecnico.valid &&
           this.idCliente.valid
  }

  retornaStatus(status: any): string {
    if(status == '0'){
      return 'ABERTO';
    } else if(status == '1'){
      return 'EM ANDAMENTO';
    } else {
      return 'ENCERRADO';
    }
  }

  retornaPrioridade(prioridade: any): string {
    if(prioridade == '0'){
      return 'BAIXA';
    } else if(prioridade == '1'){
      return 'MEDIA';
    } else {
      return 'ALTA';
    }
  }

}
