import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WorkflowService } from 'src/app/shared/workflow.service';

@Component({
  selector: 'app-model-view-list',
  templateUrl: './model-view-list.component.html',
  styleUrls: ['./model-view-list.component.css']
})
export class ModelViewListComponent implements OnInit {

  closeResult = '';

  constructor(private modalService: NgbModal,public workflow:WorkflowService) { }

  ngOnInit(): void {
  }
  
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }










}
