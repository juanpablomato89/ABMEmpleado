import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-add-edit-empleado',
  templateUrl: './add-edit-empleado.component.html',
  styleUrls: ['./add-edit-empleado.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }]
})
export class AddEditEmpleadoComponent implements OnInit {
  estadoCiviles: any[] = ['Soltero', 'Casado', 'Divorciado'];
  myForm: FormGroup;
  constructor(private builder: FormBuilder, private empleadoService: EmpleadoService) {
    this.myForm = builder.group({
      nombre: [''],
      correo: [''],
      fechaIngreso: [''],
      telefono: [''],
      estadoCivil: [''],
      sexo: [''],
    });
  }

  ngOnInit(): void {
  }

  guardarEmpleado() {
    const empleado: Empleado = {
      nombreCompleto: this.myForm.get('nombre')?.value,
      correo: this.myForm.get('correo')?.value,
      fechaIngreso: this.myForm.get('fechaIngreso')?.value,
      telefono: this.myForm.get('telefono')?.value,
      estadoCivil: this.myForm.get('estadoCivil')?.value,
      sexo: this.myForm.get('sexo')?.value,
    }
    this.empleadoService.agregarEmpleado(empleado);
  }

}
