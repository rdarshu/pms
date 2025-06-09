import { Component, inject, signal } from '@angular/core';
import { SpinnerComponent } from "../common/topmenu";
import { PatientsStore } from '../store/patients.store';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Patient } from '../store/patient.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-patient-list',
  imports: [CommonModule, MatFormFieldModule, MatCardModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule, SpinnerComponent, FormsModule],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.scss'
})
export class PatientListComponent {
  patientsStore = inject(PatientsStore);
  patientlist: any;
  searchTerm: string = '';
 patients = this.patientsStore.filteredPatients;
  ngOnInit() {
    console.log(this.patientlist);
   this.patientsStore.getAll();

  }
  viewPatient(patient: Patient) {
    console.log('Viewing:', patient);
  }

  editPatient(patient: Patient) {
    console.log('Editing:', patient);
  }

  deletePatient(id: number) {
    if (confirm('Are you sure you want to delete this patient?')) {
      this.patientsStore.remove(id);
    }
  }
  onSearch() {
    this.patientsStore.setSearchTerm(this.searchTerm);
  }
}
