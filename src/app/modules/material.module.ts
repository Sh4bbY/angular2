import { NgModule } from '@angular/core';
import * as material from '@angular/material';
import 'hammerjs';

const MATERIAL_MODULES = [
    material.MdAutocompleteModule,
    material.MdButtonModule,
    material.MdButtonToggleModule,
    material.MdCardModule,
    material.MdChipsModule,
    material.MdCheckboxModule,
    material.MdDialogModule,
    material.MdGridListModule,
    material.MdIconModule,
    material.MdInputModule,
    material.MdListModule,
    material.MdMenuModule,
    material.MdProgressBarModule,
    material.MdProgressSpinnerModule,
    material.MdRadioModule,
    material.MdRippleModule,
    material.MdSelectModule,
    material.MdSidenavModule,
    material.MdSliderModule,
    material.MdSlideToggleModule,
    material.MdSnackBarModule,
    material.MdTabsModule,
    material.MdToolbarModule,
    material.MdTooltipModule,
    material.OverlayModule,
    material.PortalModule,
    material.RtlModule,
    material.StyleModule,
    material.A11yModule,
    material.PlatformModule,
    material.CompatibilityModule,
    material.ObserveContentModule,
];

@NgModule({
    imports: MATERIAL_MODULES,
    exports: MATERIAL_MODULES,
})
export class MaterialModule {
}
