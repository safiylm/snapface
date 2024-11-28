import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderSnapComponent } from './header-snap.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NgIf } from '@angular/common';

describe('Header Snap Component', () => {
  let component: HeaderSnapComponent; 

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule, RouterTestingModule, NgIf],
    }).compileComponents()

    let fixture: ComponentFixture<HeaderSnapComponent>;
  
    fixture = TestBed.createComponent(HeaderSnapComponent); 
    component = fixture.componentInstance; fixture.detectChanges();
  });

  it('should create', () => { 
    expect(component).toBeTruthy(); 
  });

})