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
  id;
  employee_name;
  employee_salary;
  employee_age;
  profile_image;

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

/*  getSpecificcustomers(){
    this.http.get(this.url+'/employee/'+)
      .subscribe(responce => {
        console.log(responce);

        /!*if(responce.length==0){
          this.desableForword=true;
        }else {
          this.desableForword=false;
        }*!/
      });
  }*/

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
      this.http.post(this.url+'/create', this.employee.value)
        .subscribe(response => {
          this.employees.push(this.employee.value);
          this.employee.reset();
        });
    }
  }

  tableClick(employee) {
    this.save="update"
    this.tablelick=true;
    this.number = this.employees.indexOf(employee);
    this.id=employee.id;
    this.employee_name=employee.name;
    this.employee_salary=employee.address;
    this.employee_age=employee.age;
  }

  clearClick() {
    this.save="save"
    this.tablelick=false;
  }
}
