import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleado } from 'src/app/models/empleado';
import { MatDialog } from '@angular/material/dialog';
import { MensajeConfirmacionComponent } from '../shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-empleado',
  templateUrl: './list-empleado.component.html',
  styleUrls: ['./list-empleado.component.css']
})
export class ListEmpleadoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['nombreCompleto', 'telefono', 'correo', 'fechaIngreso', 'estadoCivil', 'sexo', 'acciones'];
  dataSource = new MatTableDataSource(this.empleadoService.getEmpleados());
  empleados: Empleado[] = [];

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private empleadoService: EmpleadoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cargarEmpleados();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  cargarEmpleados() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.empleados = this.empleadoService.getEmpleados();
    this.dataSource = new MatTableDataSource(this.empleados);
  }

  eliminarEmpleado(index: number) {

    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: { mensaje: 'Esta seguro que desea eliminar el empleado' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'aceptar') {
        this.empleadoService.eliminarEmpleado(index);
        this.cargarEmpleados();
        this._snackBar.open('Empleado eliminado correctamente', 'Eliminar Empleado', {
          duration: 2000
        });
      }
    });
  }
}