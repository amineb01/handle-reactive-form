import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Component, OnInit, ElementRef, ViewChild, NgZone, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';


import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
// import { EventsService } from '../service/events.service';
// import { Event } from '../models/Event';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reactiveForm';

  selectedTag = [];
  tagss = []
  model
  categories
  dropdownList = [];
  dropdownSettings = {};
  loading: boolean = false;

  compare(val1, val2) {

    return val1 && val2 && val1.id == val1.id;
  }
  uploadErr;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  myForm: FormGroup;
  public searchElementRef: ElementRef;
  eventForm;
  items;
  $catSubs: Subscription;
  $tagsSubs: Subscription;
  constructor(private elRef: ElementRef,
    private fb: FormBuilder,
//    private router: Router,
    private ngZone: NgZone,
    //private eventService: EventsService
  ) {
    this.initForm();

  }

  initMultipleSelect() {


    //   get list of tags from your own service and inject them to multiple select  we use static data for simplicity 
    //   this.$tagsSubs = this.tagsService.getTags().subscribe(res => { this.dropdownList = res; })


    this.dropdownList = [{ _id: 1, name: "tag1" }, { _id: 2, name: "tag2" }, { _id: 3, name: "tag3" }]
    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      limitSelection: 5,
      allowSearchFilter: true,
      enableCheckAll: false,
      searchPlaceholderText: "sélectionner les tags que vous souhaitez ... "

    };
  }




  ngOnInit() {
    this.initMultipleSelect();

    // get the list of your categories form server and inject them in th select input in this exemple we use static data for simplicity 
    // we initialize our form after we get our list of categories form server 
    //this.$catSubs = this.catSetvice.getCategoriesShort().subscribe(res => { this.categories = res; this.initvalue(); })



    this.categories = [{ _id: 11111111, name: "categorie1" }, { _id: 22222222, name: "categorie2" }]
  }

  initvalue() {

    this.myForm.controls.categorie.setValue(this.categories[0]._id)
  }

  onItemSelect(item: any) {
    this.selectedTag.push(item._id)
  }
  onItemDeSelect(item: any) {
    for (var i = 0; i < this.selectedTag.length; i++)
      if (this.selectedTag[i]._id === item._id) {
        this.selectedTag.splice(i, 1);
        break;
      }
  }

  initForm() {

    this.myForm = this.fb.group({
      // you can also set initial formgroup inside if you like
      name: ['testname', [Validators.required, Validators.minLength(5)]],
      description: [''],
      dd: ['', [Validators.required, Validators.minLength(5)]],
      td: ['10:00'],
      df: ['', [Validators.required, Validators.minLength(5)]],
      tf: ['10:00'],
      gratuit: [false],
      fb: ['', [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      twt: ['', [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      categorie: ["", [Validators.required, Validators.minLength(5)]],


      //we create our form group inside the formarray
      items: this.fb.array([this.createItem()])
    })


  }

  onChange(ev, i) {

    let formArray = (<FormArray>this.myForm.controls.items);
    let onItem = <FormGroup>formArray.controls[i];
    onItem.controls.gratuit.setValue(ev)
    if (ev)
      onItem.controls.price.setValue(200)
  }

  createItem() {


    return this.fb.group({
      libile: ['', [Validators.required, Validators.minLength(5)]],
      quantite: ['', [Validators.required]],
      gratuit: [true],
      price: ['']
    })

  }

  deleteTicket(index) {
    let control = <FormArray>this.myForm.controls.items;
    control.removeAt(index)
  }

  onSubmit() {
    this.loading = true;
    if (this.selectedTag.length > 2) {

      console.log('publier', this.myForm.value)
      /*  let startD = this.myForm.value.dd.year + "-" + this.convert(this.myForm.value.dd.month) + "-" + this.convert(this.myForm.value.dd.day) + "T" + this.myForm.value.td + ":00"
        let endD = this.myForm.value.df.year + "-" + this.convert(this.myForm.value.df.month) + "-" + this.convert(this.myForm.value.df.day) + "T" + this.myForm.value.tf + ":00"
        let event = new Event(this.myForm.value.name, this.myForm.value.description..)
        this.eventService.createEvent(event, this.selectedFile).subscribe(
          data => {
            // this.router.navigate(['/home']);
            this.loading = false
          },
          (err: HttpErrorResponse) => {
            console.log("error    " + err)
            this.loading = false
          }, );
  
  */

    }


  }
  // convert date moth and day to 2 digits exemple : 1 => 01
  convert(number) {
    return number < 10 ? '0' + number : '' + number;
  }
  Sauvegarder() {
    console.log('sauvegarder', this.myForm)

  }
  autoCompleteCallback1(selectedData: any) {
    console.log('selectedData', selectedData)
  }
  addNewTicket(): void {
    let control = <FormArray>this.myForm.controls.items;
    control.push(
      this.createItem()
    )
  }



  ngOnDestroy() {
    if (this.$catSubs) this.$catSubs.unsubscribe();
    if (this.$tagsSubs) this.$tagsSubs.unsubscribe();
  }
  showloading() {
    if (!this.myForm )
      return true;
    else
      return false;
  }
}
