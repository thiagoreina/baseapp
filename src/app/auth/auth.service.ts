import { StorageService } from './../services/storage.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { User } from './user';
import { AuthResponse } from './auth-response';
import { AppModule } from '../app.module';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private AUTH_SERVER_ADDRESS: string = environment.apiURL

  authSubject = new BehaviorSubject(false);
  private jwtHelper = new JwtHelperService();

  constructor(
    private httpClient: HttpClient
    , private storage: StorageService
    , private router: Router
  ) { }

  addUser(user) {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}users/register`, user).pipe(
      tap(async (res) => {
        await res;

      })

    );
  }

  register(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}users/register`, user).pipe(
      tap(async (res: AuthResponse) => {
        if (res.token) {
          await this.storage.set("ACCESS_TOKEN", res.token);
          // await this.storage.set("EXPIRES_IN", res.user.expires_in);
          this.authSubject.next(true);
        }
      })

    );
  }

  login(user: User): Observable<AuthResponse> {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}users/authenticate`, user).pipe(
      tap(async (res: AuthResponse) => {

        console.log(res)
        if (res.token) {
          await this.storage.set("ACCESS_TOKEN", res);
          // await this.storage.set("EXPIRES_IN", res.user.expires_in);
          this.authSubject.next(true);
        } else {
          false
        }
      })
    );
  }

  changePass(pass) {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}users/changePass`, pass).pipe(
      tap(async (res) => {
        await res;
      })
    );
  }

  updateMyProfile(data) {
    return this.httpClient.put(`${this.AUTH_SERVER_ADDRESS}users/updateMyProfile`, data).pipe(
      tap(async (res) => {
        await res;
      })
    );
  }

  getAllUsers() {
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}users/`).pipe(
      tap(async (res) => {
        await res
      })
    );
  }

  changeAdmin(data) {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}users/changeAdmin/`, data).pipe(
      tap(async (res) => {
        await res
      })
    );
  }

  resetPass(data) {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}users/resetPass/`, data).pipe(
      tap(async (res) => {
        await res
      })
    );
  }

  enableUser(data) {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}users/enableUser/`, data).pipe(
      tap(async (res) => {
        await res
      })
    );
  }

  getMyProfile() {
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}users/getMyProfile/`).pipe(
      tap(async (res) => {
        await res
      })
    );
  }

  async logout() {
    await this.storage.clear();
    console.log('logout')
    //this.router.navigateByUrl('login');
    this.authSubject.next(false);
    //this.logoutBD()
  }

  logoutBD() {
    return this.httpClient.get<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}users/logout`).pipe(
      tap(async (res: AuthResponse) => {
      })

    );

  }

  isLoggedIn() {
    //return this.authSubject.asObservable();
    return this.authSubject.value;
  }

  public async isAuthenticated(): Promise<boolean> {
    let dataUser: any = await this.getStorage('ACCESS_TOKEN')//localStorage.getItem('login');
    console.log('dataUser', dataUser)
   // dataUser = JSON.parse(dataUser)
    if (!dataUser) {
      return false
    }
    if(!this.jwtHelper.isTokenExpired(dataUser.token))
    return  false;

    return true
  }

  async getStorage(key) {
    var dataStore
     await this.storage.get(key).then(data => {
       console.log("data",data)
       dataStore = data
      
    })

    if(dataStore)
    return true
    return false 
  }
}
