import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { InteractionSocialComponent } from './interaction-social.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NgIf } from '@angular/common';

describe('interaction social Component', () => {
  let component: InteractionSocialComponent; 
  let fixture: ComponentFixture<InteractionSocialComponent>;
  
  beforeEach( () => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule, RouterTestingModule, NgIf],
    }).compileComponents()
  
    fixture = TestBed.createComponent(InteractionSocialComponent); 
    component = fixture.componentInstance; 
    //component.id="66f9678d9189a0956c8cfb4c";
    fixture.detectChanges();
  });

  it('should create', () => { 
    expect(component).toBeTruthy(); 
  });

})