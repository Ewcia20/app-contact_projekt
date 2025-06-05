import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacts-search',
  templateUrl: './contacts-search.component.html',
  styleUrl: './contacts-search.component.scss',
})
export class ContactsSearchComponent {

  @Output() searchTest: (new () => EventEmitter<string>) | undefined;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildReactiveFormSearch();
  }

  searchForm: any;
  surname: any;

  protected hideBack = true;

  searchOptions: any = [
    { value: 'surname', viewValue: 'Nazwisko' },
    { value: 'firstname', viewValue: 'Imię' },
    { value: 'city', viewValue: 'Miasto' },
  ];

  errorBack: boolean = false;
  buildReactiveFormSearch() {
    const searchPattern: string | RegExp = '^[A-ż]{2,50}$';

    this.searchForm = this.fb.group({
      searchData: [
        '',
        [Validators.required, Validators.pattern(searchPattern)],
      ],
      searchText: [
        '',
        [Validators.required, Validators.pattern(searchPattern)],
      ],
    });
    // [Validators.required, Validators.pattern(searchPattern)]
  }

  searchContacts() {
    this.hideBack = false;

    const data = this.searchForm.value;

    this.searchForm.reset();
  }
  clearSearch() {
    this.hideBack = true;
    this.searchForm.reset();
    ['searchText', 'searchData'].forEach((field) => {
      const control = this.searchForm.get(field);
      control?.clearValidators();
      control?.updateValueAndValidity();
    });

    this.errorBack = false;
    this.hideBack.valueOf();
    //  this.getContactsComponent();
  }
}
