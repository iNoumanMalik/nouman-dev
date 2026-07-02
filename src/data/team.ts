export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarType: "male" | "female" | "neutral";
  avatar?: string;
  department?: string;
  children?: TeamMember[];
}

import m1Avatar from "../assets/avatars/m1.svg";
import m2Avatar from "../assets/avatars/m2.svg";
import m3Avatar from "../assets/avatars/m3.svg";
import m4Avatar from "../assets/avatars/m4.svg";
import m5Avatar from "../assets/avatars/m5.svg";
import f1Avatar from "../assets/avatars/f1.svg";
import f2Avatar from "../assets/avatars/f2.svg";
import f3Avatar from "../assets/avatars/f3.svg";
import f4Avatar from "../assets/avatars/f4.svg";
import f5Avatar from "../assets/avatars/f5.svg";


export const teamHierarchy: TeamMember = {
  id: "ceo",
  name: "Nouman",
  role: "CEO / Founder",
  avatarType: "neutral",
  avatar: m1Avatar,
  children: [
    {
      id: "backend-team",
      name: "Backend Team",
      role: "Team Lead",
      avatarType: "neutral",
      department: "Backend",
      children: [
        {
          id: "backend-dev",
          name: "Ahmed Hassan",
          role: "Developer",
          avatarType: "male",
          avatar: m2Avatar,
        },
        {
          id: "ai-engineer",
          name: "Fatima Khan",
          role: "AI Engineer",
          avatarType: "female",
          avatar: f1Avatar,
        },
        {
          id: "devops",
          name: "Bilal Ahmed",
          role: "DevOps",
          avatarType: "male",
          avatar: m3Avatar,
        },
        {
          id: "qa",
          name: "Ayesha Ali",
          role: "QA Engineer",
          avatarType: "female",
          avatar: f2Avatar,
        },
      ],
    },
    {
      id: "frontend-team",
      name: "Frontend Team",
      role: "Team Lead",
      avatarType: "neutral",
      department: "Frontend",
      children: [
        {
          id: "react-dev",
          name: "Usman Malik",
          role: "React Developer",
          avatarType: "male",
          avatar: m4Avatar,
        },
        {
          id: "ui-engineer",
          name: "Zara Tariq",
          role: "UI Engineer",
          avatarType: "female",
          avatar: f5Avatar,
        },
        {
          id: "mobile-dev",
          name: "Ali Raza",
          role: "Mobile Developer",
          avatarType: "male",
          avatar: m2Avatar,
        },
      ],
    },
    {
      id: "design-lead",
      name: "Design Lead",
      role: "Design Lead",
      avatarType: "neutral",
      department: "Design",
      children: [
        {
          id: "ui-designer",
          name: "Sana Iqbal",
          role: "UI Designer",
          avatarType: "female",
          avatar: f4Avatar,
        },
        {
          id: "graphic-designer",
          name: "Omar Farooq",
          role: "Graphic Designer",
          avatarType: "male",
          avatar: m3Avatar,
        },
      ],
    },
    {
      id: "product",
      name: "Product Team",
      role: "Product Director",
      avatarType: "neutral",
      department: "Product",
      children: [
        {
          id: "product-manager",
          name: "Hira Imran",
          role: "Product Manager",
          avatarType: "female",
          avatar: f1Avatar,
        },
        {
          id: "project-manager",
          name: "Taha Siddiqui",
          role: "Project Manager",
          avatarType: "male",
          avatar: m4Avatar,
        },
        {
          id: "architect",
          name: "Imran Shaikh",
          role: "Architect",
          avatarType: "male",
          avatar: m5Avatar,
        },
      ],
    },
    {
      id: "marketing-lead",
      name: "Marketing Lead",
      role: "Marketing Lead",
      avatarType: "neutral",
      department: "Marketing",
      children: [
        {
          id: "content",
          name: "Mariam Shah",
          role: "Content",
          avatarType: "female",
          avatar: f2Avatar,
        },
        {
          id: "sales",
          name: "Hassan Abbas",
          role: "Sales",
          avatarType: "male",
          avatar: m3Avatar,
        },
        {
          id: "sdr",
          name: "Muhammad Awais",
          role: "SDR",
          avatarType: "male",
          avatar: m2Avatar,
        },
      ],
    },
    {
      id: "hr",
      name: "HR",
      role: "HR Manager",
      avatarType: "neutral",
      department: "HR",
      children: [
        {
          id: "hr-specialist",
          name: "Samina Javed",
          role: "HR Specialist",
          avatarType: "female",
          avatar: f3Avatar,
        },
      ],
    },
  ],
};
