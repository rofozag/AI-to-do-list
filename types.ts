export interface Task {
  id: string;
  text: string;
  completed: boolean;
  dueDate?: string | null;
}
