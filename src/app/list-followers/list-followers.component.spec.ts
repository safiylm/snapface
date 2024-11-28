import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListFollowersComponent } from './list-followers.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NgIf } from '@angular/common';

describe('Liste followers Component', () => {
  let component: ListFollowersComponent; 

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule, RouterTestingModule, NgIf],
    }).compileComponents()

    let fixture: ComponentFixture<ListFollowersComponent>;
  
    fixture = TestBed.createComponent(ListFollowersComponent); 
    component = fixture.componentInstance; fixture.detectChanges();
  });

  it('should create', () => { 
    expect(component).toBeTruthy(); 
  });

})