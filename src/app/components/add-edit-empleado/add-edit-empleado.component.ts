import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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
  idEmpleado: any;
  accion = 'Crear';
  myForm: FormGroup;
  constructor(private builder: FormBuilder, private empleadoService: EmpleadoService,
    private router: Router, private _snackBar: MatSnackBar, private aRouter: ActivatedRoute
  ) {
    this.myForm = builder.group({
      nombre: ['', [Validators.required, Validators.maxLength(20)]],
      correo: ['', [Validators.required, Validators.email]],
      fechaIngreso: ['', Validators.required],
      telefono: ['', Validators.required],
      estadoCivil: ['', Validators.required],
      sexo: ['', Validators.required],
    });

    this.idEmpleado = this.aRouter.snapshot.params['id'];
  }

  ngOnInit(): void {
    if (this.idEmpleado !== undefined) {
      this.accion = 'Editar';
      this.empleadoEditar();
    } else {
      this.accion = 'Crear';

    }
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
    this.router.navigate(['/'])

    if (this.idEmpleado !== undefined) {
      this._snackBar.open('Empleado editado correctamente', 'Editar Empleado', {
        duration: 2000
      });
    } else {
      this._snackBar.open('Empleado creado correctamente', 'Crear Empleado', {
        duration: 2000
      });
    }
  }

  empleadoEditar() {
    const empleadoEdit: Empleado = this.empleadoService.getEmpleado(this.idEmpleado);
    this.myForm.patchValue({
      nombre: empleadoEdit.nombreCompleto,
      correo: empleadoEdit.correo,
      fechaIngreso: empleadoEdit.fechaIngreso,
      telefono: empleadoEdit.telefono,
      estadoCivil: empleadoEdit.estadoCivil,
      sexo: empleadoEdit.sexo
    })
  }
}
