
import { ArticleService } from './../../services/article.service';
import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/model/article';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
articles:Article[];
  constructor(private articleService:ArticleService,private modalService: NgbModal) { }

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
