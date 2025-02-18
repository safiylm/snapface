import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthConnexionUserComponent } from './auth-connexion-user.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule, NgIf } from '@angular/common';
import { ElementRef } from '@angular/core';

describe('AuthConnexionUserComponent', () => {
  let component: AuthConnexionUserComponent; 
  let fixture: ComponentFixture<AuthConnexionUserComponent>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule, RouterTestingModule, NgIf, CommonModule],
      declarations:[ ],
   
      providers: [
      ],
    }).compileComponents()

  
    fixture = TestBed.createComponent(AuthConnexionUserComponent); 
    component = fixture.componentInstance; 
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();// Vérifie que le composant est créé
  });

  it('should render the title in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Connexion'); // Vérifie le rendu dans le DOM
  });
  




})