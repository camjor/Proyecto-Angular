
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {NotificationService } from '@app/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromActions from './user.actions';
import { environment } from '@src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map,  switchMap, tap } from 'rxjs';
import { UserResponse } from './user.models';


type Action = fromActions.All;

@Injectable()

export class UserEffects {

  constructor(
  private httpClient: HttpClient,
  private actions: Actions,
  private notification: NotificationService,
  private router: Router
  ){}


  signUpEmail: Observable<Action> = createEffect(() =>
      this.actions.pipe(
        ofType(fromActions.Types.SIGN_UP_EMAIL),// cual es la operacion que quieres trabajar
        map((action: fromActions.SignUpEmail) => action.user),// obtener los parametros de la transaccion
        switchMap(userData =>//comunicacion con el servidor y evaluacion de resultados
            this.httpClient.post<UserResponse>(`${environment.url}api/usuario/registrar`, userData)
            .pipe(
              tap((response: UserResponse) => {
                  localStorage.setItem('token', response.token);
                  this.router.navigate(['/']);
              }),
              map((response: UserResponse) => new fromActions.SignUpEmailSuccess (response.email, response || null)),
              catchError(err => {
                this.notification.error("Errores al registrar un nuevo usuario");
                return of (new fromActions.SignUpEmailError(err.message));
              })
            )
        )
      )
  );

  signInEmail: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.SIGIN_IN_EMAIL),
      map((action: fromActions.SignInEmail) => action.credentials),
      switchMap(userData =>
          this.httpClient.post<UserResponse>(`${environment.url}api/usuario/login`, userData)
          .pipe(
            tap((response: UserResponse) => {
                localStorage.setItem('token', response.token);
                this.router.navigate(['/']);
            }),
            map((response: UserResponse) => new fromActions.SignInEmailSuccess (response.email, response || null)),
            catchError(err => {
              this.notification.error("Las credenciales son incorrectas");
              return of (new fromActions.SignInEmailError(err.message));
            })
          )
      )
    )
);

init: Observable<Action> = createEffect(() =>//solo se ejecuta cuando se hace un refersh al navegador
  this.actions.pipe(
    ofType(fromActions.Types.INIT),// cual es la operacion que quieres trabajar
    switchMap(  async ()  =>  localStorage.getItem('token')),
    switchMap(  token =>  {
      if (token) {
        return this.httpClient.get<UserResponse>(`${environment.url}api/usuario`)
        .pipe(
          tap((response: UserResponse) => {
              console.log('data del usuario en sesion que viene del servidor=> ', response);

          }),
          map((response: UserResponse) => new fromActions.InitAuthorized (response.email, response || null)),
          catchError(err => {

            return of (new fromActions.InitError(err.message));
          })
        )
      }else{
        return of (new fromActions.InitUnauthorized());
      }

    }

    )
  )
);

}
