import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { dUsuario } from "./modelo-usuario";
import { mUSUARIOS} from "./modelo-usuario-detail";
import Data from './usuarios-test.json';

@Component({
  selector: 'app-menu-gestion-usuarios',
  templateUrl: './menu-gestion-usuarios.component.html',
  styleUrls: ['./menu-gestion-usuarios.component.scss']
})

export class MenuGestionUsuariosComponent implements OnInit {
  selectedUsuario?: dUsuario;
  listaUsuarios:any;
  url: string = '/assets/usuarios-mock.json';
  onSelect(usuario: dUsuario): void {
    this.selectedUsuario = usuario;
  }

  public constructor(private http:HttpClient) {}

  public ngOnInit(): void {
    this.http.get(this.url).subscribe(response => {
      this.listaUsuarios = response;
    });    
  }
}
