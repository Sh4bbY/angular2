import { NgModule } from '@angular/core';
import {
    A11yModule,
    CompatibilityModule,
    MdAutocompleteModule, MdButtonModule, MdButtonToggleModule, MdCardModule,
    MdCheckboxModule, MdChipsModule, MdDialogModule, MdGridListModule, MdIconModule, MdInputModule, MdListModule,
    MdMenuModule, MdProgressBarModule, MdProgressSpinnerModule, MdRadioModule, MdRippleModule, MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule, ObserveContentModule,
    OverlayModule, PlatformModule,
    PortalModule, RtlModule, StyleModule,
} from '@angular/material';

const MATERIAL_MODULES = [
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdChipsModule,
    MdCheckboxModule,
    MdDialogModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
    OverlayModule,
    PortalModule,
    RtlModule,
    StyleModule,
    A11yModule,
    PlatformModule,
    CompatibilityModule,
    ObserveContentModule,
];

@NgModule({
    imports: MATERIAL_MODULES,
    exports: MATERIAL_MODULES,
})
export class MaterialModule {
}
