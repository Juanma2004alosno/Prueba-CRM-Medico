
import { Component, inject } from '@angular/core';
import { CrmStore } from '../services/crm.store';
import { AppIcon } from './icons.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardHomeComponent } from '../views/dashboard-home.component';
import { PatientsViewComponent } from '../views/patients-view.component';
import { CalendarViewComponent } from '../views/calendar-view.component';
import { ModalComponent } from './modal.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    AppIcon, 
    CommonModule, 
    FormsModule,
    DashboardHomeComponent, 
    PatientsViewComponent, 
    CalendarViewComponent,
    ModalComponent
  ],
  template: `
    <div class="flex h-screen bg-gray-50 overflow-hidden">
      <!-- Sidebar -->
      <aside class="w-64 bg-white border-r border-gray-200 flex flex-col z-20 hidden md:flex">
        <div class="h-16 flex items-center px-6 border-b border-gray-100">
          <div class="flex items-center gap-2 text-teal-700">
            <app-icon name="activity" class="w-6 h-6" />
            <span class="text-lg font-bold tracking-tight">MedSync</span>
          </div>
        </div>

        <nav class="flex-1 px-3 py-6 space-y-1">
          <button (click)="nav('dashboard')" 
            [class]="getNavLinkClass('dashboard')">
            <app-icon name="activity" class="w-5 h-5" />
            Dashboard
          </button>
          <button (click)="nav('patients')" 
            [class]="getNavLinkClass('patients')">
            <app-icon name="users" class="w-5 h-5" />
            Pacientes
          </button>
          <button (click)="nav('calendar')" 
            [class]="getNavLinkClass('calendar')">
            <app-icon name="calendar" class="w-5 h-5" />
            Agenda
          </button>
          <button (click)="nav('settings')" 
            [class]="getNavLinkClass('settings')">
            <app-icon name="settings" class="w-5 h-5" />
            Configuración
          </button>
        </nav>

        <div class="p-4 border-t border-gray-100">
          <button (click)="store.logout()" class="flex items-center gap-3 px-3 py-2 w-full text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition">
            <app-icon name="log-out" class="w-5 h-5" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 flex flex-col overflow-hidden relative">
        <!-- Top Header -->
        <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10">
           <div class="w-96 relative hidden sm:block">
             <app-icon name="search" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
             <input type="text" placeholder="Buscar pacientes, citas, doctores..." 
               class="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full text-sm focus:ring-2 focus:ring-teal-500 focus:bg-white transition outline-none text-gray-700 placeholder-gray-400">
           </div>
           
           <!-- Mobile Menu Button -->
           <button class="md:hidden text-gray-500">
              <app-icon name="menu" class="w-6 h-6" />
           </button>

           <div class="flex items-center gap-6">
             <button class="relative text-gray-400 hover:text-gray-600">
               <app-icon name="bell" class="w-5 h-5" />
               <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
             </button>
             <div class="flex items-center gap-3 pl-6 border-l border-gray-100">
               <div class="text-right hidden sm:block">
                 <p class="text-sm font-semibold text-gray-900">Dr. Carlos Mendoza</p>
                 <p class="text-xs text-gray-500">Administrador</p>
               </div>
               <img src="https://picsum.photos/id/64/100/100" class="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100" alt="Avatar">
             </div>
           </div>
        </header>

        <!-- Dynamic Content Area -->
        <div class="flex-1 overflow-auto p-4 md:p-8">
           @if (store.currentView() === 'dashboard') {
             <app-dashboard-home />
           } @else if (store.currentView() === 'patients') {
             <app-patients-view />
           } @else if (store.currentView() === 'calendar') {
             <app-calendar-view />
           } @else {
             <div class="flex flex-col items-center justify-center h-full text-gray-400">
               <app-icon name="settings" class="w-12 h-12 mb-4 opacity-50" />
               <p>Módulo en construcción: {{ store.currentView() }}</p>
             </div>
           }
        </div>
      </main>

      <!-- Global Modals -->
      @if (store.activeModal() === 'new-patient') {
        <app-modal (close)="store.closeModal()">
          <div class="text-center sm:text-left">
            <h3 class="text-xl font-bold leading-6 text-gray-900 mb-4" id="modal-title">Registrar Nuevo Paciente</h3>
            <div class="mt-2 space-y-4">
               <div>
                 <label class="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                 <input type="text" [(ngModel)]="newPatientData.name" class="w-full rounded-lg border-gray-300 bg-gray-50 border p-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Ej. Juan Pérez">
               </div>
               <div class="grid grid-cols-2 gap-4">
                 <div>
                   <label class="block text-sm font-medium text-gray-700 mb-1">Edad</label>
                   <input type="number" [(ngModel)]="newPatientData.age" class="w-full rounded-lg border-gray-300 bg-gray-50 border p-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none" placeholder="30">
                 </div>
                 <div>
                   <label class="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                   <select [(ngModel)]="newPatientData.status" class="w-full rounded-lg border-gray-300 bg-gray-50 border p-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none">
                     <option value="Activo">Activo</option>
                     <option value="Pendiente">Pendiente</option>
                     <option value="Inactivo">Inactivo</option>
                   </select>
                 </div>
               </div>
               <div>
                 <label class="block text-sm font-medium text-gray-700 mb-1">Condición Médica</label>
                 <input type="text" [(ngModel)]="newPatientData.condition" class="w-full rounded-lg border-gray-300 bg-gray-50 border p-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Ej. Diabetes Tipo 2">
               </div>
            </div>
            <div class="mt-6 flex flex-row-reverse gap-3">
              <button (click)="submitPatient()" class="inline-flex w-full justify-center rounded-lg bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 sm:w-auto">Guardar Paciente</button>
              <button (click)="store.closeModal()" class="mt-3 inline-flex w-full justify-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancelar</button>
            </div>
          </div>
        </app-modal>
      }

      @if (store.activeModal() === 'new-appointment') {
        <app-modal (close)="store.closeModal()">
          <div class="text-center sm:text-left">
            <h3 class="text-xl font-bold leading-6 text-gray-900 mb-4">Agendar Nueva Cita</h3>
            <div class="mt-2 space-y-4">
               <div>
                 <label class="block text-sm font-medium text-gray-700 mb-1">Paciente</label>
                 <select [(ngModel)]="newApptData.patientName" class="w-full rounded-lg border-gray-300 bg-gray-50 border p-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none">
                    <option value="" disabled selected>Seleccionar Paciente</option>
                    @for (p of store.patients(); track p.id) {
                      <option [value]="p.name">{{ p.name }}</option>
                    }
                 </select>
               </div>
               <div class="grid grid-cols-2 gap-4">
                 <div>
                   <label class="block text-sm font-medium text-gray-700 mb-1">Hora</label>
                   <input type="time" [(ngModel)]="newApptData.time" class="w-full rounded-lg border-gray-300 bg-gray-50 border p-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none">
                 </div>
                 <div>
                   <label class="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                   <select [(ngModel)]="newApptData.type" class="w-full rounded-lg border-gray-300 bg-gray-50 border p-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none">
                     <option value="Consulta">Consulta</option>
                     <option value="Seguimiento">Seguimiento</option>
                     <option value="Urgencia">Urgencia</option>
                   </select>
                 </div>
               </div>
               <div>
                 <label class="block text-sm font-medium text-gray-700 mb-1">Doctor Asignado</label>
                 <select [(ngModel)]="newApptData.doctor" class="w-full rounded-lg border-gray-300 bg-gray-50 border p-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none">
                    @for (doc of store.doctorsList(); track doc) {
                      <option [value]="doc">{{ doc }}</option>
                    }
                 </select>
               </div>
            </div>
            <div class="mt-6 flex flex-row-reverse gap-3">
              <button (click)="submitAppt()" class="inline-flex w-full justify-center rounded-lg bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 sm:w-auto">Confirmar Cita</button>
              <button (click)="store.closeModal()" class="mt-3 inline-flex w-full justify-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancelar</button>
            </div>
          </div>
        </app-modal>
      }

    </div>
  `
})
export class DashboardLayoutComponent {
  store = inject(CrmStore);

  // Form State
  newPatientData = {
    name: '',
    age: null as number | null,
    status: 'Activo' as const,
    condition: ''
  };

  newApptData = {
    patientName: '',
    time: '09:00',
    type: 'Consulta' as const,
    doctor: 'Dr. Carlos Mendoza'
  };

  nav(view: 'dashboard' | 'patients' | 'calendar' | 'settings') {
    this.store.navigate(view);
  }

  getNavLinkClass(view: string) {
    const isActive = this.store.currentView() === view;
    return `flex items-center gap-3 px-3 py-2.5 w-full text-sm font-medium rounded-lg transition mb-1 ${
      isActive 
        ? 'bg-teal-50 text-teal-700' 
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`;
  }

  submitPatient() {
    if (this.newPatientData.name && this.newPatientData.age) {
      this.store.addPatient({
        name: this.newPatientData.name,
        age: this.newPatientData.age,
        status: this.newPatientData.status,
        condition: this.newPatientData.condition || 'Sin especificar',
        lastVisit: 'Hoy'
      });
      // Reset & Close
      this.newPatientData = { name: '', age: null, status: 'Activo', condition: '' };
      this.store.closeModal();
    }
  }

  submitAppt() {
    if (this.newApptData.patientName) {
      this.store.addAppointment({
        patientName: this.newApptData.patientName,
        time: this.newApptData.time,
        type: this.newApptData.type,
        doctor: this.newApptData.doctor,
        duration: 30
      });
      this.store.closeModal();
      // Navigate to calendar to see it
      this.store.navigate('calendar');
    }
  }
}
