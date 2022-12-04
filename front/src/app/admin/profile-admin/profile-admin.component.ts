import { ClientService } from './../../services/client.service';
import { Cout } from './../../model/cout.model';
import { CoutService } from './../../services/cout.service';
import { ArticleService } from './../../services/article.service';
import { FactureService } from './../../services/facture.service';
import { Component, OnInit } from '@angular/core';
import { Facture } from 'src/app/model/facture.model';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { takeLast } from 'rxjs-compat/operator/takeLast';
import { FlashMessagesService } from 'flash-messages-angular';
import { AuthService } from './../../services/auth.service';
import { User } from './../../model/user.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.css']
})
export class ProfileAdminComponent implements OnInit {
  user:User;
  errors:string;
  factures:Facture[]=[]
  couts:Cout[]=[]
  totalVente:number=0
  totalCout:number=0;
  Benifice:number=0;
  clientTotal:number=0
  clients:User[]
  constructor(private router:Router,private authService:AuthService,private flashMessage:FlashMessagesService,private factureService:FactureService,private coutService:CoutService,private clientService:ClientService) { this.user=new User();}

  ngOnInit(): void {
this.user=this.authService.connectedUser()
if(this.user!=null){this.readFactures()
    this.readCout()
    this.readClient()
    setTimeout(() => {this.calculVente()
      this.calculCout()
      this.calculClient()
      this.Benifice=this.totalVente-this.totalCout

    }, 200);
}


  }
  logout(){
this.authService.logout();
this.flashMessage.show('You logged out!', { cssClass: 'alert-success' } )
this.router.navigate(['/EspaceAdmin/login'])
  }

readCout():void{
  this.coutService.readAll()
      .subscribe(
        couts => {

          this.couts = couts;
          //console.log(users);
        },
        error => {
          console.log(error);
        });


}

readClient():void{
  this.clientService.readAll()
      .subscribe(
        clients => {

          this.clients = clients;
          //console.log(users);
        },
        error => {
          console.log(error);
        });


}


calculCout():void{
  this.readCout()
  var i:number=0;
  for(i=0;i<this.couts.length;i++){
    this.totalCout=this.totalCout+this.couts[i]["total"]

  }

}



calculClient():void{
  this.readClient()
  var i:number=0;
  for(i=0;i<this.clients.length;i++){
    this.clientTotal=this.clientTotal+1

  }

}


get(){this.calculCout();console.log(this.totalCout)}



calculVente(){

  var i:number;
  for( i=0;i<this.factures.length;i++){
    console.log("ll"+this.factures)
    this.totalVente=this.totalVente+this.factures[i]["total"]

  }

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
}
