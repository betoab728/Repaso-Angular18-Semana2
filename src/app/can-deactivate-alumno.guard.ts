import { CanDeactivateFn } from '@angular/router';

export const canDeactivateAlumnoGuard: CanDeactivateFn<unknown> = (component: any, currentRoute, currentState, nextState) => {

   // Verifica si el componente tiene un método canDeactivate
   if (component.canDeactivate) {
    return component.canDeactivate();
  }

  return true;  // Si no tiene el método, permite la navegación
};
