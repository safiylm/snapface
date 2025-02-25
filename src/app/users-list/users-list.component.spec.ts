import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersListComponent } from './users-list.component';

describe('Users List', () => {

  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ 
    }).compileComponents()

    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();// Déclenche la détection des modifications initiales

  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.users).toBeDefined();
  });


})