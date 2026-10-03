export type Status = "published" | "soon";
export type LabelSide = "l" | "r" | "t" | "b";

export interface Station {
  slug: string;
  title: string;
  long_title: string;
  summary: string;
  x: number; // toạ độ trên bản đồ (viewBox 960x1060)
  y: number;
  status: Status;
  label: LabelSide;
}

export interface Line {
  id: string;
  name: string;
  tagline: string;
  colors: [string, string]; // gradient đầu -> cuối
  routes: string[][]; // mỗi route là 1 chuỗi slug; nhiều route = tuyến có nhánh
  elbow?: "h" | "v"; // khi 2 station lệch cả x lẫn y: đi ngang trước hay dọc trước
}