import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Student } from './student';
import { StudentService } from './student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'studentManagementSystemFront';

  public student: Student[] | undefined;

  constructor(private studentService: StudentService){}
  
  ngOnInit(): void {
    this.getStudent();
  }

  

  public getStudent(): void {
    this.studentService.getStudent().subscribe(
      (response: Student[]) => {
        this.student = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModel(student: any, typeOfModel: string ): void{  // creating the relevent model to the clicked item 
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button'; 
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if(typeOfModel === 'addstudent'){
      button.setAttribute('data-bs-target', '#addStudentModal');
    }
    if(typeOfModel === 'changestudent'){
      button.setAttribute('data-bs-target', '#changeStudentModal');
    }
    if(typeOfModel === 'deletestudent'){
      button.setAttribute('data-bs-target', '#deleteStudentModal');
    }
    container?.appendChild(button);
    button.click();
    console.log(button.click())
  }
}
