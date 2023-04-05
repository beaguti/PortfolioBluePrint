import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'; 
import {MatCheckboxModule} from '@angular/material/checkbox';
import { EditCVComponent } from './edit-cv.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [EditCVComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    ColorPickerModule,
    FontAwesomeModule,
  ],
  exports:[EditCVComponent]
})
export class EditCVModule { }
