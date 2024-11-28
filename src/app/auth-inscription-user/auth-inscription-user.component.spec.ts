import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthInscriptionUserComponent } from './auth-inscription-user.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NgIf } from '@angular/common';

describe('AuthInscriptionUserComponent', () => {
  let component: AuthInscriptionUserComponent; 

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule, RouterTestingModule, NgIf],
    }).compileComponents()

    let fixture: ComponentFixture<AuthInscriptionUserComponent>;
  
    fixture = TestBed.createComponent(AuthInscriptionUserComponent); 
    component = fixture.componentInstance; fixture.detectChanges();
  });

  it('should create', () => { 
    expect(component).toBeTruthy(); 
  });

})