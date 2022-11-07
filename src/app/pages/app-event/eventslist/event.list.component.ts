import {Component, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import Chart from 'chart.js';
import {EventsService} from '../../services/events.service';
import {RegisterEventsModel} from '../models/RegisterEventsModel';
import {UserService} from '../../services/user.service';
import {UserEventsModel} from '../models/UserEventsModel';
import {NgxQrcodeStylingComponent, NgxQrcodeStylingService, Options} from 'ngx-qrcode-styling';
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from "@techiediaries/ngx-qrcode";

@Component({
  selector: 'app-landingpage',
  templateUrl: 'event.list.component.html'
})
export class EventListComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: false }) canvas: ElementRef;

  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  idForRegistry: '';

  private listEvents: RegisterEventsModel[]=[];

  isCollapsed = true;


  constructor(private service: EventsService, private serviceUser: UserService, private qrcode: NgxQrcodeStylingService) {}

  ngOnInit() {
    this.showAllEvents();
    console.log(this.listEvents)



    var body = document.getElementsByTagName("body")[0];
    body.classList.add("landing-page");

    var canvas: any = document.getElementById("chartBig");
    var ctx = canvas.getContext("2d");
    var gradientFill = ctx.createLinearGradient(0, 350, 0, 50);
    gradientFill.addColorStop(0, "rgba(228, 76, 196, 0.0)");
    gradientFill.addColorStop(1, "rgba(228, 76, 196, 0.14)");
    var chartBig = new Chart(ctx, {
      type: "line",
      responsive: true,
      data: {
        labels: [
          "JUN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUN",
          "JUL",
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC"
        ],
        datasets: [
          {
            label: "Data",
            fill: true,
            backgroundColor: gradientFill,
            borderColor: "#e44cc4",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#e44cc4",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#be55ed",
            //pointHoverBorderColor:'rgba(35,46,55,1)',
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: [80, 160, 200, 160, 250, 280, 220, 190, 200, 250, 290, 320]
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },

        tooltips: {
          backgroundColor: "#fff",
          titleFontColor: "#ccc",
          bodyFontColor: "#666",
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(0,0,0,0.0)",
                zeroLineColor: "transparent"
              },
              ticks: {
                display: false,
                suggestedMin: 0,
                suggestedMax: 350,
                padding: 20,
                fontColor: "#9a9a9a"
              }
            }
          ],

          xAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(0,0,0,0)",
                zeroLineColor: "transparent"
              },
              ticks: {
                padding: 20,
                fontColor: "#9a9a9a"
              }
            }
          ]
        }
      }
    });
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("landing-page");
  }

  showAllEvents(){
    this.service.getAllEvents().then((response) => {
      response.forEach((data) => {
        this.listEvents.push({
          id: data.id,
          titulo: data.data().titulo,
          descripcion: data.data().descripcion,
          fecha: data.data().fecha,
          users:this.showUserForEvents(data.id)
        })
      });
    })
  }

  showUserForEvents(id){
  const listUsers: UserEventsModel[]=[];
    this.serviceUser.getEvent(id).then((response)=>{
      response.forEach((data)=>{
        const dataUser=data.data();
        const newUser1: UserEventsModel={
          id:data.id,
          nameUser: dataUser.nameUser,
          lastname: dataUser.lastname,
          numberTelephone: dataUser.numberTelephone,
          idEvento: dataUser.idEvento,
          status: dataUser.status
        }
        console.log('eee',newUser1)
       listUsers.push(newUser1)

      })
    })
    return listUsers;
  }

  returnQrcode(){
    return this.idForRegistry;
  }
  saveImageQr(){

  }


  openModalQr(eventId,id,modal){
    this.idForRegistry=id;

    modal.show()

    const config: Options = {
      width: 200,
      height: 200,
      data: eventId+'/'+id,
      image: '',
      margin: 5,
    };
    this.qrcode.create(config, this.canvas.nativeElement).subscribe((res) => {
      // TO DO something!
    });

  }
 /* showUserForEvents(id){
    const listUsers: UserEventsModel[]=[];
    this.serviceUser.getEvent(id).valueChanges().forEach((response)=>{
      response.forEach(e=>{
        listUsers.push({
          nameUser: e.nameUser,
          lastname: e.lastname,
          numberTelephone: e.numberTelephone,
          idEvento: e.idEvento,
          status: e.status
        });

      })
    })
    return listUsers;
  }*/

}
