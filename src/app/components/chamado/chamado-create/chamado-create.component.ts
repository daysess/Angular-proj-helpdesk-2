import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

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
    private router:         Router
  ) { }

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
  }

  create():void{
    this.chamadoService.create(this.chamado).subscribe(resposta => {
      this.toastService.success('Chamado criado com sucesso!', 'Novo chamado');
      this.router.navigate(['chamados']);
    }, ex => {
      console.log(ex);
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

}
