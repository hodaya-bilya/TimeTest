import { finalize, Observable } from 'rxjs';
import { HttpService } from './../sevices/http.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Condition } from '../models/condition.model';

@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.scss']
})
export class ConditionComponent implements OnInit {
  conditionForm: FormGroup
  formData: FormData;
  loading: boolean = false;
  conditions: string[];
  startDate: string;
  endtDate: string;
  constructor(
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ConditionComponent>) { }

  ngOnInit(): void {

    this.getAllConditions();
    this.startDate = `${new Date().getFullYear()}-${("0" + new Date().getMonth() + 1).slice(-2)}-${("0" + new Date().getDate()).slice(-2)}`;

    this.endtDate = `${new Date().getFullYear()}-${("0" + new Date().getMonth() + 3).slice(-2)}-${("0" + new Date().getDate()).slice(-2)}`;

    this.conditionForm = this.formBuilder.group({
      conditionName: ['', Validators.required],
      daysBetweenExams: ['4', Validators.required],
      gapFirstAndSecondExam: ['30', Validators.required],
      minMorningHour: ['9', Validators.required],
      minAfternoonHour: ['14', Validators.required],
      examsPeriodStartDate: [this.startDate, Validators.required],
      examsPeriodEndDate: [this.endtDate, Validators.required],
      forSoldiers: [false, Validators.required],
      file:['',Validators.required]
    });

  }
  getAllConditions() {
    this.httpService.getAllConditions().subscribe(res => {
      if (res.error) {
        this._snackBar.open(res.error, 'סגור', { duration: 5000 });
        return;
      }
      else {
        this.conditions = res.data;
      }
    })
  }

  sendAllData() {
    if (this.conditionForm.valid) {
      this.loading = true;
      
      this.httpService.uploadFile(this.formData).subscribe(res => {
        if (res.error) {
          this._snackBar.open(res.error, 'סגור', { duration: 5000 });
          this.loading = false;
          return;
        }
        this.conditionForm.removeControl('file');
        this.httpService.sendCondition(this.conditionForm.value)
          .pipe(finalize(() => {
            this.loading = false;
          })).subscribe(res => {
            if (res?.data?.exams?.length > 0) {
              this.dialogRef.close(res.data.exams);
            }
            else if (res.error) {
              this._snackBar.open(res.error, 'סגור', { duration: 5000 });
            }
          })
      });
    }
    else {
      this._snackBar.open('יש למלא את שדות החובה', 'סגור', { duration: 5000 });
    }
  }

  uploadFile(file: any) {
    this.formData = new FormData();
    this.formData.append("file", file.files[0]);
  }

  getConditionName(conditionName: MatAutocompleteSelectedEvent) {
    this.httpService.getCondition(conditionName.option.value).subscribe(res => {
      if (res.error) {
        this._snackBar.open(res.error, 'סגור', { duration: 5000 });
        return;
      }
      else if (res.data) {
        const condition: Condition = JSON.parse(res.data);
        this.conditionForm.patchValue(condition)
      }
    });
  }
}
