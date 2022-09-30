import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Student } from './student';
import { StudentService } from './student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'studentManagementSystemFront';

  public student: Student[] = [];
  public updatableStudent: Student | undefined;
  public deletableStudent: Student | undefined;

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

  public onAddStudent(formData: NgForm): void{
    document.getElementById('add-student-form')?.click();
    console.log(formData.value);
    this.studentService.addStudent(formData.value).subscribe(
      (response: Student) => {
        console.log(response);
        this.getStudent();
        formData.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public onChangeStudent(formData: NgForm): void{
    document.getElementById('change-student-form')?.click();
    console.log(formData.value);
    this.studentService.updateStudent(formData.value).subscribe(
      (response: Student) => {
        console.log(response);
        this.getStudent();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public onDeleteStudent(studentId: any): void{
    document.getElementById('delete-student-form')?.click();
    console.log(studentId);
    this.studentService.deleteStudent(studentId).subscribe(
      (response: void) => {
        console.log();
        this.getStudent();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public searchStudent(key: string): void{
    console.log(key);
    let results : Student[] = [];
    for(let eachStudent of this.student){
      if(
        eachStudent.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || eachStudent.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || eachStudent.phoneNumber.indexOf(key) !== -1
      ){
        results.push(eachStudent);
      }
    }
    this.student = results;
    if(!key){
      this.getStudent();
    }
    if(results.length === 0){
      this.student = [];
    }
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
      this.updatableStudent = student;
      button.setAttribute('data-bs-target', '#changeStudentModal');
    }
    if(typeOfModel === 'deletestudent'){
      this.deletableStudent = student;
      button.setAttribute('data-bs-target', '#deleteStudentModal');
    }
    container?.appendChild(button);
    button.click();
    console.log(button.click())
  }
}
