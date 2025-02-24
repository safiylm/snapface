import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordOublierComponent } from './password-oublier.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NgIf } from '@angular/common';

describe('Password oublier Component', () => {
  let component: PasswordOublierComponent; 

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule, RouterTestingModule, NgIf],
    }).compileComponents()

    let fixture: ComponentFixture<PasswordOublierComponent>;
  
    fixture = TestBed.createComponent(PasswordOublierComponent); 
    component = fixture.componentInstance; fixture.detectChanges();
  });

  it('should create', () => { 
    expect(component).toBeTruthy(); 
  });

  it("initialisation", ()=>{
    expect(component.is2PasswordIdentique).toBeDefined()
    expect(component.reglePasswordRespected).toBeDefined()
    expect(component.isDisplayPassword).toBeDefined()
    expect(component.isDisplayPassword2).toBeDefined()
    expect(component.newpassword).toBeDefined()
    expect(component.newpassword2).toBeDefined()

    expect(component.is2PasswordIdentique).toBeFalse()
    expect(component.reglePasswordRespected).toBeFalse()
    expect(component.isDisplayPassword).toBeFalse()
    expect(component.isDisplayPassword2).toBeFalse()
    
  })

  it("mot de passe regle respecté et non identique", ()=>{
    component.newpassword="Courage123*"
    component.newpassword2="Courage123"
   
    spyOn(component, "getFirstPassword")
    spyOn(component, "getSecondPassword")
   
    component.getFirstPassword()
    component.getSecondPassword()
   
    expect(component.getFirstPassword).toHaveBeenCalled()
    expect(component.getSecondPassword).toHaveBeenCalled()
   
    expect(component.reglePasswordRespected).toBeTrue()
    expect(component.is2PasswordIdentique).toBeFalse()

  })

  it("mot de passe regle non respecté & identique ", ()=>{
    component.newpassword="courage123"
    component.newpassword2="courage123"

    spyOn(component, "getFirstPassword")
    spyOn(component, "getSecondPassword")
   
    component.getFirstPassword()
    component.getSecondPassword()
   
    expect(component.getFirstPassword).toHaveBeenCalled()
    expect(component.getSecondPassword).toHaveBeenCalled()
   
    expect(component.reglePasswordRespected).toBeFalse()
    expect(component.is2PasswordIdentique).toBeTrue()
  })

  it("mot de passe identique & Règle Respectée ", ()=>{
    component.newpassword="Courage123*"
    component.newpassword2="Courage123*"
   
    spyOn(component, "getFirstPassword")
    spyOn(component, "getSecondPassword")
   
    component.getFirstPassword()
    component.getSecondPassword()
   
    expect(component.getFirstPassword).toHaveBeenCalled()
    expect(component.getSecondPassword).toHaveBeenCalled()
   
    expect(component.reglePasswordRespected).toBeTrue()
    expect(component.is2PasswordIdentique).toBeTrue()
  })

  it("mot de passe non identique et Règle non respecté", ()=>{
    component.newpassword="Courage123*"
    component.newpassword2="courage123"

    spyOn(component, "getFirstPassword")
    spyOn(component, "getSecondPassword")
   
    component.getFirstPassword()
    component.getSecondPassword()
   
    expect(component.getFirstPassword).toHaveBeenCalled()
    expect(component.getSecondPassword).toHaveBeenCalled()
   
    expect(component.reglePasswordRespected).toBeFalse()
    expect(component.is2PasswordIdentique).toBeFalse()
  })
  
})