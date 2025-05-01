"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { toast } from "sonner";
import {
  updatePerformanceSchema,
  UpdatePerformanceSchema,
} from "./form/update-performance";
import { useUpdatePerformance } from "@/services/performance/useUpdatePerformance";

interface PerformanceFormUpdateProps {
  initialValues: UpdatePerformanceSchema;
  onSuccess?: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PerformanceFormEdit({
  initialValues,
  onSuccess,
  open,
  onOpenChange,
}: PerformanceFormUpdateProps) {
  const form = useForm<UpdatePerformanceSchema>({
    resolver: zodResolver(updatePerformanceSchema),
  });

  useEffect(() => {
    if (initialValues) {
      form.reset({
        id: initialValues.id,
        employeeId: initialValues.employeeId,
        score: initialValues.score,
        notes: initialValues.notes,
        reviewer: initialValues.reviewer,
      });
    }
  }, [initialValues, form]);

  const { mutate: updatePerformance, isPending: updatePerformancePending } =
    useUpdatePerformance({
      id: initialValues.id,
      onSuccess: () => {
        toast.success("Performance updated successfully");
        form.reset();
        onOpenChange(false);
        onSuccess?.();
      },
      onError: (error: unknown) => {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unknown error occurred");
        }
      },
    });
  const handleSubmit = async (values: UpdatePerformanceSchema) => {
    updatePerformance({
      ...values,
      employeeId: initialValues.employeeId,
    });
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="default">Update Position</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] max-h-[600px] overflow-y-auto flex flex-col">
        <DialogHeader className="sticky top-0 z-10  py-4 ">
          <DialogTitle>Update Position</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="overflow-y-auto flex-1 flex-col space-y-2 py-4">
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes*</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Type notes here." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="score"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Score*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Frontend Developer"
                        type="number"
                        min={1}
                        max={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reviewer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reviewer*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Jhon dee"
                        type="text"
                        min={1}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="border-t pt-2">
              <Button type="submit" disabled={updatePerformancePending}>
                SUBMIT
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
