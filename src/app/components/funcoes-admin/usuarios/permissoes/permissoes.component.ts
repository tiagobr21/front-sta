import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AppService } from 'src/app/services/user.service';
import { UpdateComponent } from './update/update.component';

@Component({
  selector: 'app-permissoes',
  templateUrl: './permissoes.component.html',
  styleUrls: ['./permissoes.component.css']
})
export class PermissoesComponent implements OnInit {
  
  sideBarOpen = true;
  users:any
  response:any


  constructor(private service: AppService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.service.obter().subscribe((res:any)=>{
      this.users = res;
      
    })

    this.sideBarOpen = false;
  }

  openUpdate(id:any){
   this.dialog.open(UpdateComponent,{
    data:id,
    width: '600px',
    height:'450px'
  });
  }


  refresh(){
    window.location.reload();
  }
 
  
  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }

  delete(id:any){
    this.service.delete(id).subscribe((res)=>{
      this.response = res
      console.log(this.response);
      this.service.obter().subscribe((res:any)=>{
        this.users = res;
      })
    
    })
  }

}
