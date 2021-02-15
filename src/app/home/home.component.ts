import { MediaMatcher } from '@angular/cdk/layout';
import { Router,ActivatedRoute } from '@angular/router';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy


} from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {
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
      path:'moment-list'
    },
    {
      name:'Add-Moments',
      path:'create'
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
    this.router.navigate(['/login'])
  }
}