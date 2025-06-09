import { Injectable, computed, inject, signal } from '@angular/core';
import {
  signalStore,
  withComputed,
  withMethods,
  withState,
  patchState,
} from '@ngrx/signals';
import { Patient } from './patient.model';
import { ApiService } from '../service/api';

const initialPatients: Patient[] = [];

export const PatientsStore = signalStore(
  { providedIn: 'root' },

  withState({
    patients: initialPatients,
    searchTerm: '',
  }),

  withComputed((state) => ({
    allPatients: state.patients,
    filteredPatients: computed(() => {
      const term = state.searchTerm().toLowerCase().trim();
      if (!term) return state.patients();
      return state.patients().filter((p) =>
        p.name.toLowerCase().includes(term)
      );
    }),
  })),

  withMethods((store) => {
    const api = inject(ApiService);
    return {
      getAll() {
        api.get<Patient[]>('patients').subscribe({
          next: (res) => {
            patchState(store, { patients: res });
          },
          error: (err) => console.error('API error:', err),
        });
      },

      setSearchTerm(term: string) {
        patchState(store, { searchTerm: term });
      },

      add(patient: Patient) {
        patchState(store, (state) => ({
          patients: [...state.patients, patient],
        }));
      },

      remove(id: number) {
        patchState(store, (state) => ({
          patients: state.patients.filter((p) => p.id !== id),
        }));
      },

      update(id: number, updated: Partial<Patient>) {
        patchState(store, (state) => ({
          patients: state.patients.map((p) =>
            p.id === id ? { ...p, ...updated } : p
          ),
        }));
      },

      getById(id: number) {
        return store.patients().find((p) => p.id === id);
      },
    };
  })
);
