import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';

export interface Release {
  body: string;
  created_at: number;
  tag_name: number;
  html_url: string;
  prerelease: boolean;
}

@Component({
  selector: 'app-changelog',
  templateUrl: './release-notes.component.html',
  styleUrls: ['./release-notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReleaseNotesComponent {
  public releases$ = this.httpClient.get<Release[]>('https://api.github.com/repos/valentingavran/anglify/releases');

  public constructor(private readonly httpClient: HttpClient) {}
}
