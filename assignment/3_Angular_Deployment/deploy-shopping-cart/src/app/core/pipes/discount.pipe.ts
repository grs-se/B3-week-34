import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
})
export class DiscountPipe extends CurrencyPipe implements PipeTransform {
  private readonly discount: number = 0.9;

  override transform(
    value: string | number,
    currencyCode?: string,
    display?: string | boolean,
    digitsInfo?: string,
    locale?: string
  ): string | null;
  override transform(
    value: null | undefined,
    currencyCode?: string,
    display?: string | boolean,
    digitsInfo?: string,
    locale?: string
  ): null;
  override transform(
    value: string | number | null | undefined,
    currencyCode?: string,
    display?: string | boolean,
    digitsInfo?: string,
    locale?: string
  ): string | null {
    if (value === null || value === undefined) {
      return null;
    }
    const discounted =
      typeof value === 'number'
        ? value * this.discount
        : typeof value === 'string' && !isNaN(Number(value))
        ? Number(value) * this.discount
        : value;
    return super.transform(
      discounted,
      currencyCode,
      display,
      digitsInfo,
      locale
    );
  }
}
