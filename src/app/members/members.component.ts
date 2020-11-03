import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members = [];
  teams = [];
  member: Member;
  memberId = null;
  isEdit = false;
  form;
  hasDeleted = false;

  constructor(private fb: FormBuilder, public appService: AppService, private router: Router) {
    this.form = this.fb.group({
      firstName: '',
      lastName: '',
      jobTitle: '',
      team: '',
      status: ''
    });
  }

  ngOnInit() {
    // Get all members and teams
    this.appService.getMembers().subscribe(members => this.members = members)
    this.appService.getTeams().subscribe(teams => (this.teams = teams));
  }

  // Route to memberDetails
  goToAddMemberForm() {
    // console.log(`Hmmm...we didn't navigate anywhere`);
    this.router.navigate(['memberDetails'])
  }

  // Set member values to edit
  editMemberByID(mem, id: number) {
    this.memberId = id;
    this.member = {...mem};
    this.isEdit = true;
  }

  // Delete member
  deleteMemberById(id: number) {
    if (confirm('Are you sure you want to delete this member?')) {
      this.appService.deleteMember(id);
      this.hasDeleted = true;
    }
    setTimeout(() => {
      this.hasDeleted = !this.hasDeleted
    }, 3000);
  }

  // Save member data
  onSubmit() {
    this.appService.editMember(this.member, this.memberId);
    this.isEdit = false;
    this.memberId = null;
    this.form.reset();
  }

  // Close and reset form
  close() {
    this.isEdit = false;
    this.memberId = null;
    this.form.reset();
  }
}
