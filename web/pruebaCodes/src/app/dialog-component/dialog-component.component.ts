import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component'
import { UsuarioDto } from '../modelo/usuario-dto';

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrls: ['./dialog-component.component.css']
})
export class DialogComponentComponent implements OnInit {

  tituloModal: any;
  usuarioDto: UsuarioDto[] = [];
  options: FormGroup;
  selected: any;

  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl();
  constructor(
    public dialog: MatDialogRef<DialogComponentComponent>,
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: UsuarioDto,
  ) {
    this.options = new FormGroup({
      nombre: new FormControl(),
      id_rol: new FormControl(),
      activo: new FormControl(),
      id_usuario: new FormControl(),
    });
  }

  confirm(): void {
    this.dialog.close(this.options.value);
  }
  closeDialog(): void {
    this.dialog.close();
  }
  public traerDatos(data: UsuarioDto) {

    this.options.setValue({
      nombre: data.nombre,
      activo: data.activo,
      id_usuario: data.id_usuario,
      id_rol: data.id_rol
    })
    console.log(data.id_rol)
    var s:any = document.getElementById('select');

  }

  ngOnInit(): void {
    if (this.data) {
      this.tituloModal = 'Actualizar usuario';
      this.traerDatos(this.data)
    } else {
      this.tituloModal = 'Crear Usuario';
    }

  }

}
