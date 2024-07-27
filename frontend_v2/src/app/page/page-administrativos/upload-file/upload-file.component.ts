import { Component, OnInit } from '@angular/core';
import { UploadFileService } from './uploadFile.service';
import { UploadFilePipe } from '../upload-file.pipe';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  standalone: true,
  selector: 'app-upload-file',
  imports: [
    UploadFilePipe,
    CommonModule,
    InputTextModule,
    TableModule,
    ButtonModule,
    FileUploadModule,
  ],
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  public clientes = [];
  public email: string;
  public isLoading: boolean = false;
  id_cliente: number = 0;
  public page: number = 0;
  public nombre: string = '';
  public text: string = '';
  file: File | null = null;
  success: boolean = false;
  error: boolean = false;

  constructor(private readonly service: UploadFileService,
              private readonly fileUpload: UploadFileService) { }

  ngOnInit() {
    this.recolectarMetodos();
  }

  recolectarMetodos() {
    this.obtenerTodosLosClientes();
  }

  obtenerTodosLosClientes() {
    this.isLoading = true;
    this.service.obtenerManyClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        console.log('Datos de cliente: ', this.clientes);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al obtener clientes', error);
        this.isLoading = false;
      }
    });
  }

  capturarId(id: number) {
    this.id_cliente = id;
    console.log(this.id_cliente);
    this.obtenerNombrePorId(this.id_cliente);
  }

  obtenerNombrePorId(id_cliente: number) {
    const cliente = this.clientes.find(cliente => cliente.id === id_cliente);
    if (cliente) {
      this.nombre = cliente.nombre;
    } else {
      console.error("Cliente no encontrado");
    }
  }

  nextPage() {
    this.page += 5;
  }

  prevPage() {
    if (this.page > 0) {
      this.page -= 5;
    }
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  searchTerm(text: string) {
    this.text = text;
    console.log('Palabra para buscar:', this.text);
  }

  async cargarDoc() {
    if (this.file && this.id_cliente) {
      const clienteId = Number(this.id_cliente)
      console.log('Tipo de id: ', typeof clienteId)
      this.fileUpload.createFile(this.file, clienteId).subscribe({
        next: (response) => {
          if (response.data.success) { 
            this.success = true;
            this.error = false;
            setTimeout(() => {
              this.success = false; 
            }, 5000);
          } else {
            this.error = true;
            console.error('Error al guardar el archivo: ', response.data.message);
          }
        },
        error: (err) => {
          console.error('Error al cargar el archivo: ', err);
          this.error = true;
        }
      });
    } else {
      console.error('No hay archivo seleccionado o ID de cliente no está definido.');
    }
  }   
}

