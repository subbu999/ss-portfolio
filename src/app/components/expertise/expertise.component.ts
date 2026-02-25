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
    //  Leadership Anim
    trigger('sideReveal', [
  state('hiddenLeft', style({
    opacity: 0,
    transform: 'translateX(-60px)'
  })),
  state('hiddenRight', style({
    opacity: 0,
    transform: 'translateX(60px)'
  })),
  state('visible', style({
    opacity: 1,
    transform: 'translateX(0)'
  })),
  transition('* => visible', [
    animate('1500ms cubic-bezier(.22,1,.36,1)')
  ])
]),
    //  Heading animation
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
  @ViewChildren('capRef') capabilities!: QueryList<ElementRef>;

  headingVisibility: boolean[] = [];
  cardVisibility: boolean[] = [];
  capVisibility: boolean[] = [];

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
  leadershipList = [
    { title: 'Strategy Planning & Execution', icon: 'bi-bullseye' },
    { title: 'Budget Management & P&L', icon: 'bi-currency-dollar' },
    { title: 'Stakeholder Management', icon: 'bi-people' },
    { title: 'Onsite-Offshore Coordination', icon: 'bi-layers' },
    { title: 'Project Sales & Delivery', icon: 'bi-rocket' },
    { title: 'Resource & Risk Management', icon: 'bi-shield-check' }
  ];


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
          }

          if (type === 'cap') {
            this.capVisibility[index] = true;
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

  // Observe leadership cards
  this.capabilities.forEach((el, i) => {
    el.nativeElement.setAttribute('data-index', i);
    el.nativeElement.setAttribute('data-type', 'cap');
    observer.observe(el.nativeElement);
  });

}


  
}
