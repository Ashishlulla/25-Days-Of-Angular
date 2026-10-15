import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from './Models/user';
import { UserService } from './Services/user-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { fromReadableStreamLike } from 'rxjs/internal/observable/innerFrom';
import { ThisReceiver } from '@angular/compiler';

@Component({
  imports: [RouterOutlet, ReactiveFormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  
  users: User[] = [];
  isLoading: boolean = true
  errorMessage: string = '';
  

  

  constructor(private userService: UserService, private cdr: ChangeDetectorRef ){}

  //Add Userform
  userForm = new FormGroup({
  name: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required]
  }),
  email: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email]
  }),
  username: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required]
  })
});

isEditMode: boolean = false;
selectedUser: User | null = null;
  
  
  //Fetch User from Service Method
  ngOnInit(): void 
  {
    console.log('1. loadUsers() called');
  
    this.userService.getUsers().subscribe({
    next: (data) => {
    console.log('API SUCCESS:', data.length);
    this.users = data;
  
    this.isLoading = false;

    this.cdr.detectChanges();

    console.log('STATE:', this.isLoading, this.users.length);
  },

    error: (error) => {
      console.error('API error:', error);
      this.errorMessage = 'Failed to load users.';
      this.isLoading = false;
    }
  });
}

  addUser(user: Omit<User,'id'>): void{
    this.userService.addUser(user).subscribe({next:(createdUser)=>{
      this.users.push({
        id: createdUser.id,
        name: user.name,
        email: user.email,
        username: user.username
       });

       this.userForm.reset()
       this.ngOnInit();
      console.log("Successfully added User: ", this.users);
    },error: (error)=>{
      console.log("Error adding User", error);
      this.errorMessage = error;
  }});
  }

  deleteUser(id: number): void{
    this.userService.deleteUser(id).subscribe({next: ()=>{
      this.users = this.users.filter(u=>u.id !==id);}, 
      error: (error)=>{
        console.log("Error Deleting User:", error);
        this.errorMessage = error;
      }});
  }

  editUser(user: User): void{
    this.isEditMode = true;
    this.selectedUser = user;

    this.userForm.patchValue({
      name: user.name,
      email:  user.email,
      username: user.username
    });
  }

  updateUser(user: User){
     const updatedUser: User = {
      id: user.id,
      name: this.userForm.controls.name.value,
      email: this.userForm.controls.email.value,
      username: this.userForm.controls.username.value
     }

     this.userService.updateUser(updatedUser).subscribe({next: ()=>{
        this.users.map(u=>u.id === updatedUser.id ? updatedUser: u);

        console.log("Updated User: ", updatedUser);
        this.isEditMode = false;
        this.selectedUser = null;
        this.userForm.reset();
     }, 
     error: (error)=>{console.log("Error Updating User", error);
      this.errorMessage = error;
     }})
  }



}
