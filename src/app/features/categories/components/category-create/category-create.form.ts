import { FormControl } from '@angular/forms';


/**
 * This provides the Typed Reactive Form definition for creating the Category.
 * It is used by the Category-Create component.
 * It gives compile-time type-safety for the form elements.
 */
export interface CategoryCreateForm {

    /** Category Name */
    name: FormControl<string>;


    /** Category Description (optional) */
    description: FormControl<string | null>;

}
