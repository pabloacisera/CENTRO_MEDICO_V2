import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard-profesional',
  standalone: true,
  imports: [RouterLink],
  providers: [ToastrService],
  templateUrl: './dashboard-profesional.component.html',
  styleUrl: './dashboard-profesional.component.css'
})
export class DashboardProfesionalComponent implements OnInit {


  userId: number = 0;

  constructor(private socket: Socket, private Toastr: ToastrService,
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.socket.fromEvent(`profesional-${this.userId}`).subscribe((mensaje: string) => {
      this.Toastr.success(mensaje);
    })
  }

  obtenerIdUsuario() {
    const userData = localStorage.getItem('userData');

    if (userData) {
      const userDataObj = JSON.parse(userData);
      this.userId = userDataObj.id;
    }
  }

  salir(){
    localStorage.removeItem('Id de cliente')
    localStorage.removeItem('Id de usuario')
    localStorage.removeItem('userData')
    localStorage.removeItem('token')
    this.route.navigate(['/home'])
  }
}
