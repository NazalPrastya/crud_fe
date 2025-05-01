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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axios";
import {
  updatePositionSchema,
  UpdatePositionSchema,
} from "./form/update-position";

interface PositionFormUpdateProps {
  initialValues: UpdatePositionSchema;
  onSuccess?: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PositionFormEdit({
  initialValues,
  onSuccess,
  open,
  onOpenChange,
}: PositionFormUpdateProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<UpdatePositionSchema>({
    resolver: zodResolver(updatePositionSchema),
  });

  useEffect(() => {
    if (initialValues) {
      form.reset({
        id: initialValues.id,
        name: initialValues.name,
        level: initialValues.level,
        desc: initialValues.desc,
      });
    }
  }, [initialValues, form]);

  const handleSubmit = async (values: UpdatePositionSchema) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.put(
        `/v1/position/${values.id}`,
        values
      );
      if (data.status === "OK") {
        toast.success(data.message);
        form.reset();
        onOpenChange(false);
        onSuccess?.();
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Something went wrong while submitting.");
    } finally {
      setLoading(false);
    }
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position Name*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Frontend Developer"
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
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position Level (optional)</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="senior">Senior</SelectItem>
                          <SelectItem value="mid">Mid</SelectItem>
                          <SelectItem value="junior">Junior</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="desc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position Description*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type description here."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="border-t pt-2">
              <Button type="submit" disabled={loading}>
                SUBMIT
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
