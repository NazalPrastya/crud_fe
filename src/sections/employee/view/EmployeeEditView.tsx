"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  storeEmployeeSchema,
  StoreEmployeeSchema,
} from "../form/store-employee";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchableSelect from "@/components/custom/form/searchable-select";
import { useFetchPositions } from "@/services/position";
import { useDetailEmployee, useUpdateEmployee } from "@/services/employee";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { use, useEffect } from "react";
import PerformanceTable from "../performance-table";
import PerformanceFormCreate from "../performance-form-create";

export default function EmployeeEditView({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const form = useForm<StoreEmployeeSchema>({
    resolver: zodResolver(storeEmployeeSchema),
  });
  const {
    data: dataEmployee,
    isLoading,
    error,
    refetch,
  } = useDetailEmployee({ id });
  useEffect(() => {
    if (dataEmployee) {
      const formatDate = (dateString: string | undefined) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().split("T")[0];
      };
      form.reset({
        name: dataEmployee.data?.data?.name,
        email: dataEmployee.data?.data?.email,
        dateBirth: formatDate(dataEmployee?.data?.data?.dateBirth),
        positionId: String(dataEmployee?.data?.data?.positionId),
        dateJoin: formatDate(dataEmployee?.data?.data?.dateJoin),
        status: dataEmployee?.data?.data?.status,
      });
    }
  }, [dataEmployee, form]);

  const { data: dataPositions } = useFetchPositions();
  const { mutate: updateEmployee, isPending: updateEmployeeIsLoading } =
    useUpdateEmployee({
      id: id,
      onSuccess: () => {
        refetch();
        toast.success("Employee updated Successfully");
      },
      onError: (error: unknown) => {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unknown error occurred");
        }
      },
    });

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    toast.error("Something when wrong, when open detail employee");
    router.push("/dashboard/employee");
  }

  const positionOptions =
    dataPositions?.data?.data?.map((position: Record<string, unknown>) => ({
      value: String(position.id),
      label: position.name,
    })) || [];

  const handleSubmit = (values: StoreEmployeeSchema) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "image") {
        formData.append(key, value[0]);
      } else {
        formData.append(key, String(value));
      }
    });

    updateEmployee(formData);
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className="text-3xl font-bold mb-3">Update Employee</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-x-2">
            <div className="w-full md:w-1/3 flex justify-center items-center">
              <Avatar className="w-full h-full content-center">
                <AvatarImage src={dataEmployee?.data?.data?.image} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="w-full md:w-2/3">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name*</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John Doe"
                              type="name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email*</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="name@example.com"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={"dateBirth"}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Input placeholder="" type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <SearchableSelect
                      form={form}
                      name="positionId"
                      label="Position *"
                      placeholder="Select Position"
                      options={positionOptions}
                    />
                    <FormField
                      control={form.control}
                      name={"dateJoin"}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date Join</FormLabel>
                          <FormControl>
                            <Input placeholder="" type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status*</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              value={field.value}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="inactive">
                                  Invactive
                                </SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="image"
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    render={({ field: { onChange, value, ...rest } }) => (
                      <FormItem>
                        <FormLabel>Profile Picture*</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              onChange(e.target.files);
                            }}
                            {...rest}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={updateEmployeeIsLoading}>
                    SUBMIT
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>
            <h1 className="text-3xl font-bold ">Performance</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-3">
            <PerformanceFormCreate
              onSuccess={() => refetch()}
              employeeId={id}
            />
          </div>
          <PerformanceTable
            performanceData={dataEmployee?.data.data.performances}
            onSuccess={() => refetch()}
          />
        </CardContent>
      </Card>
    </div>
  );
}
