import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BusinessDataService } from 'src/app/services/business-data.service';
import { AlertBoxComponent } from 'src/app/shared/alert-box/alert-box.component';
import { ProfileComponent } from 'src/app/shared/profile/profile.component';

@Component({
  selector: 'app-leave-application',
  templateUrl: './leave-application.component.html',
  styleUrls: ['./leave-application.component.scss']
})
export class LeaveApplicationComponent {
  keywords: any;
  leaveForm!: FormGroup;

  leaveTypes = ['Sick Leave', 'Casual Leave', 'Earned Leave', 'Maternity Leave', 'Paternity Leave'];
  constructor(
    private route: Router,
    public dialog: MatDialog,

    private fb: FormBuilder,
    public businessData: BusinessDataService,
  ) { }
  ngOnInit(): void {
    this.leaveForm = this.fb.group({
      employeeName: ['', Validators.required],
      leaveType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  onSubmit() {
    if (this.leaveForm.valid) {
      console.log('Leave Application Submitted:', this.leaveForm.value);
      // You can now send this data to your backend API
    } else {
      this.leaveForm.markAllAsTouched();
    }
  }

  handleCategory(event: any) {
    this.keywords = event;
  }

  openDialog(): void {
    this.dialog.open(ProfileComponent, {
      width: '100px',
    });
  }

  onLogout() {
    // this.authService.onLogout();
    this.dialog.open(AlertBoxComponent, {
      data: { type: 'alert' }
    });
  }

  onView() {
    this.route.navigate(['dashboard']);
  }

  onLeaveApplication() {
    // alert("Leave appli Page")
    this.businessData.onNavigate('leave-application');

  }


}
