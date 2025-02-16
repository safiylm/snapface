import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NgIf } from '@angular/common';
import { LikeButtonComponent } from './like-button.component';

describe('interaction social Component', () => {
  let component: LikeButtonComponent; 
  let fixture: ComponentFixture<LikeButtonComponent>;
  
  beforeEach( () => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule, RouterTestingModule, NgIf],
    }).compileComponents()
  
    fixture = TestBed.createComponent(LikeButtonComponent); 
    component = fixture.componentInstance; fixture.detectChanges();
  });

  it('should create', () => { 
    expect(component).toBeTruthy(); 
  });

  it('button add like have been called', fakeAsync(() => {
    spyOn(component, 'addLike');
  
    let button = fixture.debugElement.nativeElement.querySelector('#btnaddlike');
    button.click();
    tick();
    expect(component.addLike).toHaveBeenCalled();
  
  })); 
/*
  it('button remove like have been called', fakeAsync(() => {
    spyOn(component, 'removeLike');
  
    let button = fixture.debugElement.nativeElement.querySelector('#btnremovelike');
    button.click();
    tick();
    expect(component.removeLike).toHaveBeenCalled();
  
  })); 
*/
})