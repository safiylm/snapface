import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthConnexionUserComponent } from './auth-connexion-user.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule, NgIf } from '@angular/common';
import { ElementRef } from '@angular/core';

describe('AuthConnexionUserComponent', () => {
  let component: AuthConnexionUserComponent; 

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule, RouterTestingModule, NgIf, CommonModule],
      declarations:[ ],
   
      providers: [
        { provide: ElementRef, useValue: { nativeElement: document.getElementById('connexionInfo') } }
      ],
    }).compileComponents()

    let fixture: ComponentFixture<AuthConnexionUserComponent>;
  
    fixture = TestBed.createComponent(AuthConnexionUserComponent); 
    component = fixture.componentInstance; fixture.detectChanges();
  });

  it('should create', () => { 
    expect(component).toBeTruthy(); 
  });

})