import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UsersListComponent } from './users-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

describe('UserList', () => {
  let component: UsersListComponent; 

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports:[NgFor, RouterTestingModule, HttpClientModule],
    }).compileComponents()

    let fixture: ComponentFixture<UsersListComponent>;
  
    fixture = TestBed.createComponent(UsersListComponent); 
    component = fixture.componentInstance; fixture.detectChanges();
  });

  it('should create', () => { 
    expect(component).toBeTruthy(); 
  });

})