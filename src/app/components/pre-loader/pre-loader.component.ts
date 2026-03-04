import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-pre-loader',
  standalone: true,
  imports: [NgFor],
  templateUrl: './pre-loader.component.html',
  styleUrl: './pre-loader.component.scss'
})
export class PreLoaderComponent implements OnInit {
  letters = 'SRIKANTH'.split('');
  ngOnInit() {
    document.body.style.overflow='hidden';
  }
}