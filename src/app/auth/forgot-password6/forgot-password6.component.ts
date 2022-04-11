import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { registerElement } from 'nativescript-angular/element-registry';
// import { Gif } from 'nativescript-gif';
// registerElement('Gif', () => Gif);
import { LottieView } from '@nativescript-community/ui-lottie';

@Component({
    selector: 'app-forgot-password6',
    templateUrl: './forgot-password6.component.html',
    styleUrls: ['./forgot-password6.component.css']
})

export class Forgotpassword6 implements OnInit {
    public loop: boolean = true;
    public src: string;
    public autoPlay: boolean = true;
    public animations: Array<string>;

    private _lottieView: LottieView;

    constructor(private page: Page,
        private router: Router,
        private routerextension: RouterExtensions) {
        page.actionBarHidden = true

        this.animations = [
            'Mobilo/success_lottie.json'
        ];
        this.src = this.animations[0];
    }

    ngOnInit(): void {

        setTimeout(() => {
            this.routerextension.navigate(['login'],{clearHistory:true,animated:true,transition:{name:'slideRight'}})
        }, 5000)
    }

    lottieViewLoaded(event) {
        this._lottieView = <LottieView>event.object;
    }

}