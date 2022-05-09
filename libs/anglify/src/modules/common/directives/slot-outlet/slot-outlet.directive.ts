import { Directive, EmbeddedViewRef, Input, OnChanges, SimpleChange, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[anglifySlotOutlet]',
})
export class SlotOutletDirective implements OnChanges {
  private viewRef: EmbeddedViewRef<any> | null = null;

  @Input() public anglifySlotOutlet: TemplateRef<any> | undefined;
  @Input() public anglifySlotOutletContext: Record<string, unknown> | null = null;

  public constructor(private readonly viewContainerRef: ViewContainerRef, private readonly templateRef: TemplateRef<any>) {}

  public ngOnChanges(changes: { anglifySlotOutlet?: SimpleChange; anglifySlotOutletContext?: SimpleChange }) {
    if (changes.anglifySlotOutlet) {
      if (this.viewRef) {
        this.viewContainerRef.remove(this.viewContainerRef.indexOf(this.viewRef));
      }

      if (this.anglifySlotOutlet) {
        this.viewRef = this.viewContainerRef.createEmbeddedView(this.anglifySlotOutlet, this.anglifySlotOutletContext);
      } else {
        this.viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef, this.anglifySlotOutletContext);
      }
    } else if (this.viewRef && changes.anglifySlotOutletContext && this.anglifySlotOutletContext) {
      this.viewRef.context = this.anglifySlotOutletContext;
    }
  }
}
