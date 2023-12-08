import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username='';
  password='';
  email='';

  constructor(private router: Router,private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.registerUser(this.username,this.email,this.password).subscribe(
      (response) => {
        // Handle successful registration
        // console.log('User registered successfully:', response);
        // Optionally, you can navigate to a different route after successful registration
        this.router.navigate(['/login']);
      },
      (error) => {
        // Handle registration error
        alert(error.error.message);
        console.error('Error registering user:', error);
        // Optionally, you can display an error message to the user
      }
    );
  }

}
