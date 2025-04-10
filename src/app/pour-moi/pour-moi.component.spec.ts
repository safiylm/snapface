import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PourMoiComponent } from './pour-moi.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { InteractionSocialeService } from 'src/services/interaction-social-service';
import { AbonneeService } from 'src/services/abonnee-service';
import { Abonnee } from 'src/models/abonnee.model';
import { of } from 'rxjs';

describe('Pour moi Component', () => {

    let component: PourMoiComponent;
    let fixture: ComponentFixture<PourMoiComponent>;
    let service : AbonneeService;

    beforeEach(async () => {

        TestBed.configureTestingModule({
            providers: [
                InteractionSocialeService,
            ],
            imports: [HttpClientModule, RouterTestingModule],
        })

        fixture = TestBed.createComponent(PourMoiComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        service = TestBed.inject(AbonneeService);
    
    });


    it('should create', () => {
        expect(component).toBeTruthy();
    });


   it('should get abonnement', () => {
 
     // Arrange
     const data : Abonnee[] =[];
 
     component.abonnement = data;
 
     spyOn(service, 'getAbonnementByUserId').and
       .returnValue(of(data));

       spyOn(component, 'ngOnInit');
     // Act
     component.ngOnInit();
 
     // Assert
     expect(component.ngOnInit).toHaveBeenCalled();

   });



})