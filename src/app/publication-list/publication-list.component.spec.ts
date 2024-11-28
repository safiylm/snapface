import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicationListComponent } from './publication-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('PublicationListeComponent', () => {
  let component: PublicationListComponent; 

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule, RouterTestingModule],
    }).compileComponents()

    let fixture: ComponentFixture<PublicationListComponent>;
  
    fixture = TestBed.createComponent(PublicationListComponent); 
    component = fixture.componentInstance; fixture.detectChanges();
  });

  it('should create', () => { 
    expect(component).toBeTruthy(); 
  });

})