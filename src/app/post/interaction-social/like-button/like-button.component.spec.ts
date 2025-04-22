import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NgIf } from '@angular/common';
import { LikeButtonComponent } from './like-button.component';
import { InteractionSociale } from 'src/models/interaction.sociale.model';

describe('interaction social Component', () => {
  let component: LikeButtonComponent; 
  let fixture: ComponentFixture<LikeButtonComponent>;
  
  beforeEach( () => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule, RouterTestingModule, NgIf],
    }).compileComponents()
  
    fixture = TestBed.createComponent(LikeButtonComponent); 
    component = fixture.componentInstance; 
      component.interactionSociale = new InteractionSociale("66f9678e9189a0956c8cfb4d",
          "66f9678d9189a0956c8cfb4c",1,1,3,
          ["662eb361c2fd9ad3238d752a"],
          ["662eb361c2fd9ad3238d752a"])
          component.isLiked_=false
    fixture.detectChanges();
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