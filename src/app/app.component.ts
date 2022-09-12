import { Component, DoCheck, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements DoCheck {
  ngDoCheck() {
    console.count('checked');
  }
}
