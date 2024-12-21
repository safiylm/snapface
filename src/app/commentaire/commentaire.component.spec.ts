import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentaireComponent } from './commentaire.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NgIf } from '@angular/common';

describe('CommentaireComponent', () => {
  let component: CommentaireComponent; 

  beforeEach( () => {
    
    TestBed.configureTestingModule({
      imports:[HttpClientModule, RouterTestingModule, NgIf],
    }).compileComponents()

    let fixture: ComponentFixture<CommentaireComponent>;
  
    fixture = TestBed.createComponent(CommentaireComponent); 
    component = fixture.componentInstance; fixture.detectChanges();
  });

  it('should create', () => { 
    expect(component).toBeDefined(); 
  });

})