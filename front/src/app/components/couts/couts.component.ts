import { FlashMessagesService } from 'flash-messages-angular';
import { AuthService } from './../../services/auth.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CoutService } from './../../services/cout.service';
import { Cout } from './../../model/cout.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-couts',
  templateUrl: './couts.component.html',
  styleUrls: ['./couts.component.css']
})
export class CoutsComponent implements OnInit {
couts :Cout[]
cout:Cout
deletedId:Number;
closeResult:string;
updatedId:Number;
selectedCriter:string
cherche:string
  constructor(private coutService:CoutService,private modalService: NgbModal,private authService:AuthService,private router:Router,private flashMessage:FlashMessagesService) {this.cout=new Cout() }

  ngOnInit(): void {
    this.readCouts()
  }


  readCouts(): void {
    this.coutService.readAll()
      .subscribe(
        couts => {
          this.couts = couts;
          //console.log(users);
        },
        err=>{
          this.flashMessage.show(err['error'].msg, { cssClass: 'alert-danger' } );
          this.modalService.dismissAll();
         this.authService.logout()

         setTimeout(() => {
          this.router.navigate(['/EspaceAdmin/login'])
         }, 3000);

          console.log(err['error'].msg)
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



  submit(){


    this.coutService.Add(this.cout).subscribe((result) => {
      console.log(this.cout)
      this.ngOnInit();
    },
    err=>{
      this.flashMessage.show(err['error'].msg, { cssClass: 'alert-danger' } );
      this.modalService.dismissAll();
     this.authService.logout()

     setTimeout(() => {
      this.router.navigate(['/EspaceAdmin/login'])
     }, 3000);

      console.log(err['error'].msg)
    }



    );
  this.modalService.dismissAll(); //dismiss the modal

  }


  delete() {
    console.log("ok")
    this.coutService.delete(this.deletedId).subscribe(res => {
      console.log(this.deletedId)
         this.couts = this.couts.filter(item => item._id !== this.deletedId);
         this.ngOnInit();
         this.modalService.dismissAll();
         console.log('Client deleted successfully!');

    },
    err=>{
      this.flashMessage.show(err['error'].msg, { cssClass: 'alert-danger' } );
      this.modalService.dismissAll();
     this.authService.logout()

     setTimeout(() => {
      this.router.navigate(['/EspaceAdmin/login'])
     }, 3000);

      console.log(err['error'].msg)
    })

  }




  openUpdate(targetModal,cout: Cout){
    this.updatedId=cout._id;
    this.cout.description=cout.description;
    this.cout.designation=cout.designation;
    this.cout.total=cout.total;

    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }






openDelete(targetModal, id: Number) {
  this.deletedId=id;
      console.log(id)
      this.modalService.open(targetModal, {
        backdrop: 'static',
        size: 'lg'
      });
    }








//modifier un cout
modifier(){

  this.coutService.update(this.updatedId, this.cout).subscribe(res => {

       console.log('cout updated successfully!');

       this.ngOnInit();
       this.modalService.dismissAll();
       console.log('cout updated successfully!');

  },
  err=>{
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
  if(criter=="designation"){
    this.selectedCriter="designation"
  }
  else if(criter=="description"){
    this.selectedCriter="description"
  }
  else if(criter=="date"){
    this.selectedCriter="date"
  }


}



search(){
console.log(this.selectedCriter)

if(this.selectedCriter=="designation")
{var tab = this.couts.filter(item => item.designation.toString() == this.cherche);
this.couts=tab;}

if(this.selectedCriter=="description"){
var tab = this.couts.filter(item => item.description.toString() == this.cherche);
this.couts=tab;

}

if(this.selectedCriter=="date"){
var tab = this.couts.filter(item => item.date.toString() == this.cherche);
this.couts=tab;

}

// console.log(tab)
if(this.cherche==""){this.ngOnInit()}
}

}
