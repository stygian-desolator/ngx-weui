import { DOCUMENT } from '@angular/common';
import { ApplicationRef, ComponentFactoryResolver, Inject, Injectable, Injector } from '@angular/core';
import { BaseService } from 'ngx-weui/core';
import { Observable } from 'rxjs';
import { DialogComponent } from './dialog.component';
import { DialogConfig } from './dialog.config';

@Injectable({ providedIn: 'root' })
export class DialogService extends BaseService {
  constructor(
    protected readonly resolver: ComponentFactoryResolver,
    protected readonly applicationRef: ApplicationRef,
    protected readonly injector: Injector,
    @Inject(DOCUMENT) protected readonly doc: any,
  ) {
    super();
  }

  /**
   * 创建一个对话框并显示
   *
   * @param data 对话框配置项
   * @returns 可订阅来获取结果
   */
  show(data: DialogConfig): Observable<any> {
    const componentRef = this.build(DialogComponent);

    componentRef.instance.config = data;
    componentRef.instance.close.subscribe(() => {
      setTimeout(() => this.destroy(componentRef), 300);
    });
    return componentRef.instance.show();
  }
}
