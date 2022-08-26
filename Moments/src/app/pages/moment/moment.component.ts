import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Moment } from 'src/app/moment';
import { MomentService } from 'src/app/services/moments.service';
import { environment } from 'src/environments/environment';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from 'src/app/services/messages.service';
import { Comment } from 'src/app/services/comment';
import {
  FormGroup,
  FormControl,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css'],
})
export class MomentComponent implements OnInit {
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl;

  faTimes = faTimes;
  faEdit = faEdit;

  comentForm!: FormGroup;

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messageService: MessagesService,
    private router: Router,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    //id qque está na url
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService
      .getMoment(id)
      .subscribe((item) => (this.moment = item.data));

    this.comentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
    });
  }

  get text() {
    return this.comentForm.get('text')!;
  }

  get username() {
    return this.comentForm.get('username')!;
  }

  async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe();
    this.messageService.add('Momento excluído com sucesso!');
    this.router.navigate(['/']);
  }

  async onSubmit(formDirective: FormGroupDirective) {
    if (this.comentForm.invalid) {
      return;
    }
    console.log('foi');

    const data: Comment = this.comentForm.value;
    data.momentId = Number(this.moment!.id);

    await this.commentService
      .createComent(data)
      .subscribe((comment) => this.moment!.coments!.push(comment.data));

    this.messageService.add('Comentário Adicionado');

    //resetar os forms
    this.comentForm.reset();

    formDirective.resetForm();
  }
}
