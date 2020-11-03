import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class AppService {
  api = 'http://localhost:8000/api';
  username: string;
  DEBUG = false; // README.md

  constructor(private http: HttpClient) {
    // Angular calling json-server vs NodeJS
    this.api = this.DEBUG ? 'http://localhost:3000' : this.api
  }

  // Returns all members
  getMembers() {
    return this.http
      .get(`${this.api}/members`)
      .pipe(catchError(this.handleError))
  }

  // Returns all teams
  getTeams() {
    return this.http
      .get(`${this.api}/teams`)
      .pipe(catchError(this.handleError))
  }

  // Sets username
  setUsername(name: string): void {
    this.username = name;
  }

  // Add member to db
  addMember(memberForm) {
    if (this.DEBUG){
      return this.http
      .post(`${this.api}/members`, memberForm)
      .subscribe(res => {
        console.log(res)
      })
    } else {
      return this.http
      .post(`${this.api}/addMember`, memberForm)
      .subscribe(res => {
        console.log(res)
      })
    }
  }

  // Edit member from db
  editMember(member, id) {
    return this.http
      .put(`${this.api}/members/` + id, member)
      .subscribe(res => {
        console.log(res)
      })
  }

  // Delete member from db
  deleteMember(id) {
    return this.http
      .delete(`${this.api}/members/` + id)
      .subscribe(res => {
        console.log(res)
      })
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return [];
  }
}
