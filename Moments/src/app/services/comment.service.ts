import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from './comment';
import { environment } from 'src/environments/environment';
import { Response } from './Response';
import { MomentService } from './moments.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/moments`;

  constructor(private http: HttpClient) {}

  createComent(data: Comment): Observable<Response<Comment>> {
    const url = `${this.apiUrl}/${data.momentId}/comments`;
    return this.http.post<Response<Comment>>(url, data);
  }
}
