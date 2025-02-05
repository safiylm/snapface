import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersListComponent } from './users-list.component';
import { NgFor } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from 'src/services/user-service';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserList', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        UserService,
      ],
      imports: [NgFor, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents()


    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    component.users=[];
    fixture.detectChanges();// Déclenche la détection des modifications initiales
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


 /* it('should load data from the API', () => {
  });
  */

})