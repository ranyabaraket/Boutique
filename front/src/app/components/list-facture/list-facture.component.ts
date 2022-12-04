import { User } from './../../model/user.model';
import { AuthService } from './../../services/auth.service';
import { Facture } from './../../model/facture.model';
import { Component, OnInit } from '@angular/core';
import { FactureService } from './../../services/facture.service';
@Component({
  selector: 'app-list-facture',
  templateUrl: './list-facture.component.html',
  styleUrls: ['./list-facture.component.css']
})
export class ListFactureComponent implements OnInit {
  factures:Facture[]
  user:User;
  constructor(private factureService:FactureService,private authService:AuthService) { }

  ngOnInit(): void {
    this.user=this.authService.connectedUser()
    console.log("user connected"+this.user["username"])
    this.readFactures()
  }


  readFactures(): void {
    this.factureService.getFactByClient(this.user['username'])
      .subscribe(
        factures => {

          this.factures = factures;
          console.log(factures);
        },
        error => {
          console.log(error);
        });
  }


}
