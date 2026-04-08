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
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.scss', 
  animations:[
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
    ]),
    // Card Animations
    trigger('cardReveal', [
  state('hidden', style({
    opacity: 0,
    transform: 'rotateY(-90deg)',
    transformOrigin: 'center'
  })),
  state('visible', style({
    opacity: 1,
    transform: 'rotateY(0deg)',
    transformOrigin: 'center'
  })),
  transition('hidden => visible', [
    animate(
      '1000ms cubic-bezier(.22,1,.36,1)'
    )
  ])
])
  ]
})
export class CertificationsComponent {
    @ViewChildren('headingEl') headings!: QueryList<ElementRef>;
    @ViewChildren('cardRef') cards!: QueryList<ElementRef>;
  headingVisibility: boolean[] = [];
  cardVisibility: boolean[] = [];

  serviceNowCerts = [
    { code: 'CAD', title: 'Certified Application Developer' },
    { code: 'CSA', title: 'Certified System Administrator' },
    { code: 'CIS-DF', title: 'CIS — Discovery Fundamentals' },
    { code: 'CIS-ITSM', title: 'CIS — IT Service Management' },
    { code: 'CIS-HRSD', title: 'CIS — HR Service Delivery' },
    { code: 'CIS-ITOM', title: 'IT Operational Management' }
  ];

  microsoftCerts = [
    { code: 'MCPA', title: 'Microsoft Certified Power Automate' },
    { code: 'MCP', title: 'Microsoft Certified Professional' }
  ];
  awsCerts = [{ code: 'ASAA', title: 'AWS Certified Solutions Architect Associate' }];
  agileCerts = [
    { code: 'CSM', title: 'Certified Scrum Master' },
    { code: 'ITIL', title: 'Certified ITIL V 4 Specialist' },
    { code: 'PMP', title: 'PMP certified Project Manager' }
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

          observer.unobserve(entry.target);
        }

      });

    },
    { threshold: 1 }
  );

  // Observe headings
  this.headings.forEach((el, i) => {
    this.headingVisibility[i]=false;
    el.nativeElement.setAttribute('data-index', i);
    el.nativeElement.setAttribute('data-type', 'heading');
    observer.observe(el.nativeElement);
  });
  // Observe cert cards
  this.cards.forEach((el, i) => {
    el.nativeElement.setAttribute('data-type', 'card');
    observer.observe(el.nativeElement);
  });
  
  }
  }

