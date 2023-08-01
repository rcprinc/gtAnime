import { Component, asNativeElements } from "@angular/core";
import { AllAnimes } from "../modals/anime";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
  })
  export class GameComponent {

    public allAnime: AllAnimes = {anime: []};
    public _http: HttpClient;
    public completed: number[] = [];

    constructor(http: HttpClient){
        this._http = http;
        this.getAnimes();
    }
    

    public getAnimes(){
        this._http.get<AllAnimes>('https://json.extendsclass.com/bin/413a46e25479').subscribe(animes => {
            const today = new Date();
            const start = new Date("07/22/2023");
            var Difference_In_Time = start.getTime() - today.getTime();
            let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24 * -1);
            for(let i = 0; i < animes.anime.length; i++){
                if(Difference_In_Days > i)
                    this.allAnime.anime[i] = animes.anime[i];
                this.completed[i] = Number(localStorage.getItem((i+1).toString()+"c"));
            }
        });

    }

    public goToAnime(id: number){

    }

  }
