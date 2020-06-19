import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

interface EmployeeResponce {
  status:string;
  data:[{
    id: number
    employee_name: string
    employee_salary: number
    employee_age: number
    profile_image: string
  }]
}

@Component({
  selector: 'app-employee-component',
  templateUrl: './employee-component.component.html',
  styleUrls: ['./employee-component.component.css']
})

export class EmployeeComponentComponent implements OnInit {
  number;
  save="Save";
  tablelick:boolean;


employee = new FormGroup({
    id:new FormControl("",Validators.required),
    employee_name:new FormControl("",Validators.required),
    employee_salary:new FormControl("",Validators.required),
    employee_age:new FormControl("",Validators.required),
    profile_image:new FormControl("")
  });

  employees:any[];
  private url='http://dummy.restapiexample.com/api/v1';

  constructor(
    private route:ActivatedRoute,
    private http:HttpClient) {
  }

  ngOnInit(): void {
    this.getcustomers();
  }

  getcustomers(){
    this.http.get<EmployeeResponce>(this.url+'/employees')
      .subscribe((responce) => {
         this.employees= responce.data;
      });
  }

  btnDeleteClick($event,employee) {
    $event.stopPropagation();
    if (confirm("Do You Wish To Delete This Customer..!")) {
      this.http.delete(this.url + '/delete/' + employee.id)
        .subscribe(val => {
          let number = this.employees.indexOf(employee);
          this.employees.splice(number, 1);
          this.employee.reset();
          this.tablelick = false;
          this.save = "Save";
        });
    }
  }

  saveCustomer() {
    if(this.tablelick){
      this.http.put(this.url+'/update/'+ this.employee.value.id, this.employee.value)
        .subscribe(response => {
          this.employees.splice(this.number,1,this.employee.value)
          this.employee.reset();
          this.tablelick=false;
          this.save="save";
        });

    }else {
      console.log(this.employee.value);
      this.http.post(this.url+'/create',JSON.stringify(this.employee.value))
        .subscribe(response => {
          console.log(response);
          this.employees.push(this.employee.value);
          this.employee.reset();
        });
    }
  }

  tableClick(employee) {
    this.save="update"
    this.tablelick=true;
    this.number = this.employees.indexOf(employee);
    console.log(employee.name);
    this.employee.patchValue({
      id:employee.id,
      employee_name:employee.employee_name,
      employee_salary:employee.employee_salary,
      employee_age:employee.employee_age,
    });
  }

  clearClick() {
    this.save="save"
    this.tablelick=false;
  }

  searchEmployee(search: HTMLInputElement) {
    this.http.get<EmployeeResponce>(this.url+'/employee/'+search.value)
      .subscribe((responce) => {
        this.employees= responce.data;
      });
  }
}
