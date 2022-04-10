import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TestAction } from './unity.action';

@Component({
  selector: 'app-unity',
  templateUrl: './unity.component.html',
  styleUrls: ['./unity.component.scss'],
})
export class UnityComponent implements AfterViewInit, OnDestroy {
  @Input() public path: string;

  public instance: {
    SendMessage: (
      objectName: string,
      methodName: string,
      value?: string | number
    ) => {};
    SetFullscreen: (value: number) => {};
  };

  private scriptEl: HTMLScriptElement;

  private config: any;

  @ViewChild('container') private container: ElementRef<HTMLDivElement>;
  @ViewChild('canvas') private canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('loading') private loading: ElementRef<HTMLDivElement>;
  @ViewChild('banner') private banner: ElementRef<HTMLDivElement>;
  @ViewChild('progress') private progress: ElementRef<HTMLDivElement>;
  @ViewChild('fullscreenButton') private button: ElementRef<HTMLButtonElement>;

  constructor(@Inject(DOCUMENT) private doc) {}

  public ngAfterViewInit(): void {
    this.setConfig();
    this.createScript();

    const xx = new TestAction('asd');
  }

  public ngOnDestroy(): void {
    this.removeScriptIfExitsts();
  }

  public fullScreen(value: boolean): void {
    this.instance.SetFullscreen(value ? 1 : 0);
  }

  private removeScriptIfExitsts(): void {
    if (this.scriptEl) {
      this.doc.head.removeChild(this.scriptEl);
    }
  }

  private createScript(): void {
    this.scriptEl = this.doc.createElement('script');
    this.scriptEl.src = `assets/${this.path}/Build/${this.path}.loader.js`;
    this.scriptEl.onload = () => {
      createUnityInstance(
        this.canvas.nativeElement,
        this.config,
        (progress) => {
          this.progress.nativeElement.style.width = 100 * progress + '%';
        }
      )
        .then((unityInstance) => {
          this.instance = unityInstance;
          console.log(this.instance);
          this.loading.nativeElement.style.display = 'none';
        })
        .catch((message) => {
          alert(message);
        });
    };
    this.doc.body.appendChild(this.scriptEl);
  }

  private setConfig(): void {
    this.config = {
      dataUrl: `assets/${this.path}/Build/${this.path}.data`,
      frameworkUrl: `assets/${this.path}/Build/${this.path}.framework.js`,
      codeUrl: `assets/${this.path}/Build/${this.path}.wasm`,
      streamingAssetsUrl: 'StreamingAssets',
      companyName: 'DefaultCompany',
      productName: 'Angular',
      productVersion: '0.1',
      showBanner: (msg, type) => this.showBanner(msg, type),
    };
  }

  private showBanner(msg: string, type: 'error' | 'warning'): void {
    const updateBannerVisibility = () => {
      this.banner.nativeElement.style.display = this.banner.nativeElement
        .children.length
        ? 'block'
        : 'none';
    };
    var div = document.createElement('div');
    div.innerHTML = msg;
    this.banner.nativeElement.appendChild(div);
    if (type == 'error') {
      // @ts-ignore
      div.style = 'background: red; padding: 10px;';
    } else {
      if (type == 'warning')
        // @ts-ignore
        div.style = 'background: yellow; padding: 10px;';
      setTimeout(() => {
        this.banner.nativeElement.removeChild(div);
        updateBannerVisibility();
      }, 5000);
    }
    updateBannerVisibility();
  }
}
