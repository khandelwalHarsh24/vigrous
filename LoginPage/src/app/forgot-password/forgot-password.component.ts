import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {


  email='';
  resetLinkSent = false
  constructor(private userService: UserService,private route: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.email);
    this.userService.forgetPassword(this.email).subscribe((response)=>{
      // console.log('Reset password link sent successfully:', response);
      this.resetLinkSent=true;
    },(error) => {
      // Handle error
      console.error('Error sending reset password link:', error);
      alert(error.error.message)
      this.route.navigateByUrl("/register");
  
    })
  }

}
