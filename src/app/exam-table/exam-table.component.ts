import { environment } from './../../environments/environment';
import { HttpService } from './../sevices/http.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exam } from '../models/exam.model';
import { MatDialog } from '@angular/material/dialog';
import { ConditionComponent } from '../condition/condition.component';

@Component({
  selector: 'app-exam-table',
  templateUrl: './exam-table.component.html',
  styleUrls: ['./exam-table.component.scss']
})
export class ExamTableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['courseName', 'scheduledDate', 'scheduledTime', 'testDurationHours', 'secondExam'];
  dataSource: MatTableDataSource<Exam>;
  constructor(public dialog: MatDialog, private httpService: HttpService) { }

  ngOnInit(): void { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openConditionDialog() {
    const dialogRef = this.dialog.open(ConditionComponent, { width: '500px' });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.dataSource = new MatTableDataSource(res);
      }
    });
  }

  downloadFile() {
    window.open(`${environment.BASE_URL}/Download`);
  }

  ngOnDestroy(): void {
   this.dialog.closeAll();
  }

}
