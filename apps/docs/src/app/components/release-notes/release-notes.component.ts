import { ChipComponent } from '@anglify/components';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MarkdownPipe } from '../../pipes/markdown.pipe';

export interface Release {
  body: string;
  created_at: number;
  tag_name: number;
  html_url: string;
  prerelease: boolean;
}

@Component({
  standalone: true,
  imports: [NgForOf, ChipComponent, AsyncPipe, HttpClientModule, NgIf, MarkdownPipe],
  templateUrl: './release-notes.component.html',
  styleUrls: ['./release-notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReleaseNotesComponent {
  public releases$ = this.httpClient.get<Release[]>('https://api.github.com/repos/valentingavran/anglify/releases');

  public constructor(private readonly httpClient: HttpClient) {}
}
