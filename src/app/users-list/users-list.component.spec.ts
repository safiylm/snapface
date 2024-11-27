import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UsersListComponent } from './users-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/services/user-service';
import { NgFor } from '@angular/common';

describe('UserList', () => {
  let component: UsersListComponent; 

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports:[NgFor, RouterTestingModule],
    }).compileComponents()

    let fixture: ComponentFixture<UsersListComponent>;
  
    fixture = TestBed.createComponent(UsersListComponent); 
    component = fixture.componentInstance; fixture.detectChanges();
  });

  it('should create', () => { 
    expect(component).toBeTruthy(); 
  });


})