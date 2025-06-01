import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BusinessDataService } from 'src/app/services/business-data.service';
import { AlertBoxComponent } from 'src/app/shared/alert-box/alert-box.component';
import { ProfileComponent } from 'src/app/shared/profile/profile.component';

interface Leave {
  leaveType: string;
  startDate: string;
  endDate: string;
  status: string;
  reason: string;
}

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit, AfterViewInit {
  totalLeaves: number = 24;
  leavesTaken: number = 10;
  pendingLeaves: number = 0;

  columnsToDisplay: string[] = ['leaveType', 'startDate', 'endDate', 'status', 'reason'];

  dataSource = new MatTableDataSource<Leave>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private route: Router,
    public dialog: MatDialog,
    public businessData: BusinessDataService
  ) { }

  ngOnInit(): void {
    this.pendingLeaves = this.totalLeaves - this.leavesTaken;

    const leaveHistory: Leave[] = [
      {
        leaveType: 'Casual',
        startDate: '2025-04-10',
        endDate: '2025-04-12',
        status: 'Approved',
        reason: 'Personal work'
      },
      {
        leaveType: 'Sick',
        startDate: '2025-05-02',
        endDate: '2025-05-04',
        status: 'Pending',
        reason: 'Fever and cold '
      },
      {
        leaveType: 'Casual',
        startDate: '2025-03-15',
        endDate: '2025-03-16',
        status: 'Rejected',
        reason: 'Unplanned trip'
      },
      {
        leaveType: 'Casual',
        startDate: '2025-04-10',
        endDate: '2025-04-12',
        status: 'Approved',
        reason: 'Personal work'
      },
      {
        leaveType: 'Sick',
        startDate: '2025-05-02',
        endDate: '2025-05-04',
        status: 'Pending',
        reason: 'Fever and cold'
      }, {
        leaveType: 'Casual',
        startDate: '2025-04-10',
        endDate: '2025-04-12',
        status: 'Approved',
        reason: 'Personal work'
      },
      {
        leaveType: 'Sick',
        startDate: '2025-05-02',
        endDate: '2025-05-04',
        status: 'Pending',
        reason: 'Fever and cold'
      },
      // Add more dummy records to test pagination
    ];

    this.dataSource.data = leaveHistory;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDialog(): void {
    this.dialog.open(ProfileComponent, {
      width: '100px',
    });
  }

  onView(): void {
    this.route.navigate(['dashboard']);
  }

  onLogout(): void {
    this.dialog.open(AlertBoxComponent, {
      data: { type: 'alert' }
    });
  }

  onLeaveApplication(): void {
    this.businessData.onNavigate('leave-application');
  }
}
