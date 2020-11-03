import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { MembersComponent } from './members.component';

import { Router } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppService } from './../app.service';

import { HttpClientTestingModule } from "@angular/common/http/testing";

import { FormBuilder, FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';


describe('MembersComponent', () => {
  let component: MembersComponent;
  let fixture: ComponentFixture<MembersComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MembersComponent],
      imports: [HttpClientModule, RouterModule, HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      providers: [
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          },
          AppService,
          FormBuilder
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to memberDetails after user calls goToAddMemberForm()', fakeAsync(() => {
    component.goToAddMemberForm();
    tick();
    expect(router.navigate).toHaveBeenCalledWith(['memberDetails']);
  }))

  it('should have the isEdit value to be true after user calls editMemberByID', fakeAsync(() => {
    component.editMemberByID({}, 1);
    tick();
    expect(component.isEdit).toBe(true)
  }));

  it('should have the isEdit value to be false after user calls close()', () => {
    component.close();
    expect(component.isEdit).toBe(false);
  });

  it('should have the isEdit value to be false after user calls onSubmit', fakeAsync(() => {
    component.onSubmit();
    tick();
    expect(component.isEdit).toBe(false);
  }))

});
