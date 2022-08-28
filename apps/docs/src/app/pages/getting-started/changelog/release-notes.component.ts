import { ChipComponent } from '@anglify/components';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, SecurityContext } from '@angular/core';
import { MarkdownModule, MarkdownService, SECURITY_CONTEXT } from 'ngx-markdown';

export interface Release {
  body: string;
  created_at: number;
  tag_name: number;
  html_url: string;
  prerelease: boolean;
}

@Component({
  selector: 'app-changelog',
  standalone: true,
  templateUrl: './release-notes.component.html',
  styleUrls: ['./release-notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgForOf, NgIf, AsyncPipe, ChipComponent, HttpClientModule, MarkdownModule],
  providers: [MarkdownService, { provide: SECURITY_CONTEXT, useValue: SecurityContext.STYLE }],
})
export class ReleaseNotesComponent {
  public releases$ = this.httpClient.get<Release[]>('https://api.github.com/repos/valentingavran/anglify/releases');

  public constructor(private readonly httpClient: HttpClient) {}
}
