import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { nanoid } from 'nanoid';

// This interface may be useful in the times ahead...
interface Member {
  id: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  team: string;
  status: string;
}

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit, OnChanges {
  memberModel: Member;
  form;
  submitted = false;
  alertType: String;
  alertMessage: String;
  teams = [];

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router) {
    this.form = this.fb.group({
      firstName: '',
      lastName: '',
      jobTitle: '',
      team: '',
      status: ''
    });
  }

  ngOnInit() {
    this.appService.getTeams().subscribe(teams => (this.teams = teams));
  }

  ngOnChanges() {}

  // TODO: Add member to members
  onSubmit(form: FormGroup) {
    this.memberModel = form.value;
    var id = nanoid(); // unique external id
    this.memberModel = {
      id: id,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      jobTitle: this.form.value.jobTitle,
      team: this.form.value.team,
      status: this.form.value.status
    };
    this.appService.addMember(this.memberModel);
    setTimeout(() => {
      this.router.navigate(['/members'])
    }, 1000);
  }

  cancel() {
    this.router.navigate(['/members']);
  }
}
