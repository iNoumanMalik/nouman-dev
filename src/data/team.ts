export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarType: "male" | "female" | "neutral";
  avatar?: string;
  department?: string;
  children?: TeamMember[];
}

// CEO
import m1Avatar from "../assets/avatars/ceo/m1.svg";

// Seniors
import seniorF1 from "../assets/avatars/seniors/f1.svg";
import seniorF2 from "../assets/avatars/seniors/f2.svg";
import seniorM1 from "../assets/avatars/seniors/m1.svg";
import seniorM2 from "../assets/avatars/seniors/m2.svg";
import seniorM3 from "../assets/avatars/seniors/m3.svg";
import seniorM4 from "../assets/avatars/seniors/m4.svg";
import seniorM5 from "../assets/avatars/seniors/m5.svg";

// Juniors - Males (9)
import juniorM1 from "../assets/avatars/juniors/males/m1.svg";
import juniorM2 from "../assets/avatars/juniors/males/m2.svg";
import juniorM3 from "../assets/avatars/juniors/males/m3.svg";
import juniorM4 from "../assets/avatars/juniors/males/m4.svg";
import juniorM5 from "../assets/avatars/juniors/males/m5.svg";
import juniorM6 from "../assets/avatars/juniors/males/m6.svg";
import juniorM7 from "../assets/avatars/juniors/males/m7.svg";
import juniorM8 from "../assets/avatars/juniors/males/m8.svg";
import juniorM9 from "../assets/avatars/juniors/males/m9.svg";

// Juniors - Females (7)
import juniorF1 from "../assets/avatars/juniors/females/f1.svg";
import juniorF2 from "../assets/avatars/juniors/females/f2.svg";
import juniorF3 from "../assets/avatars/juniors/females/f3.svg";
import juniorF4 from "../assets/avatars/juniors/females/f4.svg";
import juniorF5 from "../assets/avatars/juniors/females/f5.svg";
import juniorF6 from "../assets/avatars/juniors/females/f6.svg";
import juniorF7 from "../assets/avatars/juniors/females/f7.svg";

export const teamHierarchy: TeamMember = {
  id: "ceo",
  name: "Nouman",
  role: "CEO / Founder",
  avatarType: "neutral",
  avatar: m1Avatar,
  children: [
    {
      id: "backend-team",
      name: "Raza Qureshi",
      role: "Backend Lead",
      avatarType: "male",
      avatar: seniorM1,
      department: "Backend",
      children: [
        {
          id: "backend-dev",
          name: "Ahmed Hassan",
          role: "Developer",
          avatarType: "male",
          avatar: juniorM1,
        },
        {
          id: "ai-engineer",
          name: "Fatima Khan",
          role: "AI Engineer",
          avatarType: "female",
          avatar: juniorF1,
        },
        {
          id: "devops",
          name: "Bilal Ahmed",
          role: "DevOps",
          avatarType: "male",
          avatar: juniorM2,
        },
        {
          id: "qa",
          name: "Ayesha Ali",
          role: "QA Engineer",
          avatarType: "female",
          avatar: juniorF2,
        },
      ],
    },
    {
      id: "frontend-team",
      name: "Syed Mustafa",
      role: "Frontend Lead",
      avatarType: "male",
      avatar: seniorM4,
      department: "Frontend",
      children: [
        {
          id: "react-dev",
          name: "Usman Malik",
          role: "React Developer",
          avatarType: "male",
          avatar: juniorM3,
        },
        {
          id: "ui-engineer",
          name: "Zara Tariq",
          role: "UI Engineer",
          avatarType: "female",
          avatar: juniorF3,
        },
        {
          id: "mobile-dev",
          name: "Ali Raza",
          role: "Mobile Developer",
          avatarType: "male",
          avatar: juniorM4,
        },
      ],
    },
    {
      id: "design-lead",
      name: "Maria Khan",
      role: "Design Lead",
      avatarType: "female",
      avatar: seniorF1,
      department: "Design",
      children: [
        {
          id: "ui-designer",
          name: "Sana Iqbal",
          role: "UI Designer",
          avatarType: "female",
          avatar: juniorF7,
        },
        {
          id: "graphic-designer",
          name: "Omar Farooq",
          role: "Graphic Designer",
          avatarType: "male",
          avatar: juniorM5,
        },
      ],
    },
    {
      id: "product",
      name: "Muhammad Awais",
      role: "Product Director",
      avatarType: "male",
      avatar: seniorM2,
      department: "Product",
      children: [
        {
          id: "product-manager",
          name: "Hira Imran",
          role: "Product Manager",
          avatarType: "female",
          avatar: juniorF5,
        },
        {
          id: "project-manager",
          name: "Taha Siddiqui",
          role: "Project Manager",
          avatarType: "male",
          avatar: juniorM6,
        },
        {
          id: "architect",
          name: "Imran Shaikh",
          role: "Architect",
          avatarType: "male",
          avatar: juniorM7,
        },
      ],
    },
    {
      id: "marketing-lead",
      name: "Danish Ahmed",
      role: "Marketing Lead",
      avatarType: "male",
      avatar: seniorM3,
      department: "Marketing",
      children: [
        {
          id: "content",
          name: "Mariam Shah",
          role: "Content",
          avatarType: "female",
          avatar: juniorF6,
        },
        {
          id: "sales",
          name: "Hassan Abbas",
          role: "Sales",
          avatarType: "male",
          avatar: juniorM8,
        },
        {
          id: "sdr",
          name: "Hassan Raza",
          role: "SDR",
          avatarType: "male",
          avatar: juniorM9,
        },
      ],
    },
    {
      id: "hr",
      name: "Samina Farooq",
      role: "HR Manager",
      avatarType: "female",
      avatar: seniorF2,
      department: "HR",
      children: [
        {
          id: "hr-specialist",
          name: "Samina Javed",
          role: "HR Specialist",
          avatarType: "female",
          avatar: juniorF4,
        },
      ],
    },
  ],
};
