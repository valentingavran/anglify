export class Renderer2Mock {
  public createElement(element: string) {
    return document.createElement(element);
  }

  public appendChild(a: HTMLElement, b: HTMLElement) {
    a.append(b);
  }

  public removeChild(_: HTMLElement, b: HTMLElement) {
    b.remove();
  }
}
