import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditRoutingModule } from './edit-routing.module';
import { RouterModule } from '@angular/router';
import { EditComponent } from './edit.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'; 
import {MatCheckboxModule} from '@angular/material/checkbox';
import { EditCVModule } from './edit-cv/edit-cv.module';
import { EditProjectsModule } from './edit-projects/edit-projects.module';
import { ColorPickerModule } from 'ngx-color-picker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    EditRoutingModule,
    EditCVModule,
    EditProjectsModule,

    //external
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    ColorPickerModule,
    FontAwesomeModule,
  ]
})
export class EditModule { }
