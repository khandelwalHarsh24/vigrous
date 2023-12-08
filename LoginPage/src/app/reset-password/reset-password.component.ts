import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  token: string='';
  newPassword: string='';

  constructor(private router: Router,private userService: UserService,private route: ActivatedRoute) {
  
   }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.token=params['token'];
      console.log(this.token);
    })
  }


  onSubmit(){
    this.userService.resetPassword(this.newPassword,this.token).subscribe(
      (response)=>{
        console.log('Password reset response:', response);
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Error resetting password:', error);
        alert(error.error.message);
      }
    )
  }

}
