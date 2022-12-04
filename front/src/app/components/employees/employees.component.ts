import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FlashMessagesService } from 'flash-messages-angular';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from './../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees:Employee[]
  closeResult:string;
  emp:Employee
  updatedId:Number
  deletedId:Number
  selected:boolean=true
  constructor(private employeeService:EmployeeService,private modalService: NgbModal,private authService:AuthService,private router:Router,private flashMessage:FlashMessagesService) { this.emp=new Employee()}

  ngOnInit(): void {
    this.readEmps()
  }

  readEmps(): void {
    this.employeeService.readAll()
      .subscribe(
        employees => {

          this.employees = employees;
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


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }



  submit(){

    this.employeeService.Add(this.emp).subscribe((result) => {
      console.log(this.emp)
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





  openUpdate(targetModal,emp: Employee){
    this.updatedId=emp._id;

    this.emp.cin=emp.cin;
    this.emp.nom=emp.nom;
    this.emp.prenom=emp.prenom;
    this.emp.mail=emp.mail;
    this.emp.categorie=emp.categorie;
    this.emp.telephone=emp.telephone;
    this.emp.salaire=emp.salaire;

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


      delete() {

        this.employeeService.delete(this.deletedId).subscribe(res => {
          console.log(this.deletedId)
             this.employees = this.employees.filter(item => item._id !== this.deletedId);
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


      //modifier un client
modifier(){

  console.log(this.emp);

  this.employeeService.update(this.updatedId, this.emp).subscribe(res => {

       console.log('Post updated successfully!');

       this.ngOnInit();
       this.modalService.dismissAll();
       console.log('Client updated successfully!');

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

}
