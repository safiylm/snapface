import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UsersListComponent } from './users-list.component';

describe('UserList', () => {
  let component: UsersListComponent; let fixture: ComponentFixture<UsersListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [UsersListComponent]
    }).compileComponents();
  }));

  beforeEach(() => { 
    fixture = TestBed.createComponent(UsersListComponent); 
    component = fixture.componentInstance; fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeDefined(); });


})