import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'; 
import {MatCheckboxModule} from '@angular/material/checkbox';
import { EditProjectsComponent } from './edit-projects.component';
@NgModule({
  declarations: [EditProjectsComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  exports:[EditProjectsComponent]
})
export class EditProjectsModule { }
