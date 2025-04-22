import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordEditComponent } from './password-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('Password edit Component', () => {
  let component: PasswordEditComponent; 
  let fixture: ComponentFixture<PasswordEditComponent>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule, RouterTestingModule],
    }).compileComponents()

  
    fixture = TestBed.createComponent(PasswordEditComponent); 
    component = fixture.componentInstance; fixture.detectChanges();
    component.id = "66e9219abe68cdd15907399e";
  });

  it('should create', () => { 
    expect(component).toBeTruthy(); 
  });

})