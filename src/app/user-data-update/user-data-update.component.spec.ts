import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserDataUpdateComponent } from './user-data-update.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

describe('UserDataEditComponent', () => {
  let component: UserDataUpdateComponent; 

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports:[NgFor, RouterTestingModule, HttpClientModule],
    }).compileComponents()

    let fixture: ComponentFixture<UserDataUpdateComponent>;
  
    fixture = TestBed.createComponent(UserDataUpdateComponent); 
    component = fixture.componentInstance; fixture.detectChanges();
  });

  it('should create', () => { 
    expect(component).toBeTruthy(); 
  });


})