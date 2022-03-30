import { Component, OnInit, ViewChild } from '@angular/core';
import { UnityComponent } from './unity/unity.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('unity') unity: UnityComponent;
  public addDesk(): void {
    this.unity.instance.SendMessage('Director', 'addDesk');
  }
}
