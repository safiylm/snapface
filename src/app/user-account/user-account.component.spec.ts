import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAccountComponent } from './user-account.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

describe('UserAccount', () => {
  let component: UserAccountComponent; 
  let fixture: ComponentFixture<UserAccountComponent>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports:[NgFor, RouterTestingModule, HttpClientModule],
    }).compileComponents()

  
    fixture = TestBed.createComponent(UserAccountComponent); 
     component = fixture.componentInstance; // Accès à l'instance du composant
     fixture.detectChanges();// Déclenche la détection des modifications initiales
 
  });

  it('should create', () => { 
    expect(component).toBeTruthy(); 
  });



})