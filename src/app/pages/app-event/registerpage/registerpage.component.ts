import {Component, OnInit, OnDestroy, HostListener, ViewChild} from '@angular/core';
import {RegisterEventsModel} from '../models/RegisterEventsModel';
import {EventsService} from '../../services/events.service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';
import {UserEventsModel} from '../models/UserEventsModel';
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from '@techiediaries/ngx-qrcode';
import {NgxQrcodeStylingComponent} from 'ngx-qrcode-styling';

@Component({
  selector: 'app-register',
  templateUrl: 'registerpage.component.html'
})
export class RegisterpageComponent implements OnInit, OnDestroy {
  @ViewChild('qrcode', { static: false }) public qrcode!: NgxQrcodeStylingComponent;
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  focus3;

  tittle: string;
  description: string;
  dateEvent = new Date();
  typeFormulary : string;
  idForNewRegistry: string;
  /* Data for user*/
  nameUser: string;
  lastname: string;
  numberTelephone: string;
  idEvento: string;

  /*data for image*/


  // We can have Canvas/Img/Url as elementType
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;



  private listEvents: RegisterEventsModel[]=[];

  constructor(private service: EventsService,private route: ActivatedRoute,private serviceUser: UserService) {
    this.typeFormulary=this.route.snapshot.paramMap.get('type');
  }
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e) {
    const squares1 = document.getElementById('square1');
    const squares2 = document.getElementById('square2');
    const squares3 = document.getElementById('square3');
    const squares4 = document.getElementById('square4');
    const squares5 = document.getElementById('square5');
    const squares6 = document.getElementById('square6');
    const squares7 = document.getElementById('square7');
    const squares8 = document.getElementById('square8');

    const posX = e.clientX - window.innerWidth / 2;
    const posY = e.clientY - window.innerWidth / 6;

    squares1.style.transform =
      'perspective(500px) rotateY(' +
      posX * 0.05 +
      'deg) rotateX(' +
      posY * -0.05 +
      'deg)';
    squares2.style.transform =
      'perspective(500px) rotateY(' +
      posX * 0.05 +
      'deg) rotateX(' +
      posY * -0.05 +
      'deg)';
    squares3.style.transform =
      'perspective(500px) rotateY(' +
      posX * 0.05 +
      'deg) rotateX(' +
      posY * -0.05 +
      'deg)';
    squares4.style.transform =
      'perspective(500px) rotateY(' +
      posX * 0.05 +
      'deg) rotateX(' +
      posY * -0.05 +
      'deg)';
    squares5.style.transform =
      'perspective(500px) rotateY(' +
      posX * 0.05 +
      'deg) rotateX(' +
      posY * -0.05 +
      'deg)';
    squares6.style.transform =
      'perspective(500px) rotateY(' +
      posX * 0.05 +
      'deg) rotateX(' +
      posY * -0.05 +
      'deg)';
    squares7.style.transform =
      'perspective(500px) rotateY(' +
      posX * 0.02 +
      'deg) rotateX(' +
      posY * -0.02 +
      'deg)';
    squares8.style.transform =
      'perspective(500px) rotateY(' +
      posX * 0.02 +
      'deg) rotateX(' +
      posY * -0.02 +
      'deg)';
  }

  ngOnInit() {
    this.service.getAllEvents().then((response) => {
      response.forEach((data) => {
        this.listEvents.push({
          id: data.id,
          titulo: data.data().titulo,
          descripcion: data.data().descripcion,
          fecha: data.data().fecha,
        })

      });
      return this.listEvents;
    })
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('register-page');

    this.onMouseMove(event);
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('register-page');
  }

  saveEvent(){
    const newEvent: RegisterEventsModel={
      titulo: this.tittle,
      descripcion: this.description,
      fecha: this.dateEvent.toLocaleDateString('es',{ year: 'numeric', month: 'short', day: 'numeric' })
          .replace(/ /g,'-')
          .replace('.','')
          .replace(/-([a-z])/,  (x) =>{return '-' + x[1].toUpperCase()})
    }
    this.service.addEvento(newEvent).then((response)=>{
      console.log('el id =>',response.id)
      return response.id;
    })

    this.cleanEvent();
  }
  cleanEvent(){
    this.tittle='';
    this.description='';
    this.dateEvent=new Date();
  }
  saveUser(){
    const newUser: UserEventsModel={
      nameUser:this.nameUser,
      lastname: this.lastname,
      numberTelephone: this.numberTelephone,
      idEvento: this.idEvento,
      status:'No asistido'
    }
    this.serviceUser.addUser(newUser,this.idEvento).then((response)=>{
      console.log('idEvent->',newUser.idEvento);
      this.idForNewRegistry= newUser.idEvento+'/'+response?.id;  //reponseId
      return response.id;
    })
    this.cleanUser();
  }

  cleanUser(){
    this.nameUser='';
    this.lastname='';
    this.numberTelephone='';
    this.idEvento='';

  }

  addId(idEvento){
     this.idEvento=idEvento;
  }

   saveImageQr(){
     this.qrcode.download(new Date().toLocaleDateString()).subscribe((res) => {
       // TO DO something!
     });
     this.idForNewRegistry=null;
   }




}
