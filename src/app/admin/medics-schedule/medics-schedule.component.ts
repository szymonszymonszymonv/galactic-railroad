import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medics-schedule',
  templateUrl: './medics-schedule.component.html',
  styleUrls: ['./medics-schedule.component.sass']
})
export class MedicsScheduleComponent implements OnInit {

  currentDate: Date = new Date()

  EVENT_SIZE: number = 6
  START_HOUR: number = 8

  events: any = [
    {
      event: {
        startingDate: new Date("2022-07-20T08:20:00"),
        endingDate: new Date("2022-07-20T09:00:00")
      },
      height: 1,
      margin: 1
    },
    {
      event: {
        startingDate: new Date("2022-07-20T09:30:00"),
        endingDate: new Date("2022-07-20T11:00:00")
      },
      height: 1,
      margin: 1
    },
    {
      event: {
        startingDate: new Date("2022-07-20T11:00:00"),
        endingDate: new Date("2022-07-20T14:00:00")
      },
      height: 1,
      margin: 1
    },
    {
      event: {
        startingDate: new Date("2022-07-20T14:38:00"),
        endingDate: new Date("2022-07-20T15:00:00")
      },
      height: 1,
      margin: 1
    },
    {
      event: {
        startingDate: new Date("2022-07-20T15:30:00"),
        endingDate: new Date("2022-07-20T15:50:00")
      },
      height: 1,
      margin: 1
    }
  ]
  
  constructor() { }

  ngOnInit(): void {
    this.initializeMarginsSizes()
  }

  initializeMarginsSizes(): void {
    for(let i = 0; i < this.events.length; i++) {

      // set height
      let timeDiff = this.events[i].event.endingDate.getTime() - this.events[i].event.startingDate.getTime()
      let timeInMinutes = timeDiff / (1000 * 60)
      this.events[i].height = (this.EVENT_SIZE * timeInMinutes / 60)
      if(this.events[i].height > 6) {
        // ??? witchcraft
        this.events[i].height += Math.ceil(this.events[i].height / 6) - 1
      }
      this.events[i].height = this.events[i].height.toFixed(2)
      
      // set margin
      if(i === 0) {
        // if no previous event, difference in time between current event and START_HOUR
        let startTime = new Date(this.events[i].event.startingDate)
        startTime.setHours(this.START_HOUR)
        startTime.setMinutes(0)

        timeDiff = this.events[i].event.startingDate.getTime() - startTime.getTime()
        timeInMinutes = timeDiff / (1000 * 60)
      }
      else {
        // difference in time between current and previous event
        timeDiff = this.events[i].event.startingDate.getTime() - this.events[i - 1].event.endingDate.getTime()
        timeInMinutes = timeDiff / (1000 * 60)
      }
      this.events[i].margin = (this.EVENT_SIZE * timeInMinutes / 60).toFixed(2)

      // make it rem
      this.events[i].margin = this.events[i].margin + "rem" 
      this.events[i].height = this.events[i].height + "rem"
    }
  }

}
