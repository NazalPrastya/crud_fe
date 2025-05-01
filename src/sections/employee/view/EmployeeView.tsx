"use client";

import { useState } from "react";
import { Users, ChartNoAxesCombined } from "lucide-react";
import CardTotal from "@/components/custom/stats/card-total";
import { Employee } from "../employee-type";
import EmployeeTable from "../employee-table";
import EmployeeForm from "../employee-form-create";

const tasks: Employee[] = [
  {
    id: "TASK-8782",
    name: "Create new landing page",
    email: "nar3S@example.com",
    position: "tess",
    level: "Junior",
    dateJoin: new Date("2023-05-04"),
  },
  {
    id: "TASK-8722",
    name: "Create new landing page",
    email: "nar3S@example.com",
    position: "tess",
    level: "Mid",
    dateJoin: new Date("2023-05-04"),
  },
  {
    id: "TASK-8721",
    name: "Create new landing page",
    email: "nar3S@example.com",
    position: "tess",
    level: "Senior",

    dateJoin: new Date("2023-05-04"),
  },
  {
    id: "TASK-8741",
    name: "Create new landing page",
    email: "nar3S@example.com",
    position: "tess",
    level: "Mid",

    dateJoin: new Date("2023-05-04"),
  },
  {
    id: "TASK-8751",
    name: "Create new landing page",
    email: "nar3S@example.com",
    position: "tess",
    level: "Junior",

    dateJoin: new Date("2023-05-04"),
  },
  {
    id: "TASK-8712",
    name: "Create new landing page",
    email: "nar3S@example.com",
    position: "tess",
    level: "Mid",

    dateJoin: new Date("2023-05-04"),
  },
  {
    id: "TASK-8712",
    name: "Create new landing page",
    email: "nar3S@example.com",
    position: "tess",
    level: "Mid",
    dateJoin: new Date("2023-05-04"),
  },
  {
    id: "TASK-8712",
    name: "Create new landing page",
    email: "nar3S@example.com",
    position: "tess",
    level: "Junior",
    dateJoin: new Date("2023-05-04"),
  },
  {
    id: "TASK-8712",
    name: "Create new landing page",
    email: "nar3S@example.com",
    position: "tess",
    level: "Senior",
    dateJoin: new Date("2023-05-04"),
  },
  {
    id: "TASK-8712",
    name: "Create new landing page",
    email: "nar3S@example.com",
    position: "tess",
    level: "Senior",

    dateJoin: new Date("2023-05-04"),
  },
  {
    id: "TASK-8712",
    name: "Create new landing page",
    email: "nar3S@example.com",
    position: "tess",
    level: "Junior",
    dateJoin: new Date("2023-05-04"),
  },
];

export default function EmployeeView() {
  const [data] = useState<Employee[]>(tasks);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-3">Employees</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CardTotal
          title="Total Employee"
          amount="300"
          percentageChange={20.1}
          icon={Users}
        />
        <CardTotal
          title="Overall Score"
          amount="1,234"
          percentageChange={12.5}
          icon={ChartNoAxesCombined}
        />
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-end gap-x-3 mb-4">
          <EmployeeForm />
        </div>
        <EmployeeTable data={data} />
      </div>
    </div>
  );
}
