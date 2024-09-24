export type IPermission = {
  id: string;
  created_at: string;
  role: "user" | "admin";
  status: "active" | "resigned";
  member_id: string;
  member: {
    id: string;
    created_at: string;
    name: string;
    email: string;
  }
}

export type ITodo = {
  id: string;
  title: string;
  completed: boolean;
  created_at: string;
  member: {
    id: string;
    created_at: string;
    name: string;
    email: string;
  };
};