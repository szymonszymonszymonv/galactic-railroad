import { Component, OnInit } from '@angular/core';
import Admin from '../admin';
import { AdminService } from '../admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  private admin: Admin = new Admin()

  adminForm = new FormGroup ({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(5)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    passwordConfirm: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ])
  })

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.adminForm.value)
    // service.createAdmin()
    this.adminForm.reset()
    
  }

}
