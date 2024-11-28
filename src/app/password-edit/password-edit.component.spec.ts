import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordEditComponent } from './password-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('Password edit Component', () => {
  let component: PasswordEditComponent; 

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule, RouterTestingModule],
    }).compileComponents()

    let fixture: ComponentFixture<PasswordEditComponent>;
  
    fixture = TestBed.createComponent(PasswordEditComponent); 
    component = fixture.componentInstance; fixture.detectChanges();
  });

  it('should create', () => { 
    expect(component).toBeTruthy(); 
  });

})