import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    if (!value) {
      return '未知时间';
    }

    const inputTime = new Date(value).getTime();
    const now = Date.now();

    const diffInSeconds = Math.floor((now - inputTime) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInSeconds < 60) {
      return '刚刚';
    }

    if (diffInMinutes < 60) {
      return `${diffInMinutes} 分钟前`;
    }

    if (diffInHours < 24) {
      return `${diffInHours} 小时前`;
    }

    if (diffInDays < 30) {
      return `${diffInDays} 天前`;
    }

    if (diffInMonths < 12) {
      return `${diffInMonths} 个月前`;
    }

    return `${diffInYears} 年前`;
  }
}
