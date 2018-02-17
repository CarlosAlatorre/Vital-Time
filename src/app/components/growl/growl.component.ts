import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'growl',
    templateUrl: './growl.component.html',
    styleUrls: ['./growl.component.scss']
})
export class GrowlComponent implements OnInit {

    @Input() title:string;
    @Input() message:string;
    @Input() showGrowl:boolean;

    constructor() {
    }

    ngOnInit() {
    }

    closeGrowl(){
        this.showGrowl = false;
    }

}
