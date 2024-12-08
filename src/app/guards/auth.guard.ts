import { CanActivateFn } from "@angular/router";
import { UserService } from "../user/user.service";
import { inject } from "@angular/core";


export const AuthGuard: CanActivateFn = () => {
    const userService = inject(UserService);
    return userService.isLoggedIn;
}