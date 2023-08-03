import { Component, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '../modals/search';
import { AllAnimes, Anime } from '../modals/anime';
import { ActivatedRoute } from '@angular/router';
import mixpanel from 'mixpanel-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

public guess: number = 1;
public guesses: string[] = ["","","","",""];
public finished: number = 0;
public _http: HttpClient;
public searchResults: any;
public anime: Anime = {day:0,year:0,images:[],names:[],nameContains:""};
public usingImage: string = "";
public completed: number = 0;

constructor(http: HttpClient, private route: ActivatedRoute, private renderer: Renderer2){
    this._http = http;
    if(location.search.length > 0){
        this.getAnime(parseInt(location.search.substring(4, location.search.length))-1);
    } else {
        const today = new Date();
        const start = new Date("07/26/2023");
        var Difference_In_Time = start.getTime() - today.getTime();
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24 * -1);
        this.getAnime(Math.floor(Difference_In_Days)-1);
    }
 
mixpanel.init("23cf03df4416fe8baa559a4819156dd1", { debug: true, track_pageview: true, persistence: 'localStorage' });
if(Number(localStorage.getItem("Mixpanel")) <= 0){
    const randomNumber = Math.random();
    localStorage.setItem("Mixpanel", randomNumber.toString());
    mixpanel.identify(Number(localStorage.getItem("Mixpanel")).toString());
    mixpanel.track('Sign Up', {
  'Signup Type': 'Referral'
})
}

}

    public switchImage(index: number)
    {
        if(this.guess < index)
        {
            return;
        }
        this.usingImage = this.anime.images[index-1]
    }

    public check(id: string){
        this.guess++;
        this.searchResults = null;

        for(let i = 0; i < this.anime.names.length; i++){
            if(id.toLocaleLowerCase() === this.anime.names[i].toLocaleLowerCase()){
                this.switchImage(5);
                this.finished = 1;
                localStorage.setItem(this.anime.day + 'c',(this.guess - 1).toString())
                this.completed = this.guess - 1
                this.guess = 5;
                return;
            }
        }

        if(id.toLocaleLowerCase().includes(this.anime.nameContains.toLocaleLowerCase())){
            this.switchImage(5);

            this.finished = 1;
            localStorage.setItem(this.anime.day + 'c',(this.guess - 1).toString())
            this.completed = this.guess - 1
            this.guess = 5;
            return;
        }
        localStorage.setItem(this.anime.day.toString(), this.guess.toString())

        this.guesses[this.guess - 2] = id;
        (<HTMLInputElement>document.getElementById("search")).value = "";
  

        if(this.guess == 6){
            this.finished = 2
            localStorage.setItem(this.anime.day + 'c','10');
        } else{
            this.switchImage(this.guess);
        }
    }

    public search(){
        let guessName = (<HTMLInputElement>document.getElementById("search")).value;

        this._http.get<Data>('https://kitsu.io/api/edge/anime?filter[text]=' + encodeURIComponent(guessName)).subscribe(shows => {
            this.searchResults = shows;
        });
    }

    public skip(){
        this.check("");
    }

    private getAnime(id: number){
        this._http.get<AllAnimes>('https://json.extendsclass.com/bin/413a46e25479').subscribe(anime => {
            this.anime = anime.anime[id] 
            this.usingImage = this.anime.images[this.guess-1];
            if(Number(localStorage.getItem(this.anime.day + "c")) > 0){
                if(Number(localStorage.getItem(this.anime.day + "c")) <= 5) {
                this.finished = 1;
                this.guess = 5;
                this.switchImage(5);
                this.setButtons(true);
                this.completed = Number(localStorage.getItem(this.anime.day + "c"));
                } else {
                    this.finished = 2;
                    this.guess = 5;
                    this.switchImage(5);
                    this.setButtons(true);
                    this.completed = 10;
                }
            }
            else if(Number(localStorage.getItem(this.anime.day.toString())) > 0){
                this.guess = Number(localStorage.getItem(this.anime.day.toString()));
                this.switchImage(Number(localStorage.getItem(this.anime.day.toString())));
            }
        });
    }

    private setButtons(comp: boolean){
        if(this.guess > 1){
            const myElement = <HTMLButtonElement>document.getElementById("search");
            if(myElement) {
                myElement.style.backgroundColor = "blue";
                console.error(myElement);
            }
   
        }
    }
    
    private testAnime(): Anime{
        return  {
            day: 1,
            year: 2023,
            images: [
                "https://www.looper.com/img/gallery/hunter-x-hunter-could-return-sooner-than-you-think/intro-1684781546.webp",
                "https://static.wikia.nocookie.net/hunterxhunter/images/8/88/Isaac_Netero_HE_Portrait.png",
                "https://pyxis.nymag.com/v1/imgs/988/f7f/9ddec6d5779379be3810f2f6ec2b150732-hunter-x-hunter.rsquare.w330.jpg",
                "https://www.themarysue.com/wp-content/uploads/2022/06/chrollo-yorknew-city-arc.jpg",
                "https://www.slashfilm.com/img/gallery/hunter-x-hunter-is-an-anime-adventure-like-no-other/intro-1640711234.webp"
            ],
            names: [
                "Hunter X Hunter",
                "Hunter X Hunter (2011)"
            ],
            nameContains: "Hunter X Hunter"
        }
    }   

}
