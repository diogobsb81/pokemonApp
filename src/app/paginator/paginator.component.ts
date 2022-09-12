import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

export interface Pagination {
  page: number;
  rows: number;
  first: number;
}

/**
 * Simplified PrimeNG Paginator component
 */

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .highlight {
        background: aquamarine;
      }

      .paginator-rows-per-page {
        margin-left: 1rem;
      }
    `,
  ],
})
export class PaginatorComponent implements OnChanges {
  @Input() totalRecords = 0;
  @Input() rows = 0;
  @Input() currentPage = 1;
  @Input() rowsPerPageOptions: number[] = [];
  @Input() first!: number;

  @Output() onPageChange = new EventEmitter<Pagination>();

  lastPage = this.currentPage;
  pageLinks!: number[];

  ngOnChanges(simpleChange: SimpleChanges) {
    if (simpleChange['totalRecords'] || simpleChange['rows']) {
      this.lastPage = Math.ceil(this.totalRecords / this.rows);
      this.updatePageLinks();
    }
  }

  changePageToFirst(event: { preventDefault: () => void }) {
    this.changePage(1);
    event.preventDefault();
  }

  changePageToPrev(event: { preventDefault: () => void }) {
    this.changePage(this.getPage() - 1);
    event.preventDefault();
  }

  changePageToNext(event: { preventDefault: () => void }) {
    this.changePage(this.getPage() + 1);
    event.preventDefault();
  }

  changePageToLast(event: { preventDefault: () => void }) {
    this.changePage(this.getPageCount());
    event.preventDefault();
  }

  onPageLinkClick(event: { preventDefault: () => void }, page: number) {
    this.changePage(page);
    event.preventDefault();
  }

  onRppChange($event: Event) {
    const value = ($event.target as HTMLSelectElement).value;
    this.rows = Number(value);
    this.changePage(this.getPage());
  }

  private changePage(p: number) {
    const pc = this.getPageCount();

    if (p >= 0 && p <= pc) {
      this.onPageChange.emit({
        page: p,
        first: this.rows * p,
        rows: this.rows,
      });
    }
  }

  private updatePageLinks() {
    this.pageLinks = [];
    let [start, end] = [0, this.getPageCount() - 1];

    for (let i = start; i <= end; i++) {
      this.pageLinks.push(i + 1);
    }

    if (!this.pageLinks.length && !!this.totalRecords) {
      this.pageLinks.push(1);
    }
  }

  private getPage(): number {
    const dummy = Math.floor(this.first / this.rows);
    return dummy === 0 ? dummy + 1 : dummy;
  }

  private getPageCount() {
    return Math.ceil(this.totalRecords / this.rows) || 1;
  }
}
