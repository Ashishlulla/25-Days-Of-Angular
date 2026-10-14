import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl: string = 'https://jsonplaceholder.typicode.com/users';

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl);
  }
}
