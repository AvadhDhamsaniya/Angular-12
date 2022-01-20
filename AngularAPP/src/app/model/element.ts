import { Guid } from 'guid-typescript';

export class Element {
    type!: string
    label!: string
    icon!: string
    reportingLable!: string
    placeholder!: string
    displayName!: string
    bind!: string
    required!: string
    prePopulate!: string
    hasDefaultValue!: string
    elementUniqId!: Guid
}