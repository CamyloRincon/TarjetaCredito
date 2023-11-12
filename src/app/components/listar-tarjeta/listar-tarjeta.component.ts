import { Component } from '@angular/core';
import { ref } from 'firebase/database';
import { ToastrService } from 'ngx-toastr';


import { map } from 'rxjs';
import { TarjetaCredito } from 'src/app/models/TarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-listar-tarjeta',
  templateUrl: './listar-tarjeta.component.html',
  styleUrls: ['./listar-tarjeta.component.css']
})
export class ListarTarjetaComponent {

    listarTarjeta: TarjetaCredito[] = [];

  
  constructor(private _tarjetaService: TarjetaService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas() {
    this._tarjetaService.obtenerTarjetas().snapshotChanges().pipe(map(changes => changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }) )))
    .subscribe(data => {
      this.listarTarjeta = data;
    });
    
  }

  eliminarTarjeta(id: any){
    this._tarjetaService.eliminarTarjeta(id).then(() => {
      this.toastr.error('La tarjeta fue eliminada con exito','Registro eliminado');
    }, error => {
      this.toastr.error('Opss.. ocurrio un error', 'Error');
      console.log(error)
    })
  }

  editarTarjeta(tarjeta: TarjetaCredito){
    this._tarjetaService.addTarjetaEdit(tarjeta);
  }

}
