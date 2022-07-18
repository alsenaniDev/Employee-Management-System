import { AfterViewChecked, AfterViewInit, Component, HostListener, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ServiceRolesPermission } from './core/utility/Services/service-roles';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'EmployeeManagement';
  // @HostListener("window:beforeunload", ["$event"])
  constructor(private router: Router,
    private serviceRolePermission: ServiceRolesPermission
  ) { }

  ngAfterViewInit(): void {
    // ServiceRolesPermission.getServiceRoles();
    console.log("Refresh Page");
    // this.serviceRolePermission.getServiceRoles();
    this.DetectRefresh()
  }
  DetectRefresh() {
    this.router.events
      .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .subscribe((event: { id: number; url: any; urlAfterRedirects: any; }) => {
        if (
          event.id === 1 &&
          event.url === event.urlAfterRedirects
        ) {
          this.serviceRolePermission.getServiceRoles();
        }
      })
  }
}
