import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import {AppService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
 
  cadastroForm:any = FormGroup;
  response:any;

  constructor(private service: AppService,
              private router:Router,
              private snackbar: SnackbarService,
              private fb:FormBuilder) { }

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      name:[null,[Validators.required]],
      email:[null,[Validators.required]],
      password:[null,[Validators.required]]

    })
  }

  ngSubmit(){
    var formData = this.cadastroForm.value;
    var data = {
      name: formData.name,
      email:formData.email,
      password: formData.password
    }
    this.service.cadastro(data).subscribe((res:any)=>{
       console.log(res);
       this.response = res;
       this.snackbar.openSnackBar(this.response.message,"");
    },(error)=>{
      console.log(error.error?.message);
      if(error.error?.message){
        this.response = error.error?.message
      }else{
        this.response = GlobalConstants.genericError;
      } 

      this.snackbar.openSnackBar(this.response,GlobalConstants.error)
    })

    this.cadastroForm.reset();
  }
 
  


}
