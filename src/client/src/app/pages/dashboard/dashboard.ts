import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DashboardStore } from 'common';
import { ErrorMessages, Notes } from 'uilib';


@Component({
  selector: 'dashboard',
  template: `
    <toolbar></toolbar>
  `
})
export class DashboardComponent{
  storeSubs: Subscription;
  storeErrorSubs: Subscription;
  
  constructor( 
    private router: Router,
    public store : DashboardStore/*,
    private timeManager: TimeManager*/ ){
      
  }

  ngOnInit(){
    this.storeSubs = this
      .store
      .dashboard$
      .subscribe( x => {
        if( x ){
          console.log( x );
        /*DashboardsService.saveRecentDashboards( this.dashboard.id )*/
        }
      });

    this.storeErrorSubs = this
      .store
      .error$
      .subscribe( x => {
        if( x ){
          Notes.error( ErrorMessages.BAD_GET_DASHBOARD );
          this.router.navigate( [DashboardStore.ROOT_MANAGEMENT] );
        }
      } )
  }

  ngOnDestroy(){
    this.storeSubs?.unsubscribe();
    this.storeErrorSubs?.unsubscribe();
  }

  
}
