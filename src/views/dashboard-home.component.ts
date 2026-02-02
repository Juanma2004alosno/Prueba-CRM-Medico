
import { Component, inject, ElementRef, viewChild, afterNextRender } from '@angular/core';
import { CrmStore } from '../services/crm.store';
import { AppIcon } from '../components/icons.component';
import * as d3 from 'd3';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [AppIcon],
  template: `
    <div class="space-y-8">
      <!-- Welcome Section -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
           <h2 class="text-2xl font-bold text-gray-900 mb-1">Hola, Dr. Carlos 👋</h2>
           <p class="text-gray-500">Aquí tienes un resumen de lo que está pasando en la clínica hoy.</p>
        </div>
        <div class="flex gap-3">
          <button (click)="store.openModal('new-patient')" class="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition shadow-sm">
            Nuevo Paciente
          </button>
          <button (click)="store.openModal('new-appointment')" class="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition shadow-sm shadow-teal-200">
            Agendar Cita
          </button>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <!-- Card 1 -->
         <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div class="flex items-start justify-between mb-4">
              <div>
                <p class="text-sm font-medium text-gray-500 mb-1">Pacientes Totales</p>
                <h3 class="text-3xl font-bold text-gray-900">{{ store.totalPatients() }}</h3>
              </div>
              <div class="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <app-icon name="users" class="w-5 h-5" />
              </div>
            </div>
            <div class="flex items-center text-xs">
              <span class="text-green-600 font-medium flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full">
                <app-icon name="trending-up" class="w-3 h-3" />
                +{{ store.patients().length }}
              </span>
              <span class="text-gray-400 ml-2">activos</span>
            </div>
         </div>

         <!-- Card 2 -->
         <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div class="flex items-start justify-between mb-4">
              <div>
                <p class="text-sm font-medium text-gray-500 mb-1">Citas Hoy</p>
                <h3 class="text-3xl font-bold text-gray-900">{{ store.todaysAppointments() }}</h3>
              </div>
              <div class="p-2 bg-teal-50 text-teal-600 rounded-lg">
                <app-icon name="calendar" class="w-5 h-5" />
              </div>
            </div>
            <div class="flex items-center text-xs">
              <span class="text-green-600 font-medium flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full">
                <app-icon name="trending-up" class="w-3 h-3" />
                +{{ store.appointments().length }}
              </span>
              <span class="text-gray-400 ml-2">programadas</span>
            </div>
         </div>

         <!-- Card 3 -->
         <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div class="flex items-start justify-between mb-4">
              <div>
                <p class="text-sm font-medium text-gray-500 mb-1">Ingresos Mes</p>
                <h3 class="text-3xl font-bold text-gray-900">14.250 €</h3>
              </div>
              <div class="p-2 bg-purple-50 text-purple-600 rounded-lg">
                <app-icon name="activity" class="w-5 h-5" />
              </div>
            </div>
            <div class="flex items-center text-xs">
              <span class="text-green-600 font-medium flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full">
                <app-icon name="trending-up" class="w-3 h-3" />
                +8%
              </span>
              <span class="text-gray-400 ml-2">vs mes anterior</span>
            </div>
         </div>
         
         <!-- Card 4 -->
         <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div class="flex items-start justify-between mb-4">
              <div>
                <p class="text-sm font-medium text-gray-500 mb-1">Satisfacción</p>
                <h3 class="text-3xl font-bold text-gray-900">98%</h3>
              </div>
              <div class="p-2 bg-yellow-50 text-yellow-600 rounded-lg">
                <app-icon name="shield" class="w-5 h-5" />
              </div>
            </div>
            <div class="flex items-center text-xs">
              <span class="text-gray-400">Basado en 150 reseñas</span>
            </div>
         </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Chart -->
        <div class="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
           <div class="flex items-center justify-between mb-6">
             <h3 class="text-lg font-bold text-gray-900">Rendimiento de la Clínica</h3>
             <div class="flex items-center gap-2">
                <span class="flex items-center gap-1 text-xs text-gray-500"><span class="w-2 h-2 rounded-full bg-teal-500"></span> Pacientes</span>
                <span class="flex items-center gap-1 text-xs text-gray-500"><span class="w-2 h-2 rounded-full bg-blue-500"></span> Citas</span>
             </div>
           </div>
           <div class="h-64 w-full" #chartContainer></div>
        </div>

        <!-- Side List -->
        <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 class="text-lg font-bold text-gray-900 mb-6">Próximas Citas</h3>
          <div class="space-y-4 max-h-[300px] overflow-y-auto">
             @for (appt of store.appointments(); track appt.id) {
               <div class="flex items-center gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                  <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xs font-bold">
                    {{ appt.patientName.substring(0,2).toUpperCase() }}
                  </div>
                  <div class="flex-1">
                    <h4 class="text-sm font-semibold text-gray-900">{{ appt.patientName }}</h4>
                    <p class="text-xs text-gray-500">{{ appt.type }} • {{ appt.time }}</p>
                  </div>
                  <button class="text-gray-400 hover:text-teal-600">
                    <app-icon name="menu" class="w-4 h-4" />
                  </button>
               </div>
             }
          </div>
          <button (click)="store.navigate('calendar')" class="w-full mt-6 py-2 text-sm text-teal-600 font-medium hover:bg-teal-50 rounded-lg transition">
            Ver Agenda Completa
          </button>
        </div>
      </div>
    </div>
  `
})
export class DashboardHomeComponent {
  store = inject(CrmStore);
  chartContainer = viewChild<ElementRef>('chartContainer');

  constructor() {
    afterNextRender(() => {
      this.initChart();
    });
  }

  initChart() {
    const el = this.chartContainer()?.nativeElement;
    if (!el) return;

    // Clear previous
    d3.select(el).selectAll('*').remove();

    const margin = {top: 20, right: 20, bottom: 30, left: 40};
    const width = el.offsetWidth - margin.left - margin.right;
    const height = el.offsetHeight - margin.top - margin.bottom;

    const svg = d3.select(el)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Mock Data for 6 months
    const data = [
      { month: 'Ene', value: 400 },
      { month: 'Feb', value: 450 },
      { month: 'Mar', value: 500 },
      { month: 'Abr', value: 480 },
      { month: 'May', value: 600 },
      { month: 'Jun', value: 650 }
    ];

    const x = d3.scaleBand()
      .range([0, width])
      .padding(0.1);
    
    const y = d3.scaleLinear()
      .range([height, 0]);

    x.domain(data.map(d => d.month));
    y.domain([0, 800]);

    // Add axes
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).tickSize(0))
      .select('.domain').remove();
    
    svg.selectAll('.tick text')
      .attr('fill', '#94a3b8')
      .attr('dy', '15px');

    svg.append('g')
      .call(d3.axisLeft(y).ticks(5).tickSize(-width))
      .select('.domain').remove();

    svg.selectAll('.tick line')
      .attr('stroke', '#f1f5f9');
    
    svg.selectAll('.tick text')
      .attr('fill', '#94a3b8');

    // Line generator
    const line = d3.line<any>()
      .x(d => (x(d.month) || 0) + x.bandwidth() / 2)
      .y(d => y(d.value))
      .curve(d3.curveMonotoneX);

    // Add path
    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#0d9488') // Teal-600
      .attr('stroke-width', 3)
      .attr('d', line);

    // Add area
    const area = d3.area<any>()
      .x(d => (x(d.month) || 0) + x.bandwidth() / 2)
      .y0(height)
      .y1(d => y(d.value))
      .curve(d3.curveMonotoneX);

    svg.append('path')
      .datum(data)
      .attr('fill', 'url(#gradient)')
      .attr('d', area)
      .attr('opacity', 0.1);
    
    // Gradient definition
    const defs = svg.append('defs');
    const gradient = defs.append('linearGradient')
      .attr('id', 'gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');
    
    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#0d9488')
      .attr('stop-opacity', 1);
      
    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#0d9488')
      .attr('stop-opacity', 0);
  }
}
