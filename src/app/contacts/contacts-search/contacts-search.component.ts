import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacts-search',
  templateUrl: './contacts-search.component.html',
  styleUrl: './contacts-search.component.scss',
})
export class ContactsSearchComponent {
  @Output() searchTriggered = new EventEmitter<{
    searchText: string;
    searchData: string;
  }>();

  searchForm: FormGroup;
  errorBack = false;
  hideBack = true;

  // protected hideBack = true;

  searchOptions: any = [
    { value: 'surname', viewValue: 'Nazwisko' },
    { value: 'firstname', viewValue: 'Imię' },
    { value: 'city', viewValue: 'Miasto' },
  ];

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchText: ['', Validators.required],
      searchData: ['', Validators.required],
    });
  }
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
  }

  searchContacts() {
    if (this.searchForm.valid) {
      this.searchTriggered.emit(this.searchForm.value);
      this.hideBack = false;
    }
  }

  clearSearch() {
    this.searchForm.reset();
    this.hideBack = true;
    this.searchTriggered.emit({ searchText: '', searchData: '' });
  }
}
