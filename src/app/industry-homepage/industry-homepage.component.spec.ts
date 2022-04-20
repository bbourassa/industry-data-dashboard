import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IndustryOverviewComponent } from '../industry-overview/industry-overview.component';
import { IndustryHomepageComponent } from './industry-homepage.component';

describe('IndustryHomepageComponent', () => {
  let component: IndustryHomepageComponent;
  let fixture: ComponentFixture<IndustryHomepageComponent>;
//  let mockRouter = {
//      navigate: jasmine.createSpy('navigate')
//  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [
            RouterTestingModule.withRoutes([{path: 'overview', component: IndustryOverviewComponent}])
          ],
        declarations: [ 
          IndustryHomepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustryHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reroute to overview', () => {
      spyOn(component['router'], 'navigateByUrl')
      component.rerouteToOverview();
      expect(component['router'].navigateByUrl).toHaveBeenCalledWith('overview')
      
  })
});
