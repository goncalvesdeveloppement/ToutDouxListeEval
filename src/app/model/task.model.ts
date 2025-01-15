import { Category } from "./category.model";

export class Task {
    id: number;
    name: string;
    description: string;
    deadline: Date;
    status: string;
    categories: Category[]; // Nouvelles catégories associées

    constructor(id: number, name: string, description: string, deadline: Date, status: string, categories: Category[] = []) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.deadline = deadline;
        this.status = status;
        this.categories = categories;
    }
}
