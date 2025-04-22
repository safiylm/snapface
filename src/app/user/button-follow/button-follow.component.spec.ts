import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonFollowComponent } from './button-follow.component';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AbonneeService } from 'src/services/abonnee-service';

describe('ButtonFollowComponent', () => {
  let component: ButtonFollowComponent;
  let fixture: ComponentFixture<ButtonFollowComponent>;
  let abonneeService: jasmine.SpyObj<AbonneeService>;

  beforeEach(async () => {
    const abonneeServiceSpy = 
    jasmine.createSpyObj('AbonneeService', ['checkabonnement', 'create', 'remove']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
     // declarations: [ButtonFollowComponent],
      providers: [
        { provide: AbonneeService, useValue: abonneeServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonFollowComponent);
    component = fixture.componentInstance;
    abonneeService = TestBed.inject(AbonneeService) as jasmine.SpyObj<AbonneeService>;
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it("devrait vérifier l'abonnement à l'initialisation", () => {
    /*
    C'est un espion (spy) créé par jasmine.createSpyObj(). 
    Il remplace la véritable méthode du service afin d'éviter 
    d'appeler une API réelle pendant le test.
    */
    abonneeService.checkabonnement.and.returnValue(of(true));
   /*
   .and.returnValue(of(true))
    On force checkabonnement à retourner un observable (of(true)).
    of(true) est un opérateur de RxJS qui crée un observable émettant immédiatement la valeur true.
    Cela signifie que lorsque checkabonnement est appelé dans le test, il renverra true immédiatement, sans faire d'appel réseau.
   */
    component.pageuserid = '662eb2a1c2fd9ad3238d7528';
    component.ngOnInit();
    expect(abonneeService.checkabonnement).toHaveBeenCalled();
    expect(component.isAbonnee).toBeTrue();
  });

  it("devrait gérer une erreur lors de la vérification de l'abonnement", () => {
    spyOn(console, 'error');
    abonneeService.checkabonnement.and.returnValue(throwError(() => new Error('Erreur API')));
    component.pageuserid = '662eb2a1c2fd9ad3238d7528';
    component.ngOnInit();
    expect(console.error).toHaveBeenCalledWith('erreur,check abonnemnt ');
  });

  it("devrait permettre de s'abonner", () => {
    abonneeService.create.and.returnValue(of(true));
    component.pageuserid = '662eb2a1c2fd9ad3238d7528';
    component.sabonner();
    expect(abonneeService.create).toHaveBeenCalled();
    expect(component.isAbonnee).toBeTrue();
  });

  it("devrait gérer une erreur lors de l'abonnement", () => {
    spyOn(console, 'error');
    abonneeService.create.and.returnValue(throwError(() => new Error('Erreur API')));
    component.pageuserid = '662eb2a1c2fd9ad3238d7528';
    component.sabonner();
    expect(console.error).toHaveBeenCalledWith('erreur lorsque le user veut s\'abonner');
  });

  it('devrait permettre de se désabonner', () => {
    abonneeService.remove.and.returnValue(of(false));
    component.pageuserid = '662eb2a1c2fd9ad3238d7528';
    component.sedesabonner();
    expect(abonneeService.remove).toHaveBeenCalled();
    expect(component.isAbonnee).toBeFalse();
  });

  it('devrait gérer une erreur lors du désabonnement', () => {
    spyOn(console, 'error');
    abonneeService.remove.and.returnValue(throwError(() => new Error('Erreur API')));
    component.pageuserid = '662eb2a1c2fd9ad3238d7528';
    component.sedesabonner();
    expect(console.error).toHaveBeenCalledWith('erreur lorsque le user veut se desabonner');
  });
});
