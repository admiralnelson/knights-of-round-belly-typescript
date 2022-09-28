/* eslint-disable */
/// <reference path="wahammer-header.d.ts" />

declare function find_uicomponent(parentComponent?: IUIComponent, ...componentNames: string[]): IUIComponent

interface IUIComponent {
    /** Returns the number of images associated with the subject uicomponent. */
    NumImages(): number
    /** Returns the path of an image associated with the subject uicomponent. The image is specified by a 0-based index. */
    GetImagePath(index?: number): string
    /**
     * 
     * Sets a new image path for an image associated with the uicomponent, replacing the original image with something new. Multiple images can be associated with a uicomponent - the index of the image to overwrite can be set with the second parameter or by setting a "script_icon_index" user property on the uicomponent with uicomponent:SetProperty. If an index value is not set with either of these methods then the first image, image 0, is swapped.
     * The uicomponent:GetImagePath and uicomponent:NumImages functions can be used to query images related to a uicomponent.
     */
    SetImagePath(imagePath: string, imageIndex?: number, resize?: boolean): void
    /**
     * 
     * Sets the text on the current state of the uicomponent to the supplied text. 
     * Localised text must be specified - common.get_localised_string can be used to look this up from anywhere in the database.
     */
    SetStateText(localisedText: string, textSource: string): void
    /**
     * Returns the text on the current state of the uicomponent along with its dimensions. This text will be localised.
     * */
    GetStateText(): [localisedUicomponentText: string, stringtableKey: string]
}