
import { Component, inject, computed } from '@angular/core';
import { CrmStore } from '../services/crm.store';
import { AppIcon } from '../components/icons.component';

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [AppIcon],
  template: `
    <div class="flex h-[calc(100vh-8rem)] gap-6">
      <!-- Calendar Sidebar -->
      <div class="w-72 flex flex-col gap-6">
        <!-- Mini Date Picker (Visual) -->
        <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
           <div class="flex items-center justify-between mb-4">
             <h3 class="font-semibold text-gray-900">Febrero 2026</h3>
             <div class="flex gap-1">
               <button class="p-1 hover:bg-gray-100 rounded"><app-icon name="menu" class="w-4 h-4 rotate-90"/></button>
               <button class="p-1 hover:bg-gray-100 rounded"><app-icon name="menu" class="w-4 h-4 -rotate-90"/></button>
             </div>
           </div>
           <div class="grid grid-cols-7 gap-1 text-center text-xs mb-2 text-gray-400">
             <span>D</span><span>L</span><span>M</span><span>X</span><span>J</span><span>V</span><span>S</span>
           </div>
           <div class="grid grid-cols-7 gap-1 text-center text-sm">
             <span class="text-gray-300 py-1">29</span><span class="text-gray-300 py-1">30</span><span class="text-gray-300 py-1">31</span>
             <span class="py-1 hover:bg-gray-50 rounded cursor-pointer">1</span>
             <span class="py-1 hover:bg-gray-50 rounded cursor-pointer">2</span>
             <span class="py-1 hover:bg-gray-50 rounded cursor-pointer">3</span>
             <span class="py-1 hover:bg-gray-50 rounded cursor-pointer">4</span>
             <span class="py-1 hover:bg-gray-50 rounded cursor-pointer">5</span>
             <span class="py-1 hover:bg-gray-50 rounded cursor-pointer">6</span>
             <span class="py-1 hover:bg-gray-50 rounded cursor-pointer">7</span>
             <span class="py-1 hover:bg-gray-50 rounded cursor-pointer">8</span>
             <span class="py-1 hover:bg-gray-50 rounded cursor-pointer">9</span>
             <span class="py-1 hover:bg-gray-50 rounded cursor-pointer">10</span>
             <span class="py-1 hover:bg-gray-50 rounded cursor-pointer">11</span>
             <span class="py-1 hover:bg-gray-50 rounded cursor-pointer">12</span>
             <span class="py-1 hover:bg-gray-50 rounded cursor-pointer">13</span>
             <span class="py-1 bg-teal-600 text-white rounded font-bold shadow-md shadow-teal-200">14</span>
             <span class="py-1 hover:bg-gray-50 rounded cursor-pointer">15</span>
           </div>
        </div>

        <!-- Doctors Filter -->
        <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex-1">
          <h3 class="font-semibold text-gray-900 mb-4">Especialistas</h3>
          <div class="space-y-3">
             <label class="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
               <input type="checkbox" checked class="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-gray-300">
               <span class="flex-1">Todos</span>
             </label>
             @for (doc of store.doctorsList(); track doc) {
               <label class="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
                 <input type="checkbox" checked class="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-gray-300">
                 <span class="flex-1">{{doc}}</span>
                 <div class="w-2 h-2 rounded-full bg-teal-500"></div>
               </label>
             }
          </div>
        </div>
      </div>

      <!-- Main Agenda -->
      <div class="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
         <div class="p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 class="text-lg font-bold text-gray-900">Agenda del Día</h2>
            <button (click)="store.openModal('new-appointment')" class="flex items-center gap-2 px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg text-sm font-medium hover:bg-teal-100 transition">
              <app-icon name="calendar" class="w-4 h-4"/>
              Agendar Cita
            </button>
         </div>
         
         <div class="flex-1 overflow-y-auto p-4 space-y-2">
            @if (sortedAppointments().length === 0) {
              <div class="h-full flex flex-col items-center justify-center text-gray-400">
                 <app-icon name="calendar" class="w-12 h-12 mb-2 opacity-20"/>
                 <p>No hay citas programadas para hoy.</p>
              </div>
            }

            @for (appt of sortedAppointments(); track appt.id) {
               <div class="group flex gap-4 p-3 rounded-xl border border-gray-100 hover:border-teal-200 hover:shadow-md transition bg-gray-50/50 hover:bg-white">
                  <div class="flex flex-col items-center min-w-[4rem]">
                     <span class="text-sm font-bold text-gray-900">{{ appt.time }}</span>
                     <span class="text-xs text-gray-400">{{ appt.duration }} min</span>
                  </div>
                  
                  <div class="w-1 rounded-full" 
                       [class]="appt.type === 'Urgencia' ? 'bg-red-400' : (appt.type === 'Consulta' ? 'bg-blue-400' : 'bg-teal-400')">
                  </div>

                  <div class="flex-1">
                     <div class="flex justify-between items-start">
                        <h4 class="font-bold text-gray-900">{{ appt.patientName }}</h4>
                        <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                          [class]="appt.type === 'Urgencia' ? 'bg-red-50 text-red-600' : (appt.type === 'Consulta' ? 'bg-blue-50 text-blue-600' : 'bg-teal-50 text-teal-600')">
                          {{ appt.type }}
                        </span>
                     </div>
                     <p class="text-sm text-gray-500 flex items-center gap-2 mt-1">
                        <app-icon name="users" class="w-3 h-3"/> {{ appt.doctor }}
                     </p>
                  </div>
                  
                  <button class="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-teal-600 transition">
                     <app-icon name="settings" class="w-4 h-4"/>
                  </button>
               </div>
            }
         </div>
      </div>
    </div>
  `
})
export class CalendarViewComponent {
  store = inject(CrmStore);
  
  sortedAppointments = computed(() => {
    return this.store.appointments().sort((a, b) => a.time.localeCompare(b.time));
  });
}
