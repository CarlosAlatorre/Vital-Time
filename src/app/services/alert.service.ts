import {Injectable} from '@angular/core';
import swal from 'sweetalert2';

@Injectable()
export class AlertService {

    constructor() {
    }

    error(title: string, message: string) {
        swal(
            title,
            message,
            'error'
        );
    }

    success(title: string, message: string) {
        swal(
            title,
            message,
            'success'
        );
    }

    confirmError(title: string, message: string) {

        return new Promise((resolve => {

            swal({
                title: title,
                text: message,
                type: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok'
            }).then(function () {
                resolve();
            });

        }));

    }

    confirmSuccess(title: string, message: string) {
        return new Promise((resolve => {

            swal({
                title: title,
                text: message,
                type: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok'
            }).then(function () {
                resolve();
            });

        }));
    }

    showError(code: string) {

        let title: string;
        let message: string;

        switch (code) {

            case 'auth/invalid-email':
                title = 'Email Invalido';
                message = 'Ingresa un email valido \'ejemplo@ejemplo.com\'';
                break;

            case 'auth/user-not-found':
                title = 'Usuario no encontrado';
                message = 'Introduzca un usuario que esté registrado en la aplicación';
                break;

        }

        this.error(title, message);

    }

    confirmOrCancel(title: string, message: string) {
        return new Promise((resolve, reject) => {
            swal({
                title: title,
                text: message,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si',
                cancelButtonText: 'No',
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                buttonsStyling: false,
                reverseButtons: true
            }).then((result) => {
                if (result.value) {
                    resolve();
                } else if (result.dismiss === 'cancel') {
                    reject();
                }
            });
        });
    }

    async getReason(title: string) {
        return new Promise((resolve, reject) => {
            swal({
                title: title,
                input: 'text',
                showCancelButton: true,
                confirmButtonText: 'Ok',
                showLoaderOnConfirm: true
            }).then((result) => {
                resolve(result);
            });
        });
    }
}
