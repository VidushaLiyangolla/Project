import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../../_interfaces/user";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../_service/user.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  progress: boolean = false;
  error: string = '';
  users: User[] = [];

  filteredUsers: User[] = [];
  filter: FormControl = new FormControl('');

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private userData: UserService
  ) {
  }

  ngOnInit(): void {

    this.filter.valueChanges.subscribe(value => this._filter(value));

    this.progress = true;
    this.userData.getUsers().subscribe({
      next: (response: User[]) => this.filteredUsers = this.users = response,
      error: error => this.error = error.message
    }).add(() => this.progress = false);

  }

  openDialog(user: User | null): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      data: user,
      panelClass: 'dialog-container'
    });

    dialogRef.afterClosed().subscribe(user => {
      if (user) {
        if (user.updated) {
          const oldUser = this.users.find(t => t.id === user.id);
          const index = this.users.indexOf(oldUser!);
          this.users[index] = user;
        } else {
          this.users.unshift(user);
        }
        this.snackBar.open(`User successfully ${user.updated ? "updated." : "saved."}.`, "OK", {duration: 5000})
      }
    });

  }

  deleteUser(user: User) {
    if (confirm("Are you sure you want to delete this user?")) {
      this.userData.deleteUser(user.id).subscribe({
        next: () => {
          this.users.splice(this.users.indexOf(user), 1);
          this.filteredUsers = this.users;
          this.snackBar.open("User successfully deleted..!", "OK", {duration: 3000});
        },
        error: error => {
          this.snackBar.open("Unable to delete. " + error.message, "OK", {duration: 5000})
        }
      })
    }
  }

  _filter(value: string): void {
    const filterValue = value.trim().toLowerCase();
    this.filteredUsers = this.users.filter((user: User) =>
      user.firstName.toLowerCase().includes(filterValue) || user.lastName.toLowerCase().includes(filterValue)
    );
  }

}

@Component({
  selector: 'add-user-dialog',
  templateUrl: 'add-user-dialog.html',
})

export class AddUserDialogComponent implements OnInit {

  progress: boolean = false;
  error: string = '';

  userForm!: FormGroup;

  constructor(
    private userData: UserService,
    private dialogRef: MatDialogRef<AddUserDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public user: User,
  ) {
    this.userForm = this.formBuilder.group({
      firstName: [this.user?.firstName, Validators.required],
      lastName: [this.user?.lastName, Validators.required],
      accountNo: [this.user?.accountNo, [Validators.required, Validators.pattern(/^[0-9]{10}/)]],
      address: [this.user?.address, Validators.required],
      phone: [this.user?.phone, Validators.pattern(/^(0|\+94)[0-9]{9}$/)],
    });
  }

  ngOnInit() {
  }

  save(): void {
    if (this.userForm.valid) {

      this.progress = true;
      this.error = '';

      const res = (response: User) => {
        const user: User = response;
        user.new = true;
        user.updated = !!this.user;
        this.dialogRef.close(user);
      }

      const err = (error: any) => {
        this.error = error.message;
      }

      if (this.user) {
        const user = this.userForm.value;
        user.id = this.user.id;
        this.userData.editUser(user).subscribe({
          next: res,
          error: err
        }).add(() => this.progress = false);
      }else {
        this.userData.addUser(this.userForm.value).subscribe({
          next: res,
          error: err
        }).add(() => this.progress = false);
      }

    }
  }

  get firstName(): AbstractControl | null {
    return this.userForm.get('firstName');
  }

  get lastName(): AbstractControl | null {
    return this.userForm.get('lastName');
  }

  get phone(): AbstractControl | null {
    return this.userForm.get('phone');
  }

  get accountNo(): AbstractControl | null {
    return this.userForm.get('accountNo');
  }

  get address(): AbstractControl | null {
    return this.userForm.get('address');
  }

}
