import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { FormAnswers } from 'src/app/model/formAnswer';
import { FormDesign } from 'src/app/model/formDesign';
import { FormAnswerService } from 'src/app/services/form-answer.service';

@Component({
  selector: 'app-form-fill',
  templateUrl: './form-fill.component.html',
  styleUrls: ['./form-fill.component.css',
    '../../../../styles/bootstrap.css',
    '../../../../styles/bootstrap-theme.css']
})
export class FormFillComponent implements OnInit {

  moduleId: number = 0;
  eventId: number = 0;
  formAnswerId: number = 0;
  formDesignId: number = 0;
  designData: JSON[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private formAnswerService: FormAnswerService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      map((res: any) => {
        this.moduleId = parseInt(res.moduleId);
        this.getDesign();
      })
    ).subscribe();
  }

  getDesign() {
    this.formAnswerService.getDesignOfFirstForm(this.moduleId).pipe(
      map((res: FormDesign) => {
        if (res) {
          this.formDesignId = res.id;
          this.designData = JSON.parse(res.designData);
        }
      })
    ).subscribe();
  }

  goToPreviousRoute() {
    this.location.back();
  }

  saveForm(isDraft: boolean) {
    var formAnswer = new FormAnswers();
    formAnswer.eventId = this.eventId
    formAnswer.isDraft = isDraft;
    formAnswer.id = this.formAnswerId;
    formAnswer.formDesignId = this.formDesignId;
    formAnswer.answerData = "";
    this.formAnswerService.create(this.moduleId, formAnswer).pipe(
      map((res: any) => {

      })
    ).subscribe();
  }
}
