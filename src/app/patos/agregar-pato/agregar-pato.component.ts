import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FireCrudService } from 'src/app/service/fire-crud.service';
import { RamdonDuck } from 'src/app/shared/ramdon-duck';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-agregar-pato',
  templateUrl: './agregar-pato.component.html',
  styleUrls: ['./agregar-pato.component.css']
})
export class AgregarPatoComponent implements OnInit {

  public formularioRegistro: FormGroup;
  panelOpenState: boolean = false;
  listaLikes: Array<RamdonDuck> = [];

  constructor(
    private fireCrud: FireCrudService,
    public fb: FormBuilder,
    public toast: ToastrService,
    private router: Router

    ) {

    this.formularioRegistro = this.fb.group({
      nombre: [''],
      color: [''],
      edad: [''],
      link: ['']
    });



    this.getDataLikePatos();

  }

  ngOnInit(): void {
  }

  addDuck(){
    let pato : RamdonDuck = {
      link: this.formularioRegistro.controls['link'].value,
      nombre: this.formularioRegistro.controls['nombre'].value,
      edad: this.formularioRegistro.controls['edad'].value,
      color: this.formularioRegistro.controls['color'].value
    }

    this.fireCrud.AddDuck(pato);

    this.showToast();
    this.router.navigate(['patos']);

  }

  showToast(){
    this.toast.success("Se guardo correctamente.","Pato agregado",
  );
  }

  clearInputs(){
    this.formularioRegistro.reset({});
  }

  async getDataLikePatos() {


    this.fireCrud.GetDucks().valueChanges().subscribe(
      ( data: any[]) => {

        // get likes (lista de likes de imagenes)
        this.listaLikes = data;

      }
    );


   }



}
