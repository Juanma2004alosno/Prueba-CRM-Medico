
import { Component, output } from '@angular/core';
import { AppIcon } from './icons.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [AppIcon],
  template: `
    <div class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <!-- Backdrop with blur -->
      <div class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity"></div>

      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <!-- Modal Panel -->
        <div class="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-gray-100">
          
          <div class="absolute right-4 top-4">
            <button (click)="close.emit()" class="text-gray-400 hover:text-gray-500 transition">
              <app-icon name="menu" class="w-5 h-5 rotate-45" /> <!-- Using menu as X for now since simple close icon wasn't in list, or reused logic -->
            </button>
          </div>

          <div class="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <ng-content></ng-content>
          </div>
          
        </div>
      </div>
    </div>
  `
})
export class ModalComponent {
  close = output<void>();
}
