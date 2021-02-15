import { MediaMatcher } from '@angular/cdk/layout';
import { Router,ActivatedRoute } from '@angular/router';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy


} from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
 
  dark = false;
  minisidebar = false;
 
  showHide = false;
  url = '';
  dir ='ltr' ;
  sidebarOpened = false;
  status = false;

  public showSearch = false;
  menu = [
    {
      name:'Moments',
      path:'moments-list'
    },
    {
      name:'Add-Moments',
      path:'moments-list/create'
    }
  ]
  // public config: PerfectScrollbarConfigInterface = {};
  private _mobileQueryListener: () => void;

  clickEvent() {
    this.status = !this.status;
  }


  constructor(
    public router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  logOut(){
    localStorage.clear();
    this.router.navigate(['/'])
  }
}
