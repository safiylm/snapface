import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatistiqueUserComponent } from './statistique-user.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StatistiqueUser } from 'src/models/statistique.user.model';

describe('StatistiqueUserComponent', () => {
  let component: StatistiqueUserComponent;
  let fixture: ComponentFixture<StatistiqueUserComponent>;
  let httpTestingController: HttpTestingController;
  let followsNB !: HTMLElement;
  let pointsTotal !: HTMLElement;
  let postsTotal !: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    }).compileComponents()


    fixture = TestBed.createComponent(StatistiqueUserComponent);
    component = fixture.componentInstance;
    component.id = "66e9219abe68cdd15907399e";
    component.statistiqueUser=new StatistiqueUser( "66e9219abe68cdd15907399f","66e9219abe68cdd15907399e", 1, 3, 7);
    fixture.detectChanges();
    followsNB = fixture.nativeElement.querySelector("#btn-followers")
    pointsTotal = fixture.nativeElement.querySelector("#pointsTotal")
    postsTotal = fixture.nativeElement.querySelector("#postsTotal")
    httpTestingController = TestBed.inject(HttpTestingController);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should load data from the API', () => {

    let mockData = new StatistiqueUser( "66e9219abe68cdd15907399f","66e9219abe68cdd15907399e", 1, 3, 7);

    fixture.detectChanges(); // Déclenche ngOnInit

    // Simuler une requête HTTP
    const req = httpTestingController.expectOne
      ('https://snapface.onrender.com/api/statistiqueUserByUserId?id=66e9219abe68cdd15907399e');
  
      expect(req.request.method).toBe('GET'); // Vérifie le type de requête
    req.flush(mockData); // Envoie une réponse simulée

    // Vérifie que les données sont assignées correctement
    expect(component.statistiqueUser).toEqual(mockData);

  });


  it('should display followers', () => {
    expect(followsNB.textContent).toEqual(" Followers "+component.statistiqueUser.followers);
  });


  it('should display total of points', () => {
    expect(pointsTotal.textContent).toEqual(" Points totales "+component.statistiqueUser.totalPoints);
  });

  it('should display total of posts ', () => {
    expect(postsTotal.textContent).toEqual(" Post totales "+component.statistiqueUser.totalPosts);
  });

})