
import { ClientService } from './../../services/client.service';
import { User } from './../../model/user.model';
import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
clients:User[];
user:User;
deletedId:Number;
updatedId:Number;
closeResult:string;
selectedCriter:string;
cherche:string;

  constructor(private clientService: ClientService,private modalService: NgbModal,private router:Router,private authService:AuthService,private flashMessage:FlashMessagesService) {this.user=new User(); }



  ngOnInit(): void {this.readUsers();
  }
  readUsers(): void {
    this.clientService.readAll()
      .subscribe(
        users => {
          this.clients = users;
          //console.log(users);
        },
        error => {
          console.log(error);
        });
  }




  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit() {
    let isSubmitted:number=0
    this.user.password=this.user.username
    //console.log(this.user)
    this.authService.SignUp(this.user).subscribe((result) => {
      this.ngOnInit();
      isSubmitted=1
    },err=>{
      this.flashMessage.show(err.message, { cssClass: 'alert-danger' } );
    }
    );
  this.modalService.dismissAll(); //dismiss the modal
  console.log(isSubmitted)

  }

  openDelete(targetModal, id: Number) {
this.deletedId=id;
    console.log(id)
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }


  delete() {

    this.clientService.delete(this.deletedId).subscribe(res => {
      console.log(this.deletedId)
         this.clients = this.clients.filter(item => item._id !== this.deletedId);
         this.ngOnInit();
         this.modalService.dismissAll();
         console.log('Client deleted successfully!');

    },err=>{
      this.flashMessage.show(err['error'].msg, { cssClass: 'alert-danger' } );
      this.modalService.dismissAll();
     this.authService.logout()

     setTimeout(() => {
      this.router.navigate(['/EspaceAdmin/login'])
     }, 3000);

      console.log(err['error'].msg)
    })

  }




  openUpdate(targetModal,user: User){
    this.updatedId=user._id;
    this.user.username=user.username;
    this.user.email=user.email;
    this.user.addresse=user.addresse;
    this.user.telephone=user.telephone;
    console.log(user._id)
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }





//modifier un client
modifier(){

  console.log(this.user);

  this.clientService.update(this.updatedId, this.user).subscribe(res => {

       console.log('Post updated successfully!');

       this.ngOnInit();
       this.modalService.dismissAll();
       console.log('Client updated successfully!');

  },err=>{
    this.flashMessage.show(err['error'].msg, { cssClass: 'alert-danger' } );
    this.modalService.dismissAll();
   this.authService.logout()

   setTimeout(() => {
    this.router.navigate(['/EspaceAdmin/login'])
   }, 3000);

    console.log(err['error'].msg)
  })

}

setSelectCriter(event){

let criter=event.target.value
if(criter=="addresse"){
  this.selectedCriter="addresse"
}
else if(criter=="username"){
  this.selectedCriter="username"
}
else if(criter=="telephone"){
  this.selectedCriter="telephone"
}

else if(criter=="addresse"){
  this.selectedCriter="addresse"
}
else if(criter=="email"){
  this.selectedCriter="email"
}


}


search(){

if(this.selectedCriter=="addresse")
  {var tab = this.clients.filter(item => item.addresse == this.cherche);
  this.clients=tab;}

if(this.selectedCriter=="username"){
  var tab = this.clients.filter(item => item.username == this.cherche);
  this.clients=tab;

}

if(this.selectedCriter=="addresse"){
  var tab = this.clients.filter(item => item.addresse == this.cherche);
  this.clients=tab;

}

if(this.selectedCriter=="email"){
  var tab = this.clients.filter(item => item.email == this.cherche);
  this.clients=tab;

}

 // console.log(tab)
if(this.cherche==""){this.ngOnInit()}
}

}
