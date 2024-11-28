import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAccountComponent } from './user-account.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

describe('UserAccount', () => {
  let component: UserAccountComponent; 

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports:[NgFor, RouterTestingModule, HttpClientModule],
    }).compileComponents()

    let fixture: ComponentFixture<UserAccountComponent>;
  
    fixture = TestBed.createComponent(UserAccountComponent); 
    component = fixture.componentInstance; fixture.detectChanges();
  });

  it('should create', () => { 
    expect(component).toBeTruthy(); 
  });

})