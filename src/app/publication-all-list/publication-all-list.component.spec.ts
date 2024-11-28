import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicationAllListComponent } from './publication-all-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('Publication All Liste Component', () => {
  let component: PublicationAllListComponent; 

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule, RouterTestingModule],
    }).compileComponents()

    let fixture: ComponentFixture<PublicationAllListComponent>;
  
    fixture = TestBed.createComponent(PublicationAllListComponent); 
    component = fixture.componentInstance; fixture.detectChanges();
  });

  it('should create', () => { 
    expect(component).toBeTruthy(); 
  });

})