import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentaireListComponent } from './commentaire-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NgIf } from '@angular/common';

describe('CommentaireListComponent', () => {
  let component: CommentaireListComponent; 

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule, RouterTestingModule, NgIf],
    }).compileComponents()

    let fixture: ComponentFixture<CommentaireListComponent>;
  
    fixture = TestBed.createComponent(CommentaireListComponent); 
    component = fixture.componentInstance; fixture.detectChanges();
  });

  it('should create', () => { 
    expect(component).toBeTruthy(); 
  });

})