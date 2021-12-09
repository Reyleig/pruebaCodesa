import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponentComponent } from '../dialog-component/dialog-component.component'
import { UsuarioDto } from '../modelo/usuario-dto';
import { UserServiceService } from '../services/user-service.service'
import Swal from 'sweetalert2'

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  animal: string = '';
  name: string = '';
  usuarioDto: UsuarioDto[] = [];
  nombreUsuario: string = '';

  displayedColumns: string[] = ['id', 'rol', 'nombre', 'activo', 'actions'];

  dataSource = new MatTableDataSource;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private userServiceService: UserServiceService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponentComponent, {
      width: '250px',
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  public obtenerStateUsuario(nombe?: string) {
    let usuario: UsuarioDto = { nombre: this.nombreUsuario };

    this.userServiceService.getUserByText(usuario).subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data.payload);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, error => {
      console.log(error);
    })

  }
  public eliminarUsuario(id: number, nombre: string) {
    let usuario: UsuarioDto = { nombre: this.nombreUsuario };

    Swal.fire({
      title: 'Desea eliminar el usuario ' + nombre,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.userServiceService.deleteUser(id).subscribe((data: any) => {

          Swal.fire('Eliminado')
        }, error => {
          console.log(error);
        })
      }
    })
  }

  public traerTodosUsuarios() {
    this.userServiceService.getAllUser().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data.payload);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, error => {
      console.log(error);
    })

  }

  openConsultaModal(data?: UsuarioDto) {

    const dialogRef = this.dialog.open(DialogComponentComponent, {
      width: '350px',
      data,
    });

    dialogRef.afterClosed().subscribe((res: UsuarioDto) => {
      if (res) {
        if (!data) {
          this.userServiceService.createUser(res).subscribe(
            (data: any) => {
              if (data.status == 200) {
                this.traerTodosUsuarios()
                Swal.fire('Usuario Creado')
              } else {
                this.traerTodosUsuarios()
                Swal.fire(data.payload.message)
              }
            }, (error) => {
              console.log(error);
            }
          );
        } else {
          this.userServiceService.updateUser(res).subscribe(
            (data:any)=> {
              if (data.status == 200) {
                this.traerTodosUsuarios()
                Swal.fire('Usuario Actualizado')
              } else {
                this.traerTodosUsuarios()
                Swal.fire(data.payload.message)
              }
            }, (error) => {
              console.log(error);
            }
          )
        }

      }
    });

  }

}
