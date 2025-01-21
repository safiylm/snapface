import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicationEditComponent } from './publication-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NgIf } from '@angular/common';

describe('Publication Edit Component', () => {
  let component: PublicationEditComponent; 

  beforeEach( () => {
    
    TestBed.configureTestingModule({
      imports:[HttpClientModule, RouterTestingModule, NgIf],
    }).compileComponents()
    let fixture: ComponentFixture<PublicationEditComponent>;
    fixture = TestBed.createComponent(PublicationEditComponent); 
    component = fixture.componentInstance; fixture.detectChanges();
  });

  it('should create', () => { 
    expect(component).toBeTruthy(); 
  });

})