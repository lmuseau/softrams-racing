import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { MemberDetailsComponent } from './member-details.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppService } from './../app.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";

// Bonus points!
describe('MemberDetailsComponent', () => {
  let component: MemberDetailsComponent;
  let fixture: ComponentFixture<MemberDetailsComponent>;
  let router: Router;
  let formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberDetailsComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        HttpClientTestingModule
      ],
      providers: [
        HttpClient,
        FormBuilder,
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          }
        },
        AppService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDetailsComponent);
    component = fixture.componentInstance;
    component.form = formBuilder.group({
      firstName: '',
      lastName: '',
      jobTitle: '',
      team: '',
      status: ''
    });
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should grab list of teams from db', fakeAsync(() => {
    let appService = fixture.debugElement.injector.get(AppService);
    let teams = [
      {
        "id": 1,
        "teamNameName": "Formula 1 - Car 77"
      },
      {
        "id": 2,
        "teamName": "Formula 1 - Car 8"
      },
      {
        "id": 3,
        "teamName": "Formula 2 - Car 54"
      },
      {
        "id": 4,
        "teamName": "Formula 2 - Car 63"
      },
      {
        "id": 5,
        "teamName": "Deutsche Tourenwagen Masters - Car 117"
      },
      {
        "id": 6,
        "teamName": "Deutsche Tourenwagen Masters - Car 118"
      },
      {
        "id": 7,
        "teamName": "World Endurance Championship - Car 99"
      },
      {
        "id": 8,
        "teamName": "World Endurance Championship - Car 5"
      },
      {
        "id": 9,
        "teamName": "World Rally Championship - Car 77"
      },
      {
        "id": 10,
        "teamName": "World Rally Championship - Car 90"
      }
    ]
    appService.getTeams().subscribe(res => {
      expect(res).toEqual(teams);
    })
  }));

  it('should navigate to members after user calls cancel()', fakeAsync(() => {
    component.cancel();
    tick();
    expect(router.navigate).toHaveBeenCalledWith(['/members']);
  }))

  it('should navigate to members after user calls onSubmit', fakeAsync(() => {
    component.onSubmit(component.form);
    tick(1200); // setTimeout is set to 1000 so it gives it more time to test correctly
    expect(router.navigate).toHaveBeenCalledWith(['/members']);
  }))
});
