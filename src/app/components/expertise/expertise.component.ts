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
  selector: 'app-expertise',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expertise.component.html',
  styleUrls: ['./expertise.component.scss'],
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
export class ExpertiseComponent implements AfterViewInit {
  @ViewChildren('headingEl') headings!: QueryList<ElementRef>;
  @ViewChildren('cardRef') cards!: QueryList<ElementRef>;

  headingVisibility: boolean[] = [];
  cardVisibility: boolean[] = [];

  expertiseList = [
    {
      title: 'Financial Services',
      subtitle: 'Banking, Insurance & FinTech solutions',
      icon: 'bi-bank'
    },
    {
      title: 'Healthcare',
      subtitle: 'Hospital systems & patient management',
      icon: 'bi-heart'
    },
    {
      title: 'Retail & E-Commerce',
      subtitle: 'Omnichannel & supply chain platforms',
      icon: 'bi-cart'
    },
    {
      title: 'Government',
      subtitle: 'Public sector digital transformation',
      icon: 'bi-building'
    },
    {
      title: 'Pharma & Life Sciences',
      subtitle: 'Regulatory & R&D management',
      icon: 'bi-capsule'
    },
    {
      title: 'Global Enterprises',
      subtitle: 'Multi-geography operations',
      icon: 'bi-globe'
    }
  ];

  ngAfterViewInit(): void {

    requestAnimationFrame(() => {

      this.cards.forEach((card, index) => {

        this.cardVisibility[index] = false;

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              this.cardVisibility[index] = true;
              observer.unobserve(card.nativeElement);
            }
          },
          { threshold: 0.2 }
        );

        observer.observe(card.nativeElement);
      });

    });
    
    this.headings.forEach((item, index) => {

      this.headingVisibility[index] = false;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {

            setTimeout(() => {
              this.headingVisibility[index] = true;
            }, 120);

            observer.disconnect();
          }
        },
        { threshold: 0.35 }
      );

      observer.observe(item.nativeElement);
    });
  }

  
}
