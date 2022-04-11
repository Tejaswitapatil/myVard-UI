import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { registerElement } from 'nativescript-angular/element-registry';
// import { Gif } from 'nativescript-gif';
// registerElement('Gif', () => Gif);
import { LottieView } from '@nativescript-community/ui-lottie';

@Component({
    selector: 'app-otp-verified',
    templateUrl: './otp-verified.component.html',
    styleUrls: ['./otp-verified.component.css']
})

export class OtpverifiedComponent implements OnInit {
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
            this.routerextension.navigate(['/dashboard'], { clearHistory: true })
        }, 3000)
    }

    lottieViewLoaded(event) {
        this._lottieView = <LottieView>event.object;
    }

}