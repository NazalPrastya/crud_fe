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
import { useCreateEmployee } from "@/services/employee";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function EmployeeCreateView() {
  const router = useRouter();
  const form = useForm<StoreEmployeeSchema>({
    resolver: zodResolver(storeEmployeeSchema),
  });
  const { data, isLoading, error } = useFetchPositions();
  const { mutate: createEmployee, isPending: createEmployeeIsLoading } =
    useCreateEmployee({
      onSuccess: () => {
        toast.success("Employee Created Successfully");
        router.push("/dashboard");
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
  if (error) return <div>Error loading positions</div>;

  const positionOptions =
    data?.data?.data?.map((position: Record<string, unknown>) => ({
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

    createEmployee(formData);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-3">Create Employee</h1>

      <div className="mt-5">
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
                      <Input placeholder="John Doe" type="name" {...field} />
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
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inactive">Invactive</SelectItem>
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
            <Button type="submit" disabled={createEmployeeIsLoading}>
              SUBMIT
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
