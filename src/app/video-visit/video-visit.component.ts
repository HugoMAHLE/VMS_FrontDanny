import { Component, ElementRef, ViewChild, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import LocalStorage from '../localStorage';
import { Router } from '@angular/router';
import axios from 'axios';
import {format} from "date-fns";
import { es } from "date-fns/locale"
import { environment } from '../../environments/environment.development';
import { ZebraPrinter } from '../../utils/ZebraPrinter';

@Component({
  selector: 'app-video-visit',
  standalone: true,
  imports: [
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './video-visit.component.html',
  styleUrl: './video-visit.component.css'
})

export class VideoVisitComponent implements OnInit {
  privacyVideoSrc: string = 'assets/videos/welcomeVideo.mp4';
  securityVideoSrc: string = 'assets/videos/securityVideo.mp4'
  videoSrc: string = "";
  code: any = "";
  dateStr: any = ""
  formattedDate: string = ""

  text: string = '';
  router = inject(Router);
  api_URL = environment.api_URL

  visitorArray: any[] = [];
  currentVisitorIndex: number = 0;
  currentVisitor: any = null;

  constructor(private cdr: ChangeDetectorRef) {}

  @ViewChild('videoPlayer', { static: true }) videoPlayer!: ElementRef<HTMLVideoElement>;

  ngOnInit(): void {
    this.startVideo();
  }

  startVideo(): void {
    this.videoSrc = this.securityVideoSrc;

    this.cdr.detectChanges();

    console.log("first video: " + this.videoSrc);

    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      const videoElement = this.videoPlayer.nativeElement;

      videoElement.oncanplay = () => {
        if (videoElement.requestFullscreen) {
          videoElement.requestFullscreen();
        }
        videoElement.play();
      };
    }
  }

  onVideoEnd(): void {
    if (this.videoSrc === this.privacyVideoSrc) {
      this.videoSrc = this.securityVideoSrc;
      this.cdr.detectChanges();
      console.log("second video: " + this.videoSrc);

      setTimeout(() => {
        if (this.videoPlayer && this.videoPlayer.nativeElement) {
          const videoElement = this.videoPlayer.nativeElement;
          videoElement.src = this.videoSrc;
          videoElement.load();
          videoElement.play();
        }
      }, 100);
    } else {
      console.log("Both videos finished. Navigating to '/visitor'.");
      this.printVisitors();
      this.router.navigate(['/visitor']);
    }
}

  async printVisitors() {
    const print = new ZebraPrinter();

    try {
      const storedData = LocalStorage.getLocalStorageData('visitInfo');
      let visitID: any = 0
      let userid: any = 0

      if (storedData) {
        const visitInfo = storedData[storedData.length - 1];
        visitID = visitInfo.visitID;
        this.code = visitInfo.code;
        let date = new Date(visitInfo.date);

        let formattedDate = new Intl.DateTimeFormat("es-ES", {
          day: "2-digit",
          month: "long",
          year: "2-digit",
        }).format(date);

        console.log(formattedDate); // "30 de enero de 25"
        this.dateStr = formattedDate
        userid = visitInfo.userid

      }

      const response = await axios.get(`${this.api_URL}visitor/get-visitors?id=${visitID}`);
      this.visitorArray = response.data.msg;
      console.log(this.visitorArray);

      if (this.visitorArray.length > 0) {
        for (const element of this.visitorArray) {
          const type: string = "Invitado";
          const name: string = element.firstname + " " + element.lastname;

          const enterpriseResponse = await axios.get(`${this.api_URL}visitor/company-by-id?id=${element.companyid}`);
          const enterprise: string = enterpriseResponse.data.company.company; // Adjust based on actual API response
          const hostResponse = await axios.get(`${this.api_URL}users/get-host-name?id=${userid}`);;
          const host: string = hostResponse.data.user.full_name;
          console.log(
            type + ' ' +
            name + ' ' +
            enterprise + ' ' +
            host + ' ' +
            this.dateStr + ' ' +
            this.code
          )
          print.printLabel(type, name, enterprise, host, this.dateStr, this.code);
          console.log("success")
        }
      }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  }

  logOut(): void {
      LocalStorage.clearLocalStorage('login');
      this.router.navigate(['/login']);
    }

}
