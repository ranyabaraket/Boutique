import { FlashMessagesService } from 'flash-messages-angular';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Item } from './../../model/itemArticle.model';
import { ArticleService } from './../../services/article.service';
import { FactureService } from './../../services/facture.service';
import { Component, OnInit } from '@angular/core';
import { Facture } from 'src/app/model/facture.model';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { takeLast } from 'rxjs-compat/operator/takeLast';
@Component({
  selector: 'app-factures',
  templateUrl: './factures.component.html',
  styleUrls: ['./factures.component.css']
})
export class FacturesComponent implements OnInit {
  closeResult:string;
  facture:Facture;
  factures:Facture[]
  deletedId:Number
  updatedId:Number
  oneArticle:string
  prix:number;
  total:number=0;
 listAchat:Item[]=[]
 selectedCriter:string
 cherche:string


  constructor(private factureService:FactureService,private modalService: NgbModal,private articleService:ArticleService,private router:Router,private authService:AuthService,private flashMessage:FlashMessagesService) { this.facture=new Facture()}

  ngOnInit(): void {
    this.readFactures();
  }


  ajouterAuListe(){

    this.articleService.find(this.oneArticle).subscribe(article=>{
     if(article.stock>0)
     { this.listAchat.push({"num":article.numArticle,"prix":article.prixUnitaire})
     console.log(JSON.stringify(this.listAchat));
     this.total=this.total+article.prixUnitaire}

     else{this.flashMessage.show('Article n est pas diponible', { cssClass: 'alert-danger' } )}

    })


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

  openDelete(targetModal, id: Number) {
    this.deletedId=id;
        console.log(id)
        this.modalService.open(targetModal, {
          backdrop: 'static',
          size: 'lg'
        });
      }




//get fact by num










  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  readFactures(): void {
    this.factureService.readAll()
      .subscribe(
        factures => {

          this.factures = factures;
          //console.log(users);
        },
        err=>{
          this.flashMessage.show(err['error'].msg, { cssClass: 'alert-danger' } );

         this.authService.logout()

         setTimeout(() => {
          this.router.navigate(['/EspaceAdmin/login'])
         }, 3000);

          console.log(err['error'].msg)
        })

      }


  submit(){


for(let art of this.listAchat){
  this.articleService.find(art.num).subscribe(article=>{
console.log("num"+art.num)
article.stock=article.stock-1

this.articleService.update(art.num,article).subscribe(res=>{

  console.log(article)




     })



   })



}



    this.facture.total=this.total

    this.factureService.Add(this.facture).subscribe((result) => {
      console.log(this.facture)
      this.ngOnInit();
    },err=>{
      this.flashMessage.show(err['error'].msg, { cssClass: 'alert-danger' } );

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
    this.factureService.delete(this.deletedId).subscribe(res => {
      console.log(this.deletedId)
         this.factures = this.factures.filter(item => item._id !== this.deletedId);
         this.ngOnInit();
         this.modalService.dismissAll();
         console.log('Client deleted successfully!');

    },err=>{
      this.flashMessage.show(err['error'].msg, { cssClass: 'alert-danger' } );

     this.authService.logout()

     setTimeout(() => {
      this.router.navigate(['/EspaceAdmin/login'])
     }, 3000);

      console.log(err['error'].msg)
    })

  }


  setSelectCriter(event){

    let criter=event.target.value
    if(criter=="num"){
      this.selectedCriter="num"
    }
    else if(criter=="nom"){
      this.selectedCriter="nom"
    }
    else if(criter=="designation"){
      this.selectedCriter="designation"
    }

    else if(criter=="prix"){
      this.selectedCriter="prix"
    }



}



search(){
console.log(this.selectedCriter)

if(this.selectedCriter=="num")
  {var tab = this.factures.filter(item => item.numFact.toString() == this.cherche);
  this.factures=tab;}

if(this.selectedCriter=="date"){
  var tab = this.factures.filter(item => item.dateFact.toString() == this.cherche);
  this.factures=tab;

}

if(this.selectedCriter=="client"){
  var tab = this.factures.filter(item => item.client == this.cherche);
  this.factures=tab;

}

 // console.log(tab)
if(this.cherche==""){this.ngOnInit()}
}




supprimer(num,prix){
  console.log(num)
  var tab = this.listAchat.filter(item => item.num.toString() != num);
  this.listAchat=tab;
this.total=this.total-prix

}

}
