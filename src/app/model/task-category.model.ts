export class TaskCategory {
    taskId: number;
    categoryId: number;

    constructor(taskId: number, categoryId: number) {
        this.taskId = taskId;
        this.categoryId = categoryId;
    }
}
