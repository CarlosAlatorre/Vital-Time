import {Injectable} from "@angular/core";

@Injectable()
export class Globals {
    static optionModalSm: object = {
        backdrop: "static",
        keyboard: false,
        size: "sm"
    };
    static optionModalLg: object = {
        animated: true,
        keyboard: false,
        backdrop: true,
        ignoreBackdropClick: true,

    };

}
