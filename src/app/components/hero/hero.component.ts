import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  animations: [
    trigger('fadeScale', [
      state('visible', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      state('hidden', style({
        opacity: 0,
        transform: 'scale(0.9)'
      })),
      transition('visible <=> hidden', animate('400ms ease-in-out'))
    ]),
    trigger('fadeUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class HeroComponent {

  imageVisible = true;

  @HostListener('window:scroll')
  onScroll() {
    this.imageVisible = window.scrollY < 120;
  }
}
