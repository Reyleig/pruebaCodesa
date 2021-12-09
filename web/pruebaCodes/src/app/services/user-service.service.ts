import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioDto } from '../modelo/usuario-dto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class UserServiceService {

  respuesta = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  
  constructor(private httpClient: HttpClient,) { 
  }

  public createUser(data: UsuarioDto): Observable<boolean> {
    return this.httpClient.post<any>(
      environment.url + '/createUser',
      data,
      this.respuesta
    );
  }
  public getAllUser(): Observable<any> {
    return this.httpClient.get<UsuarioDto[]>(
      environment.url + '/getAllUser',
      this.respuesta
    );
  }
  public getUserByText(data: UsuarioDto): Observable<UsuarioDto[]> {
    return this.httpClient.post<UsuarioDto[]>(
      environment.url + '/getUserByText',
      data,
      this.respuesta
    );
  }
  public updateUser(data: UsuarioDto): Observable<any> {
    return this.httpClient.patch<UsuarioDto[]>(
      environment.url + '/updateUser',
      data,
      this.respuesta
    );
  }
  public deleteUser(data: number): Observable<any> {
    return this.httpClient.delete<boolean>(
      environment.url + '/deleteUser/'+ data
    );
  }

}
