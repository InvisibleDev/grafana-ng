import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DashboardSearchHelper, DashboardService, FolderSeachHit } from 'common';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DropDownComponent } from '../../dropdowns/dropdown/dropdown';



@Component({
  selector: 'dashboard-explorer-mover',
  templateUrl: './mover.html'
})
export class DashboardExplorerMoverComponent  {
  @Input() folders: FolderSeachHit[];
  @Output() openChange = new EventEmitter();
  @Input() open: boolean;

  moveCounter: number;

  form: FormGroup;
  availableFolders: SelectItem[];

  folders$: Observable<SelectItem[]>;

  get selectedDashboards(){
    return DashboardSearchHelper.getSelectedDashboards( this.folders );
  }

  get count(){
    return this.selectedDashboards?.length;
  }

  get folder(){
    return this.form.get( 'folder' );
  }

  constructor( private dbService: DashboardService ){
  }
 
  ngOnInit() {
    this.form = new FormGroup({
      'folder': new FormControl(null, Validators.required)
    });

    this.folders$ = this
      .dbService
      .searchTop()
      .pipe( 
        map( x => DropDownComponent.wrapArray( 
          DashboardSearchHelper.toFolders( x ), 'title' ) ) )
  }

  onClose(){
    this.open=false;
    this.openChange.emit( this.open )
  }

  onMove() {
    const folder = this.folder.value;
    
    let dashboards = this.selectedDashboards;
		this.moveCounter = dashboards.length;

		dashboards.forEach(x => {
			//var d = x.cleanJSON();
			this.moveDashboard(null, folder.id);
		});
  }
  
  moveDashboard(d: any, folderId: number) {
    console.log( 'todo' );
		// this
		// 	.dbService
		// 	.updateDashboard(d, '', folderId, false)
		// 	.pipe(
		// 		finalize(() => this.decreaseMoveCounter()))
		// 	.subscribe(
		// 		_ => Notes.success(`Dashboard ${d.title} moved`),
		// 		_ => Notes.error(`Failed to move dashboard ${d.title}`));
  }
  
  decreaseMoveCounter() {
		--this.moveCounter;

		if (this.moveCounter <= 0) {
      this.moveCounter = 0;
      this.onClose();
		}
	}
}
