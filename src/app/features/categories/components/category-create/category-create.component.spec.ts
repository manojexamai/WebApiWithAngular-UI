import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';

import { CategoryCreateComponent } from './category-create.component';
import { CategoryService } from '../../services/category.service';


describe('CategoryCreateComponent', () => {

    let component: CategoryCreateComponent;
    let fixture: ComponentFixture<CategoryCreateComponent>;

    let router: Router;

    let categoryServiceMock: {
        create: ReturnType<typeof vi.fn>;
    };


    beforeEach(async () => {

        categoryServiceMock = {
            create: vi.fn()
        };

        await TestBed.configureTestingModule({
            imports: [CategoryCreateComponent],
            providers: [
                provideRouter([]),
                {
                    provide: CategoryService,
                    useValue: categoryServiceMock
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(CategoryCreateComponent);
        component = fixture.componentInstance;

        router = TestBed.inject(Router);

        fixture.detectChanges();
    });



    // ----- Test #1 - Component should be created.
    //                 Checks the Angular TestBed.
    it('should create the component', () => {

        expect(component).toBeTruthy();

    });


    // ----- Test #2 - Form should be invalid if category name is empty.
    //                 Checks validation logic in the Reactive Form.
    it('should require category name', () => {

        component.categoryForm.controls.name.setValue('');

        expect(component.categoryForm.invalid).toBe(true);

    });


    // ----- Test #3 - Should call API and navigate after successful creation.
    //                 Checks that the service call, mocking the dependencies, and navigation logic works as expected.
    it('should call API and navigate on successful submit', () => {

        const navigateSpy = vi.spyOn(router, 'navigate');

        categoryServiceMock.create.mockReturnValue(of(undefined));

        component.categoryForm.controls.name.setValue('Electronics');
        component.categoryForm.controls.description.setValue('Devices');

        component.onSubmit();

        expect(categoryServiceMock.create).toHaveBeenCalled();

        expect(navigateSpy).toHaveBeenCalledWith(['/categories']);

    });


    // ----- Test #4 - Should display validation errors returned by API.
    //                 Checks the component correctly handles and displays validation errors from the API,
    //                 by mocking the service to throw an error.   
    it('should handle validation errors returned by API', () => {

        const validationError = {
            error: {
                errors: {
                    Name: ['Category name already exists']
                }
            }
        };

        categoryServiceMock.create.mockReturnValue(
            throwError(() => validationError)
        );

        // Simulate user input in the form.
        // - Provide value to name, since name cannot be empty.
        component.categoryForm.controls.name.setValue('Electronics');

        // Submit the form to trigger the API call from the mocked service, to throw the validation error.
        component.onSubmit();

        // Check that the validation error is set on the component.
        expect(component.validationErrors['Name'][0])
            .toBe('Category name already exists');

    });

});
