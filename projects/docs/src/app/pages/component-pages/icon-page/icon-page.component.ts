import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-icon-page',
  templateUrl: './icon-page.component.html',
  styleUrls: ['./icon-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
