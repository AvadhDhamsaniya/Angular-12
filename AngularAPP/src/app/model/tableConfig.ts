import { Observable } from "rxjs"
import { TableColumn } from "./tableColumn"

export class TableConfig {
    columns!: TableColumn[]
    displayedColumns !: string[]
    dataTableService !: any
    defaultSort: any = {
        field!: "",
        direction!: ""
    }
    buttons!: any[]
    expandButton!: any
}
