import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersListVerticalComponent } from './users-list-vertical.component';

describe('User List !Vertical', () => {
  
  let component: UsersListVerticalComponent;
  let fixture: ComponentFixture<UsersListVerticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    }).compileComponents()

    fixture = TestBed.createComponent(UsersListVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();// Déclenche la détection des modifications initiales

  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.liste).toBeDefined()
  });


})