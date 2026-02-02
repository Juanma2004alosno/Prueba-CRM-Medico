
import { Component, inject } from '@angular/core';
import { CrmStore } from '../services/crm.store';
import { AppIcon } from '../components/icons.component';

@Component({
  selector: 'app-patients-view',
  standalone: true,
  imports: [AppIcon],
  template: `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-gray-900">Directorio de Pacientes</h2>
        <div class="flex gap-2">
           <button class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
             <app-icon name="menu" class="w-4 h-4"/>
             Filtros
           </button>
           <button (click)="store.openModal('new-patient')" class="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition">
             <app-icon name="users" class="w-4 h-4"/>
             Nuevo Paciente
           </button>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-gray-50 border-b border-gray-100">
              <tr>
                <th class="px-6 py-4 font-semibold text-gray-500">Paciente</th>
                <th class="px-6 py-4 font-semibold text-gray-500">Estado</th>
                <th class="px-6 py-4 font-semibold text-gray-500">Última Visita</th>
                <th class="px-6 py-4 font-semibold text-gray-500">Condición</th>
                <th class="px-6 py-4 font-semibold text-gray-500 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              @for (patient of store.patients(); track patient.id) {
                <tr class="hover:bg-gray-50 transition group">
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                      <img [src]="patient.avatar" class="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm" alt="">
                      <div>
                        <div class="font-medium text-gray-900">{{ patient.name }}</div>
                        <div class="text-gray-400 text-xs">{{ patient.age }} años</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    @if (patient.status === 'Activo') {
                      <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                        <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        Activo
                      </span>
                    } @else if (patient.status === 'Pendiente') {
                      <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                        <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        Pendiente
                      </span>
                    } @else {
                      <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        <span class="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                        Inactivo
                      </span>
                    }
                  </td>
                  <td class="px-6 py-4 text-gray-600">{{ patient.lastVisit }}</td>
                  <td class="px-6 py-4">
                    <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">{{ patient.condition }}</span>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <button class="text-gray-400 hover:text-teal-600 transition">
                      <app-icon name="menu" class="w-5 h-5"/>
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <div class="px-6 py-4 border-t border-gray-100 bg-gray-50 text-xs text-gray-500 flex justify-between items-center">
           <span>Mostrando {{ store.patients().length }} pacientes</span>
           <div class="flex gap-2">
             <button class="px-3 py-1 bg-white border border-gray-200 rounded hover:bg-gray-100 disabled:opacity-50" disabled>Anterior</button>
             <button class="px-3 py-1 bg-white border border-gray-200 rounded hover:bg-gray-100">Siguiente</button>
           </div>
        </div>
      </div>
    </div>
  `
})
export class PatientsViewComponent {
  store = inject(CrmStore);
}
