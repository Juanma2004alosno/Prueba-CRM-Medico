
import { Injectable, signal, computed } from '@angular/core';

export interface Patient {
  id: string;
  name: string;
  age: number;
  status: 'Activo' | 'Inactivo' | 'Pendiente';
  lastVisit: string;
  condition: string;
  avatar: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  time: string;
  type: 'Consulta' | 'Seguimiento' | 'Urgencia';
  doctor: string;
  duration?: number; // in minutes
}

export type ModalType = 'none' | 'new-patient' | 'new-appointment';

@Injectable({
  providedIn: 'root'
})
export class CrmStore {
  // State
  readonly isLoggedIn = signal<boolean>(false);
  readonly currentView = signal<'dashboard' | 'patients' | 'calendar' | 'settings'>('dashboard');
  readonly activeModal = signal<ModalType>('none');
  
  // Mock Data
  readonly patients = signal<Patient[]>([
    { id: '1', name: 'Ana Garcia', age: 34, status: 'Activo', lastVisit: '2024-02-10', condition: 'Hipertensión', avatar: 'https://picsum.photos/id/64/100/100' },
    { id: '2', name: 'Carlos Mendoza', age: 45, status: 'Pendiente', lastVisit: '2024-01-28', condition: 'Chequeo General', avatar: 'https://picsum.photos/id/91/100/100' },
    { id: '3', name: 'Lucia Fernandez', age: 29, status: 'Activo', lastVisit: '2024-02-14', condition: 'Dermatología', avatar: 'https://picsum.photos/id/103/100/100' },
    { id: '4', name: 'Miguel Angel', age: 52, status: 'Inactivo', lastVisit: '2023-11-05', condition: 'Cardiología', avatar: 'https://picsum.photos/id/123/100/100' },
    { id: '5', name: 'Sofia Torres', age: 22, status: 'Activo', lastVisit: '2024-02-15', condition: 'Pediatría', avatar: 'https://picsum.photos/id/234/100/100' }
  ]);

  readonly appointments = signal<Appointment[]>([
    { id: '101', patientName: 'Ana Garcia', time: '09:00', type: 'Seguimiento', doctor: 'Dr. Lopez', duration: 30 },
    { id: '102', patientName: 'Roberto Gomez', time: '10:30', type: 'Consulta', doctor: 'Dra. Ruiz', duration: 45 },
    { id: '103', patientName: 'Lucia Fernandez', time: '11:45', type: 'Urgencia', doctor: 'Dr. Lopez', duration: 15 },
    { id: '104', patientName: 'Elena White', time: '14:00', type: 'Consulta', doctor: 'Dr. Smith', duration: 60 }
  ]);

  // Computed Stats
  readonly totalPatients = computed(() => this.patients().length);
  readonly activePatients = computed(() => this.patients().filter(p => p.status === 'Activo').length);
  readonly todaysAppointments = computed(() => this.appointments().length);
  readonly doctorsList = computed(() => ['Dr. Carlos Mendoza', 'Dr. Lopez', 'Dra. Ruiz', 'Dr. Smith']);
  
  // Actions
  login() {
    this.isLoggedIn.set(true);
    this.currentView.set('dashboard');
  }

  logout() {
    this.isLoggedIn.set(false);
  }

  navigate(view: 'dashboard' | 'patients' | 'calendar' | 'settings') {
    this.currentView.set(view);
  }

  openModal(type: ModalType) {
    this.activeModal.set(type);
  }

  closeModal() {
    this.activeModal.set('none');
  }

  addPatient(patient: Omit<Patient, 'id' | 'avatar'>) {
    const newId = (Math.random() * 10000).toFixed(0);
    const avatarId = Math.floor(Math.random() * 70) + 1;
    const newPatient: Patient = {
      ...patient,
      id: newId,
      avatar: `https://picsum.photos/id/${avatarId}/100/100`
    };
    this.patients.update(list => [newPatient, ...list]);
  }

  addAppointment(appointment: Omit<Appointment, 'id'>) {
    const newId = (Math.random() * 10000).toFixed(0);
    const newAppt: Appointment = { ...appointment, id: newId };
    
    // Insert sorted by time roughly (simple string sort for demo)
    this.appointments.update(list => {
      const newList = [...list, newAppt];
      return newList.sort((a, b) => a.time.localeCompare(b.time));
    });
  }
}
