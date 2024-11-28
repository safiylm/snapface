import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatistiqueUserComponent } from './statistique-user.component';
import { HttpClientModule } from '@angular/common/http';

describe('StatistiqueUserComponent', () => {
  let component: StatistiqueUserComponent; 

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
    }).compileComponents()

    let fixture: ComponentFixture<StatistiqueUserComponent>;
  
    fixture = TestBed.createComponent(StatistiqueUserComponent); 
    component = fixture.componentInstance; fixture.detectChanges();
  });

  it('should create', () => { 
    expect(component).toBeTruthy(); 
  });

})