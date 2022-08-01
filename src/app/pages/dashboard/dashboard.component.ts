import { Component, OnInit } from '@angular/core'
import { Select, Store } from '@ngxs/store'
import { SettingState, SettingStateModel } from '../../store/setting_ngxs/setting.state.'
import { Observable } from 'rxjs'
import { SetStateActionNgxs } from '../../store/setting_ngxs/actions'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  listOfData: any[] = []
  bordered = false
  loading = false
  sizeChanger = false
  pagination = true
  header = true
  title = true
  footer = true
  fixHeader = false
  size = 'small'
  expandable = true
  checkbox = true
  allChecked = false
  indeterminate = false
  displayData: any[] = []
  simple = false
  noResult = false
  position = 'bottom'
  constructor(private store: Store) {}
  currentPageDataChange(
    $event: Array<{
      name: string
      age: number
      address: string
      checked: boolean
      expand: boolean
      description: string
    }>,
  ): void {
    this.displayData = $event
    this.refreshStatus()
  }

  refreshStatus(): void {
    const validData = this.displayData.filter(value => !value.disabled)
    const allChecked = validData.length > 0 && validData.every(value => value.checked === true)
    const allUnChecked = validData.every(value => !value.checked)
    this.allChecked = allChecked
    this.indeterminate = !allChecked && !allUnChecked
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value
      }
    })
    this.refreshStatus()
  }

  ngOnInit(): void {
    for (let i = 1; i <= 100; i++) {
      this.listOfData.push({
        name: 'John Brown',
        age: `${i}2`,
        address: `New York No. ${i} Lake Park`,
        description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
        checked: false,
        expand: false,
      })
    }
  }

  noResultChange(status: boolean): void {
    this.listOfData = []
    if (!status) {
      this.ngOnInit()
    }
  }
}
