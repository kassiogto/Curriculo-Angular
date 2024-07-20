import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { LocalStorageService } from '../../services/local-storage.service';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { v4 as uuidv4 } from 'uuid';
import { CardModule } from 'primeng/card';

interface Task {
  id: string;
  name: string;
  status: boolean;
}

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    RippleModule,
    TableModule,
    TagModule,
    CardModule,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  constructor(private localStorageService: LocalStorageService) {}

  model = {
    label: '',
  };
  error: string = '';
  items: Task[] = [];

  selectedTask?: Task;

  onSubmit(form: NgForm) {
    if (this.selectedTask) {
      this.items = this.items.map((item) => {
        if (item.id === this.selectedTask?.id) {
          return {
            id: this.selectedTask?.id,
            name: this.model.label,
            status: item.status,
          };
        } else {
          return item;
        }
      });
      this.saveData();
      form.reset();
      this.selectedTask = undefined;
    } else if (this.model.label === '') {
      this.error = 'Preencha o campo!';
    } else {
      if (this.model.label.length <= 3) {
        this.error = 'O campo precisa ter no mínimo 4 letras';
      } else {
        const id = uuidv4();
        this.error = '';
        this.items.push({ id, name: this.model.label, status: false });
        this.saveData();
        form.reset();
      }
    }
  }

  ngOnInit() {
    this.items = this.getData() || [];
  }

  saveData() {
    this.localStorageService.setItem('tasks', this.items);
  }

  getData() {
    const tasks = this.localStorageService.getItem('tasks');

    return tasks;
  }

  removeData(item: Task) {
    this.items = this.items.filter((e) => e.id !== item.id);
    this.saveData();
  }

  clearData() {
    this.localStorageService.clear();
  }

  changeStatus(item: Task) {
    this.items = this.items.map((e) => {
      if (e.id === item.id) {
        return {
          id: item.id,
          name: item.name,
          status: !item.status,
        };
      } else {
        return e;
      }
    });

    this.saveData();
  }

  setSelectedTask(item: Task) {
    this.selectedTask = item;
    this.model.label = item.name;
  }

  getSeverity(status: boolean) {
    switch (status.toString()) {
      case 'true':
        return 'success';
      case 'false':
        return 'danger';
      default:
        return undefined;
    }
  }
}
