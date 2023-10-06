interface base {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends base {
  description: string;
  kind: "basic";
}

interface CoursePartGroup extends base {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends base {
  description: string;
  backgroundMaterial: string;
  kind: "background";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground;
