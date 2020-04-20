import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { CommentService } from '../services/comment.service';
@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  commentForm: FormGroup;
  comments: Observable<any>;
  typing: Observable<any>;
  description = '';
  constructor(
    private formBuilder: FormBuilder,
    private commentService: CommentService
    ) { }
  ngOnInit() {
    this.comments = this.commentService.comments;
    this.typing = this.commentService.typing;
    this.commentForm = this.formBuilder.group({
//         name: ['', Validators.required],
        comment: ['', Validators.required]
    });
  }
  onSubmit(formGroup) {
    if (formGroup.valid) {
      this.commentService.newComment(formGroup.value);
      this.description = '';
    }
  }
  typingComments(flag) {
    this.commentService.typingComment(flag);
  }
}
