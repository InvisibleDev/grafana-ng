import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ErrorMessages, Notes } from 'uilib';
import { BaseComponent } from '../../base/base-component';
import { OrgService } from 'common';

@Component({
  selector: 'admin-add-org',
  templateUrl: './add-org.html',
	styles:[`
		.org-description {
			width: 555px;
			margin-bottom: 20px;
		}
	`]
})
export class AdminAddOrgComponent extends BaseComponent {
	form: FormGroup;

	get name() {
		return this.form.get('name');
	}

	constructor( 
		private orgService: OrgService,
		public router: Router,
		public activeRoute: ActivatedRoute ) {
			super();
	}

	ngOnInit(){
		this.form = new FormGroup({
			'name': new FormControl( null, Validators.required),
    });
	}

	onSubmit(){
		this.waiting = true
		
		this
			.orgService
			.create( this.form.value )
			.pipe( 
				finalize( () => this.waiting = false ))
			.subscribe( 
				x => {
					Notes.success( x.message );
					this.router.navigate(['../'], { relativeTo: this.activeRoute })
				},
				e => Notes.error( e.error?.message ?? ErrorMessages.BAD_CREATE_ORG ));
	}
}
