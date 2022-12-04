import { ArticleService } from './../../services/article.service';
import { Article } from 'src/app/model/article';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-promotions',
  templateUrl: './list-promotions.component.html',
  styleUrls: ['./list-promotions.component.css']
})
export class ListPromotionsComponent implements OnInit {

  articles:Article[];
  promotions:Article[]=[];
  constructor(private articleService:ArticleService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.readPromo()
    }, 1000);
    this.readArticles()
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


readPromo(){
  this.readArticles()
  for(let art of this.articles){
    if(art.promotion>0){this.promotions.push(art)}
  }
}

}
