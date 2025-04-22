import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyAccountComponent } from './my-account.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NgIf } from '@angular/common';

describe('My Account Component', () => {
  let component: MyAccountComponent; 

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule, RouterTestingModule, NgIf],
    }).compileComponents()

    let fixture: ComponentFixture<MyAccountComponent>;
  
    fixture = TestBed.createComponent(MyAccountComponent); 
    component = fixture.componentInstance; fixture.detectChanges();
    component.id="662eb2a1c2fd9ad3238d7528"
  });

  it('should create', () => { 
    expect(component).toBeTruthy(); 
    expect(component.id).toBeDefined()
  });

})