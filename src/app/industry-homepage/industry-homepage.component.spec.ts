import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IndustryHomepageComponent } from './industry-homepage.component';

describe('IndustryHomepageComponent', () => {
  let component: IndustryHomepageComponent;
  let fixture: ComponentFixture<IndustryHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [
            RouterTestingModule
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
});
