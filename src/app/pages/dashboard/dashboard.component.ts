import { Component, inject, OnInit } from '@angular/core';
import { Chart, ChartOptions, registerables } from 'chart.js';
import { UserService } from '../../services/user.service';
import { IUser } from '../../model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  users: IUser[] = [];
  private userService = inject(UserService);
  private router = inject(Router);

  ngOnInit(): void {
    this.getUsers();
    Chart.register(...registerables);
    this.getApplicationsByDepartmentsChart(this.users);
  }

  getUsers() {
    this.users = this.userService.getAllUsers().slice(0, 5);
  }

  getDepartmentCount(): number {
    return new Set(this.users.map((user) => user.department)).size;
  }

  getRoleBreakdown(): string {
    const roles = {
      Admin: this.users.filter((u) => u.role === 'Admin').length,
      Editor: this.users.filter((u) => u.role === 'Editor').length,
      Viewer: this.users.filter((u) => u.role === 'Viewer').length,
    };
    return `${roles.Admin} Admins, ${roles.Editor} Editors, ${roles.Viewer} Viewers`;
  }

  getAverageApplication(): number {
    const average =
      this.users.reduce((acc, user) => acc + user.application, 0) /
      this.users.length;
    return Math.round(average);
  }

  navigateUserTable() {
    this.router.navigateByUrl(`/user-list`);
  }

  getApplicationsByDepartmentsChart(data: any) {
    console.log(data);
    const labels = data.map((d: any) => d.name);
    const values = data.map((d: any) => d.application);

    const colors = ['#6A1B9A', '#D81B60', '#1E88E5', '#43A047', '#047857'];

    const backgroundColors = values.map(
      (_: any, index: any) => colors[index % colors.length]
    );

    const existingChart = Chart.getChart('applicationsChart');
    if (existingChart) existingChart.destroy();

    const chart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Applications',
            data: values,
            backgroundColor: backgroundColors,
            borderColor: backgroundColors.map((color: any) =>
              this.shadeColor(color, -20)
            ), // Darken the border color slightly
            borderWidth: 1,
            borderRadius: 5,
            barPercentage: 0.5,
            categoryPercentage: 0.9,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: true,
            },
            beginAtZero: true,
          },
        },
        animation: {
          duration: 250,
        },
      },
    });

    const pieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: values,
            backgroundColor: backgroundColors,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  shadeColor(color: string, percent: number): string {
    const num = parseInt(color.slice(1), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      G = ((num >> 8) & 0x00ff) + amt,
      B = (num & 0x0000ff) + amt;
    return `#${(
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
      .toUpperCase()}`;
  }
}
