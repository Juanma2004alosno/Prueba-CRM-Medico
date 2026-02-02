
import { Component, inject } from '@angular/core';
import { CrmStore } from '../services/crm.store';
import { AppIcon } from './icons.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [AppIcon],
  template: `
    <div class="min-h-screen bg-white">
      <!-- Navbar -->
      <nav class="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div class="flex items-center gap-2 text-teal-700">
          <app-icon name="activity" class="w-8 h-8" />
          <span class="text-xl font-bold tracking-tight">MedSync<span class="text-teal-500">CRM</span></span>
        </div>
        <div class="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#" class="hover:text-teal-600 transition">Funcionalidades</a>
          <a href="#" class="hover:text-teal-600 transition">Testimonios</a>
          <a href="#" class="hover:text-teal-600 transition">Precios</a>
        </div>
        <div class="flex items-center gap-4">
          <button (click)="store.login()" class="text-sm font-semibold text-gray-700 hover:text-teal-600">Iniciar Sesión</button>
          <button (click)="store.login()" class="bg-teal-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-teal-700 transition shadow-lg shadow-teal-200">
            Solicitar Demo
          </button>
        </div>
      </nav>

      <!-- Hero Section -->
      <header class="relative pt-16 pb-32 flex flex-col items-center text-center px-6">
        <div class="bg-teal-50 text-teal-700 px-4 py-1.5 rounded-full text-xs font-semibold mb-8 border border-teal-100">
          Novedad 2026: Inteligencia Clínica Predictiva
        </div>
        <h1 class="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight max-w-4xl leading-tight">
          La Gestión Médica del <br/>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-600">Futuro, Hoy.</span>
        </h1>
        <p class="text-xl text-gray-500 max-w-2xl mb-10 leading-relaxed">
          MedSync es el CRM especializado que permite a las clínicas digitalizar sus procesos, mejorar la atención al paciente y optimizar la rentabilidad operativa.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button (click)="store.login()" class="bg-teal-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-teal-700 transition shadow-xl shadow-teal-200 flex items-center justify-center gap-2">
            Empezar Gratis
            <app-icon name="trending-up" class="w-5 h-5"/>
          </button>
          <button class="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl text-lg font-semibold hover:border-gray-300 transition flex items-center justify-center gap-2 shadow-sm">
             Ver Video Demo
          </button>
        </div>
      </header>

      <!-- Features Grid -->
      <section class="max-w-7xl mx-auto px-6 py-20">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Todo lo que su clínica necesita</h2>
          <p class="text-gray-500">Una plataforma integrada diseñada para médicos, recepcionistas y administradores.</p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 mb-8">
          <!-- Feature 1 -->
          <div class="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-md transition">
             <div class="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-teal-600">
                <app-icon name="calendar" class="w-6 h-6" />
             </div>
             <h3 class="text-2xl font-bold text-gray-900 mb-3">Agenda Inteligente</h3>
             <p class="text-gray-600 mb-6 leading-relaxed">
               Gestión de citas con recordatorios automáticos vía WhatsApp y correo electrónico. Reduzca el ausentismo en un 45%.
             </p>
             <ul class="space-y-3">
               <li class="flex items-center gap-3 text-sm text-gray-600">
                 <app-icon name="check" class="w-4 h-4 text-teal-500" />
                 Sincronización con Google Calendar
               </li>
               <li class="flex items-center gap-3 text-sm text-gray-600">
                 <app-icon name="check" class="w-4 h-4 text-teal-500" />
                 Listas de espera automáticas
               </li>
             </ul>
          </div>

          <!-- Feature 2 -->
          <div class="bg-teal-900 p-8 rounded-3xl text-white relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-64 h-64 bg-teal-800 rounded-full blur-3xl opacity-20 -mr-16 -mt-16 transition group-hover:opacity-30"></div>
             <div class="w-12 h-12 bg-teal-800 rounded-xl flex items-center justify-center mb-6 text-teal-200 relative z-10">
                <app-icon name="shield" class="w-6 h-6" />
             </div>
             <h3 class="text-2xl font-bold mb-3 relative z-10">Seguridad de Grado Médico</h3>
             <p class="text-teal-100 mb-6 leading-relaxed relative z-10">
               Cumplimiento total con normativas GDPR y HIPAA. Sus datos y los de sus pacientes están cifrados punto a punto.
             </p>
             <ul class="space-y-3 relative z-10">
               <li class="flex items-center gap-3 text-sm text-teal-100">
                 <div class="w-4 h-4 rounded-full bg-teal-500 flex items-center justify-center text-[10px]">✓</div>
                 Backups diarios automáticos
               </li>
               <li class="flex items-center gap-3 text-sm text-teal-100">
                 <div class="w-4 h-4 rounded-full bg-teal-500 flex items-center justify-center text-[10px]">✓</div>
                 Control de acceso por roles
               </li>
             </ul>
          </div>
        </div>
      </section>

      <footer class="bg-gray-50 border-t border-gray-200 py-12 text-center text-gray-400 text-sm">
        <p>&copy; 2026 MedSync Solutions. Todos los derechos reservados.</p>
      </footer>
    </div>
  `
})
export class LandingComponent {
  store = inject(CrmStore);
}
