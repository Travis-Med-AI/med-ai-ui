import { Component, OnInit } from '@angular/core';
import { MonitorService } from '../services/monitor.service';
import { interval, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {
  notifier = new Subject()
  gpuInfo;
  cpuInfo;
  constructor(private monitorService: MonitorService) { }

  ngOnInit(): void {
    interval(2000).pipe(
      startWith(0),
      takeUntil(this.notifier),
      switchMap(() => this.monitorService.getGpuInfo())
    ).subscribe(gpuInfo => this.gpuInfo = gpuInfo)

    interval(5000).pipe(
      startWith(0),
      takeUntil(this.notifier),
      switchMap(() => this.monitorService.getCpuInfo())
    ).subscribe(cpuInfo => this.cpuInfo = cpuInfo)
  }

  ngOnDestroy() {
    this.notifier.next()
    this.notifier.complete()
  }
}
