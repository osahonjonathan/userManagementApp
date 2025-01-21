import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { IUser } from '../../model/user.model';

@Component({
  selector: 'app-user-list',
  imports: [NgClass, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  isModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;
  modalTitle = '';

  userData = { name: '', email: '', role: '', department: '', application: 0 };
  roles = ['Admin', 'Editor', 'Viewer'];
  showCreateMode: boolean = false;
  showEditMode: boolean = false;
  showSuccessToast: boolean = false;
  showDangerToast: boolean = false;
  Math = Math;
  users: IUser[] = [];
  userId!: number;

  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 10;
  pages: number[] = [];
  totalPages: any;
  showToastMessage: string = '';

  private userService = inject(UserService);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.userService.getAllUsers();
    this.totalItems = this.users.length;
    this.calculatePages();
  }

  openCreateModal() {
    this.modalTitle = 'Create User';
    this.showCreateMode = true;
    this.userData = {
      name: '',
      email: '',
      role: '',
      department: '',
      application: 0,
    };
    this.isModalOpen = true;
  }

  openEditModal(id: number) {
    console.log(id);
    this.userId = id;

    const user = this.users.find((user) => user.id === id);
    console.log(user);

    this.modalTitle = 'Edit User';
    this.showCreateMode = false;

    this.userData = {
      name: user?.name || '',
      email: user?.email || '',
      role: user?.role || '',
      department: user?.department || '',
      application: user?.application || 0,
    };

    this.isModalOpen = true;
  }

  closeModal() {
    this.showEditMode = true;
    this.isModalOpen = false;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
  }

  handleSubmit(form: any) {
    if (form.valid) {
      if (this.modalTitle === 'Create User') {
        console.log('Creating User:', this.userData);
        this.addUser(this.userData);
      } else if (this.modalTitle === 'Edit User') {
        console.log('Editing User:', this.userData);
        this.updateUser(this.userId, this.userData);
      }
      form.reset();
      this.closeModal();
    }
  }

  addUser(newUser: Partial<IUser>) {
    this.userService.addUser(newUser);
    this.loadUsers();
    this.showToastMessage = 'User Created Successfully';
    this.showSuccessToast = true;

    setTimeout(() => {
      this.showSuccessToast = false;
    }, 3000);
  }

  updateUser(id: number, updatedUser: Partial<IUser>) {
    this.userService.updateUser(id, updatedUser);
    this.loadUsers();
    this.showToastMessage = 'User Edited Successfully';
    this.showSuccessToast = true;

    setTimeout(() => {
      this.showSuccessToast = false;
    }, 3000);
  }

  openDeleteModal(id: number) {
    console.log('hxixi');
    this.userId = id;
    this.isDeleteModalOpen = true;
  }

  deleteUser() {
    console.log('delete');
    this.userService.deleteUser(this.userId);
    this.loadUsers();
    console.log(this.users);
    this.closeDeleteModal();
    this.showToastMessage = 'User Deleted Successfully';
    this.showDangerToast = true;

    setTimeout(() => {
      this.showDangerToast = false;
    }, 3000);
  }

  get paginatedUser() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.users.slice(startIndex, endIndex);
  }

  calculatePages() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  nextPage() {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage = this.currentPage + 1;
    } else {
      console.warn('You are already on the last page.');
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
    } else {
      console.warn('You are already on the first page.');
    }
  }
  changePage(page: number) {
    console.log(page);
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }
}
