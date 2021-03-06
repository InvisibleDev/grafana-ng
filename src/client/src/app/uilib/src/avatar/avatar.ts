import { Component, Input } from '@angular/core';
import { AvatarHelper } from 'common';

@Component({
  selector: 'ed-avatar',
  template:`
    <div class="ed-flex">
      <img [src]="url" [ngClass]="{'round': round}" [width]="size" height="[size]"  >
    </div>`,
  styles: [`
    .round{
      border-radius: 50%;
    }`]
})
export class AvatarComponent {
  private _key: string;
  private _url: string;

  @Input() round: boolean = true;
  @Input() size: number = 25;

  get key():string{
    return this._key;
  }

  get url():string{
    return this._url;
  }

  @Input() set url( u: string ){
    this._url = u;
  }

  @Input() set key( e: string ){
    this._key = e;
    this.url = AvatarHelper.getUrl( e );
  }
}

