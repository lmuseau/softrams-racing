import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';

import { HttpClient } from '@angular/common/http';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AppService } from '../../app/app.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, RouterModule, HttpClientModule],
      providers: [
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          }
        },
        HttpClient
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to members after user logs in', fakeAsync(() => {
    let appService = fixture.debugElement.injector.get(AppService);
    component.login();
    appService.setUsername('Person');
    tick();
    expect(router.navigate).toHaveBeenCalledWith(['/members']);
    expect(appService.username).toBe('Person');
  }))
});
