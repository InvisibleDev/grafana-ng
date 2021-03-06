import { Component } from '@angular/core';
import { BaseProfileComponent } from '../profile-base';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { ErrorMessages, Notes, ObservableEx, FadeInOutAnimation } from 'uilib';
import { OrgUser, Preferences, AuthService, NavigationProvider,
   UserService, DashboardService, NavigationHelper, Team, UserOrgMembership } from 'common';

@Component({
  selector: 'profile-prefs',
  templateUrl: './prefs.html',
  animations: [FadeInOutAnimation],
})
export class ProfilePreferencesComponent extends BaseProfileComponent {
  user: OrgUser;
  formProfile: FormGroup;
  
  waitingProfile: boolean;
  waitingPrefs: boolean;

  loaderPrefs$: Observable<[Preferences,any]>;
  teamsRequest: ObservableEx<Team[]>;
  orgsRequest: ObservableEx<UserOrgMembership[]>;

  teams: Team[];
  
  get name() {
		return this.formProfile.get('name');
	}

	get email() {
		return this.formProfile.get('email');
	}

	get login() {
		return this.formProfile.get('login');
	}
  
  constructor(
    authService: AuthService,
    navProvider: NavigationProvider,
    userService: UserService,
		dsService: DashboardService ) {
      super(authService, navProvider, userService, dsService);
  }

  onUserLoaded( u: OrgUser ){
    this.user = u;

    this.formProfile = new FormGroup({
			'name': new FormControl(null, Validators.required),
			'email': new FormControl(null, [Validators.required, Validators.email]  ),
			'login': new FormControl(null, Validators.required )
    });
    
    this.navigation = NavigationHelper.createNavigationFromNode( 
      this.navProvider.profile( u ), "profile-settings" );

    this.formProfile.patchValue({
      name: u.name,
      email: u.email,
      login: u.login
    })
    
    this.loaderPrefs$ = forkJoin(
      this.userService.getUserPreferences( u.id ),
      this.dsService.search( 'starred=true' ));

    this.teamsRequest = new ObservableEx<Team[]>(this
      .userService
      .getCurrentUserTeams());
      

    this.orgsRequest = new ObservableEx<UserOrgMembership[]>(this
      .userService
      .getCurrentUserOrgs());
      
  }

  onSubmitProfile(){
    this.waitingProfile = true;

		this
			.userService
			.updateCurrentUser( this.formProfile.value )
			.pipe(
				finalize( () => this.waitingProfile = false ) )
			.subscribe( 
				x => {
					Notes.success( x.message );
					this.user.name = this.formProfile.value.name;
					this.user.email = this.formProfile.value.email;
					this.user.login = this.formProfile.value.login;

					this.authService.updateToken( x.token );
				},
				e => Notes.error( e.error?.message ?? ErrorMessages.BAD_UPDATE_USER_PROF ) )
	}

  onSubmitPreferences( p: Preferences ){
    this.waitingPrefs = true;
		
    this
      .userService
      .updateUserPreferences( p )
      .pipe( 
        finalize( () => this.waitingPrefs = false ))
      .subscribe( 
        x => {
          Notes.success( x.message )
          this.authService.updateToken( x.token );
        },
        e => Notes.error( e.error?.message ?? ErrorMessages.BAD_UPDATE_USER_PREF ) )
  }

  onSwitchOrg( m: UserOrgMembership ){
    this
			.userService
			.switchCurrentUserOrg( m.orgId )
			.subscribe( x => {
        this.authService.updateToken( x.token )
        window.location.reload();
      });
  }
}
