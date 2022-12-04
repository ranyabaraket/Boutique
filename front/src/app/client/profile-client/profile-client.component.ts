import { Article } from 'src/app/model/article';
import { Component, OnInit } from '@angular/core';
import { ArticleService } from './../../services/article.service';
@Component({
  selector: 'app-profile-client',
  templateUrl: './profile-client.component.html',
  styleUrls: ['./profile-client.component.css']
})
export class ProfileClientComponent implements OnInit {
  articles:Article[];
  constructor(private articleService:ArticleService) { }

  ngOnInit(): void {
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


}
