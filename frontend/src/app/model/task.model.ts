import { Category } from "./category.model";
import { User } from "./user.model";

export class Task {
    id: number;
    name: string;
    description: string;
    deadline: Date;
    status: string;
    categories: Category[];
    owner: User;

    constructor(id: number, name: string, description: string, deadline: Date, status: string, categories: Category[] = [], owner: User) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.deadline = deadline;
        this.status = status;
        this.categories = categories;
        this.owner = owner;
    }
}
