import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtAlbumListComponent } from './art-album-list.component';

describe('ArtAlbumListComponent', () => {
  let component: ArtAlbumListComponent;
  let fixture: ComponentFixture<ArtAlbumListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtAlbumListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtAlbumListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
