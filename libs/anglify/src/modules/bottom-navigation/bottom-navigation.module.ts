import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BottomNavigationComponent } from './bottom-navigation.component';
import { BottomNavigationItemComponent } from './components/bottom-navigation-item/bottom-navigation-item.component';
import { AnglifyCommonModule } from '../common/anglify-common.module';

@NgModule({
  declarations: [BottomNavigationComponent, BottomNavigationItemComponent],
  imports: [CommonModule, AnglifyCommonModule],
  exports: [BottomNavigationComponent, AnglifyCommonModule, BottomNavigationItemComponent],
})
export class BottomNavigationModule {}
