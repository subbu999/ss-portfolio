import {
  Component,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.scss',
  animations: [
    trigger('cardReveal', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(80px) scale(0.98)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0) scale(1)'
      })),
      transition('hidden => visible', [
        animate(
          '900ms cubic-bezier(.22,1,.36,1)'
        )
      ])
    ]),  
    
    //  Heading animation
    trigger('headingAnim', [
  state('hidden', style({
    opacity: 0,
    transform: 'translateY(15px)'
  })),
  state('visible', style({
    opacity: 1,
    transform: 'translateY(0)'
  })),
  transition('hidden => visible', [
    animate('800ms cubic-bezier(.22,1,.36,1)')
  ])
])
  ]
})
export class AchievementsComponent {
@ViewChildren('headingEl') headings!: QueryList<ElementRef>;
@ViewChildren('cardRef') cards!: QueryList<ElementRef>;

  headingVisibility: boolean[] = [];
  cardVisibility: boolean[] = [];
  achievementsList = [
    {
      title: 'Projects Delivered Annually',
      subtitle: 'Across multiple domains',
      number: 35
    },
    {
      title: 'Teams Led Simultaneously',
      subtitle: 'Cross-functional & global',
      number: 8
    },
    {
      title: 'Years of Experience',
      subtitle: 'Continuous growth',
      number: 16
    },
    {
      title: 'Industry Domains',
      subtitle: 'Deep expertise',
      number: 6
    },
    {
      title: 'Certifications',
      subtitle: 'ServiceNow & Agile',
      number: 10
    },
    {
      title: 'Projects Delivered',
      subtitle: 'End-to-end execution',
      number: 100
    }
  ];
  counters: number[] = this.achievementsList.map(() => 0);

ngAfterViewInit(): void {

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach(entry => {

        const index = Number(entry.target.getAttribute('data-index'));
        const type = entry.target.getAttribute('data-type');

        if (entry.isIntersecting) {

          if (type === 'heading') {
            setTimeout(() => {
          this.headingVisibility[index] = true;
        }, index * 250);
          }

          if (type === 'card') {
            this.cardVisibility[index] = true;
            this.animateCounter(index, this.achievementsList[index].number, 1000);
          }
          
          observer.unobserve(entry.target);
        }
      });

    },
    { threshold: 0.2 }
  );

  // Observe headings
  this.headings.forEach((el, i) => {
    this.headingVisibility[i]=false;
    el.nativeElement.setAttribute('data-index', i);
    el.nativeElement.setAttribute('data-type', 'heading');
    observer.observe(el.nativeElement);
  });

  // Observe expertise cards
  this.cards.forEach((el, i) => {
    el.nativeElement.setAttribute('data-index', i);
    el.nativeElement.setAttribute('data-type', 'card');
    observer.observe(el.nativeElement);
  });
}

private animateCounter(index: number, target: number, duration: number) {
  const startTime = performance.now();

  const step = (currentTime: number) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const value = Math.floor(progress * target);

    this.counters[index] = value;

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
}

}
  