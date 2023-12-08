import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email='';
  password='';
  constructor(private userService:UserService,private route: Router) { }

  ngOnInit(): void {
  }


  onSubmit() {
    this.userService.loginUser(this.email,this.password).subscribe((response)=>{
      this.route.navigateByUrl(`/home/${response.userdata._id}`)
    }
    ,(error) => {
      // Handle error
      alert(error.error.message)
      // console.error('Password or Email is Incorrect', error);
      // Optionally, you can display an error message to the user
    })
  }

}
