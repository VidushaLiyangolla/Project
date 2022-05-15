import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../_interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = 'http://localhost:8080';

  constructor(
    private http: HttpClient
  ) { }

  public getUsers(): Observable<any> {
    return this.http.get<User[]>(`${this.api}/user`);
  }

  public editUser(user: User): Observable<any> {
    return this.http.post<User>(`${this.api}/user/${user.id}`, user);
  }

  public addUser(user: User): Observable<any> {
    return this.http.put<User>(`${this.api}/user`, user);
  }

  public deleteUser(id: number): Observable<any> {
    return this.http.delete<User>(`${this.api}/user/${id}`);
  }
}


