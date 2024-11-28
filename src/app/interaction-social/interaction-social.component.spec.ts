import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InteractionSocialComponent } from './interaction-social.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NgIf } from '@angular/common';

describe('interaction social Component', () => {
  let component: InteractionSocialComponent; 

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule, RouterTestingModule, NgIf],
    }).compileComponents()

    let fixture: ComponentFixture<InteractionSocialComponent>;
  
    fixture = TestBed.createComponent(InteractionSocialComponent); 
    component = fixture.componentInstance; fixture.detectChanges();
  });

  it('should create', () => { 
    expect(component).toBeTruthy(); 
  });

})