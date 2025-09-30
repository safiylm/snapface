import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NgIf } from '@angular/common';
import { PointButtonComponent } from './point-button.component';
import { InteractionSociale } from 'src/models/interaction.sociale.model';
/* 
describe('point button in interaction social Component', () => {
  let component: PointButtonComponent; 
  let fixture: ComponentFixture<PointButtonComponent>;
  
  beforeEach( () => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule, RouterTestingModule, NgIf],
    }).compileComponents()
  
    fixture = TestBed.createComponent(PointButtonComponent); 
    component = fixture.componentInstance; 
     
   fixture.detectChanges();
  });

  it('should create', () => { 
    expect(component).toBeTruthy(); 
  });

  it('button add point have been called', fakeAsync(() => {
    spyOn(component, 'addPoints');
  
    let button = fixture.debugElement.nativeElement.querySelector('#btnaddpoint');
    button.click();
    tick();
    expect(component.addPoints).toHaveBeenCalled();
  
  })); 
/*
  it('button remove point have been called', fakeAsync(() => {
    spyOn(component, 'removePoints');
  
    let button = fixture.debugElement.nativeElement.querySelector('#btnremovepoint');
    button.click();
    tick();
    expect(component.removePoints).toHaveBeenCalled();
  
  })); 
*/

