import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }
  apiUrl = 'http://backend.localhost/api/v1/clients';

  public retriveClientName(id: number) {
    return this.http.get<ClientName>(this.apiUrl + "/" + id + "/name")
  }
}
interface ClientName {
  clientName: string;
}
