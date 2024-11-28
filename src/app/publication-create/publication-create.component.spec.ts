import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicationCreateComponent } from './publication-create.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('Publication create Component', () => {
  let component: PublicationCreateComponent; 

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule, RouterTestingModule],   
    }).compileComponents()

    let fixture: ComponentFixture<PublicationCreateComponent>;
  
    fixture = TestBed.createComponent(PublicationCreateComponent); 
    component = fixture.componentInstance; fixture.detectChanges();
  });

  it('should create', () => { 
    expect(component).toBeTruthy(); 
  });

})