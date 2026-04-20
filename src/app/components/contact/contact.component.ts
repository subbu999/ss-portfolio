import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations:[
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
export class ContactComponent {
  @ViewChildren('headingEl') headings!: QueryList<ElementRef>;

  headingVisibility: boolean[] = [];
  

  form!: FormGroup;

  constructor(private fb: FormBuilder, private http:HttpClient) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {

    // 🔹 Observe Headings Individually
this.headings.forEach((heading, index) => {

  this.headingVisibility[index] = false;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {

        setTimeout(() => {
          this.headingVisibility[index] = true;
        }, index * 250); // slower stagger for elegance

        observer.disconnect();
      }
    },
    { threshold: 0.5 }
  );

  observer.observe(heading.nativeElement);
});
    
  }

  submit(): void {
    
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = new FormData();

  formData.append('access_key', 'YOUR_ACCESS_KEY'); 
  formData.append('name', this.form.value.name);
  formData.append('email', this.form.value.email);
  formData.append('message', this.form.value.message);
  formData.append('subject', 'New Portfolio Contact Message');

  this.http.post('https://api.web3forms.com/submit', formData)
    .subscribe({
      next: () => {
        alert('Message sent successfully');
        this.form.reset();
      },
      error: () => {
        alert('Something went wrong');
      }
    });
  }
}