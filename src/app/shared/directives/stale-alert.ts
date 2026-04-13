import { Directive, ElementRef, input, inject, Renderer2, effect } from '@angular/core';

@Directive({
  selector: '[appStaleAlert]',
})
export class StaleAlert {
  // 使用 alias 允许我们在 HTML 中直接写 [appStaleAlert]="contact.date"
  lastContactDate = input.required<string>({ alias: 'appStaleAlert' });

  // 注入 DOM 元素和渲染器
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  constructor() {
    effect(() => {
      const lastContactString = this.lastContactDate();
      if (!lastContactString) {
        return;
      }

      const lastContactDate = new Date(lastContactString).getTime();
      const now = new Date().getTime();
      const diffDays = (now - lastContactDate) / (1000 * 60 * 60 * 24);

      if (diffDays > 30) {
        this.renderer.addClass(this.el.nativeElement, 'ring-2');
        this.renderer.addClass(this.el.nativeElement, 'ring-red-400');
        this.renderer.addClass(this.el.nativeElement, 'bg-red-50');
      } else {
        this.renderer.removeClass(this.el.nativeElement, 'ring-2');
        this.renderer.removeClass(this.el.nativeElement, 'ring-red-400');
        this.renderer.removeClass(this.el.nativeElement, 'bg-red-50');
      }
    })
  }
}
