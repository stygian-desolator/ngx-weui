import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { InputNumber } from 'ngx-weui/core';

/**
 * 单元格滑块
 */
@Directive({
  selector: '[weui-swipe]',
  exportAs: 'weuiSwipe',
  host: {
    '(touchstart)': 'onTouchStart($event)',
    '(touchmove)': 'onTouchMove($event)',
    '(touchend)': 'onTouchEnd($event)',
    '(touchcancel)': 'onTouchEnd($event)',
  },
})
export class SwipeDirective implements OnInit {
  private curX: number = 0;
  private opend: boolean = false;
  private swipeEl: HTMLElement;

  /**
   * 右边滑动宽度（单位：px），默认：`68`
   */
  @Input('weui-width') @InputNumber() width: number = 68;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const el = this.el.nativeElement;
    this.swipeEl = el.querySelector('.weui-cell__bd') as HTMLElement;
    if (!this.swipeEl) {
      this.width = 0;
    } else {
      this.setPos(0);
      this.swipeEl.style.transition = 'transform .3s';
    }
  }

  private setPos(x: number): void {
    this.swipeEl.style.transform = `translateX(-${x}px)`;
  }

  private getTouch(ev: TouchEvent): Touch {
    return ev.touches[0] || ev.changedTouches[0];
  }

  onTouchStart($event: TouchEvent): void {
    this.curX = this.getTouch($event).pageX;
  }

  onTouchMove($event: TouchEvent): void {
    let newX = this.curX - this.getTouch($event).pageX;
    if (this.opend) {
      newX = newX > 0 ? this.width : this.width - Math.abs(newX);
    } else {
      newX = newX > this.width ? this.width : newX;
    }

    this.setPos(newX <= 0 ? 0 : newX);
  }

  onTouchEnd($event: TouchEvent): void {
    let newX = Math.abs(this.curX - this.getTouch($event).pageX);
    if (newX === 0) {
      return;
    }
    if (this.opend) {
      newX = this.width - newX;
    }
    // 当移动超过一半都视为打开
    if (newX > 0 && newX > +this.width / 2) {
      this.opend = true;
      this.setPos(this.width);
    } else {
      this.opend = false;
      this.setPos(0);
    }
  }
}
