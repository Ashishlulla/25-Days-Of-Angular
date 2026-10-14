import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './Services/user-service';
import { User } from './Models/user';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {

  constructor(private userService: UserService){}

  users: User[]=[];
  isLoading: boolean = true;
  errorMessage: string = ''

  ngOnInit(): void {
    this.userService.getUsers().subscribe({next: (data)=>{
      this.users= data;
      console.log('Data Fetched', data);
      this.isLoading = false;
    }, 
    error: (error)=>{
      console.log("Error Fetching users...", error);
      this.errorMessage = error;
      this.isLoading = false;
    }});
  
  }
}
