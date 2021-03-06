import { Component, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActionSheetComponent, ActionSheetConfig, ActionSheetMenuItem, ActionSheetService } from 'ngx-weui/actionsheet';
import { SkinType } from 'ngx-weui/core';

@Component({
  selector: 'example-actionsheet',
  templateUrl: './actionsheet.component.html',
  styleUrls: ['./actionsheet.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DemoActionSheetComponent implements OnDestroy {
  @ViewChild('ios', { static: true }) iosAS: ActionSheetComponent;
  @ViewChild('android', { static: true }) androidAS: ActionSheetComponent;
  @ViewChild('auto', { static: true }) autoAS: ActionSheetComponent;

  menus: ActionSheetMenuItem[] = [
    { text: '菜单一', value: 'test', other: 1 },
    { text: '菜单三', value: 'test' },
    { text: '负向菜单', type: 'warn' },
  ];
  config: ActionSheetConfig = {
    title: '这是一段标题',
  } as ActionSheetConfig;

  constructor(private srv: ActionSheetService) {}

  onShow(type: SkinType) {
    this.config.skin = type;
    this.config = { ...this.config };
    setTimeout(() => {
      ((this as any)[`${type}AS`] as ActionSheetComponent).show().subscribe((res: any) => {
        console.log('type', res);
      });
    }, 10);
  }

  onShowBySrv(type: SkinType, backdrop: boolean = true) {
    this.config.skin = type;
    this.config.backdrop = backdrop;
    this.srv.show(this.menus, this.config).subscribe((res: any) => {
      console.log(res);
    });
  }

  ngOnDestroy() {
    this.srv.destroyAll();
  }
}
