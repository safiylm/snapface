import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { InteractionSocialComponent } from './interaction-social.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NgIf } from '@angular/common';
import { InteractionSocialeService } from 'src/services/interaction-social-service';
import { InteractionSociale } from 'src/models/interaction.sociale.model';

describe('interaction social Component', () => {
  let component: InteractionSocialComponent; 
  let fixture: ComponentFixture<InteractionSocialComponent>;
  
  beforeEach(async () => {

    await TestBed.configureTestingModule({
        providers: [
              InteractionSocialeService,
            ],
      imports:[HttpClientModule, RouterTestingModule, NgIf],
    }).compileComponents()
  
    fixture = TestBed.createComponent(InteractionSocialComponent); 
    component = fixture.componentInstance; 
    component.interactionSociale = new InteractionSociale("66f9678e9189a0956c8cfb4d",
      "66f9678d9189a0956c8cfb4c",1,1,3,
      ["662eb361c2fd9ad3238d752a"],
      ["662eb361c2fd9ad3238d752a"])
    //component.id="66f9678d9189a0956c8cfb4c";
    fixture.detectChanges();
  });

  it('should create', () => { 
    expect(component).toBeTruthy(); 
  });

})