import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitTo'
})
export class LimitToPipe implements PipeTransform {

    transform(array: any, limit: any) : any {
        debugger

        let newArray:any[];
        for(let i = 0; i <= limit; i ++){
            newArray.push(array[i]);
        }
        return newArray
    }

}
