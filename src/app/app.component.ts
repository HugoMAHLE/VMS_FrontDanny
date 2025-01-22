import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import ZebraBrowserPrintWrapper from 'zebra-browser-print-wrapper';
import {
  bootstrapApplication,
  provideClientHydration,
} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'VMS_MAIN';
}

bootstrapApplication(AppComponent, {
  providers: [provideClientHydration()]
});
