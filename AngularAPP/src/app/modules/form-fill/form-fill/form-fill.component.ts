import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
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
  designData: JSON[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private formAnswerService: FormAnswerService
  ) {
    this.moduleId = parseInt(this.activatedRoute.snapshot.paramMap.get("moduleId") || "0");
  }

  ngOnInit(): void {
    this.getDesign();
  }

  getDesign() {
    this.formAnswerService.getDesignOfFirstForm(this.moduleId).pipe(
      map((res: FormDesign) => {
        if (res) {
          this.designData = JSON.parse(res.designData);
        }
      })
    ).subscribe();
  }
}
