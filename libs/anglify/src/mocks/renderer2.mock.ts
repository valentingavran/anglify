export class Renderer2Mock {
  public createElement(element: string): HTMLElement {
    return document.createElement(element);
  }

  public appendChild(a: HTMLElement, b: HTMLElement) {
    a.append(b);
  }

  public removeChild(a: HTMLElement, b: HTMLElement) {
    a.removeChild(b);
  }
}
