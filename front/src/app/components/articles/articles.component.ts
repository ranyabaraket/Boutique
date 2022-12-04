import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { AuthService } from './../../services/auth.service';
import { ArticleService } from './../../services/article.service';
import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/model/article';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
image:any;
msg:string=""
article:Article;
closeResult:string;
articles:Article[]
deletedId:Number
updatedId:Number
imageupdated:any;
cherche:string
selectedCriter:string;
  constructor(private articleService:ArticleService,private modalService: NgbModal,private router:Router,private authService:AuthService,private flashMessage:FlashMessagesService) { this.article=new Article()}

  ngOnInit(): void {

    this.readArticles()
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


  readArticles(): void {
    this.articleService.readAll()
      .subscribe(
        articles => {

          this.articles = articles;
          //console.log(users);
        },
        error => {
          console.log(error);
        });
  }

  upload(){
    console.log(this.image)

  }


  select(event){

		if(!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
			return;
		}
    var mimeType = event.target.files[0].type;

		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}


    var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);

		reader.onload = (_event) => {
			this.msg = "";
			this.image = reader.result;
		}

  }



  selectUpdate(event){
    //Angular 11, for stricter type
        if(!event.target.files[0] || event.target.files[0].length == 0) {
          this.msg = 'You must select an image';
          return;
        }
        var mimeType = event.target.files[0].type;

        if (mimeType.match(/image\/*/) == null) {
          this.msg = "Only images are supported";
          return;
        }


        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = (_event) => {
          this.msg = "";
          this.imageupdated = reader.result;
        }

      }











  submit(){
    this.article.image=this.image
    this.articleService.Add(this.article).subscribe((result) => {
      console.log(this.article)
      this.ngOnInit();
    },err=>{console.log(err)}



    );
  this.modalService.dismissAll(); //dismiss the modal

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
        console.log("ok")
        this.articleService.delete(this.deletedId).subscribe(res => {
          console.log(this.deletedId)
             this.articles = this.articles.filter(item => item._id !== this.deletedId);
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

      openUpdate(targetModal,article: Article){
        this.updatedId=article._id;
        if(this.image!=null){this.article.image=this.image}
        else{this.article.image=article.image}

        console.log("la article a update ets "+article._id)
        this.article.numArticle=article.numArticle;
        this.article.nom=article.nom;
        this.article.designation=article.designation;
        this.article.prixUnitaire=article.prixUnitaire;
        this.article.categorie=article.categorie;
        this.article.stock=article.stock;
        this.article.TVA=article.TVA;
        this.article.promotion=article.promotion;
        console.log(article._id)
        this.modalService.open(targetModal, {
          backdrop: 'static',
          size: 'lg'
        });
      }


//modifier un artilce
modifier(){

  this.article.image=this.image
  console.log(this.imageupdated)
  this.articleService.update(this.updatedId, this.article).subscribe(res => {



       this.ngOnInit();
       this.modalService.dismissAll();
       console.log('Artilce updated successfully!');

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



      openDeatils(targetModal,article: Article){

        this.article.image=article.image

        this.article.numArticle=article.numArticle;
        this.article.nom=article.nom;
        this.article.designation=article.designation;
        this.article.prixUnitaire=article.prixUnitaire;
        this.article.categorie=article.categorie;
        this.article.stock=article.stock;
        this.article.TVA=article.TVA;
        this.article.promotion=article.promotion;
        console.log(article._id)
        this.modalService.open(targetModal, {
          backdrop: 'static',
          size: 'lg'
        });
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
            {var tab = this.articles.filter(item => item.numArticle.toString() == this.cherche);
            this.articles=tab;}

          if(this.selectedCriter=="nom"){
            var tab = this.articles.filter(item => item.nom == this.cherche);
            this.articles=tab;

          }

          if(this.selectedCriter=="designation"){
            var tab = this.articles.filter(item => item.designation == this.cherche);
            this.articles=tab;

          }

          if(this.selectedCriter=="prix"){
            var tab = this.articles.filter(item => item.prixUnitaire.toString() == this.cherche);
            this.articles=tab;

          }

           // console.log(tab)
          if(this.cherche==""){this.ngOnInit()}
          }

}
