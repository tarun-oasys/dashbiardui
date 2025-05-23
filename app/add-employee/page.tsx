"use client"
import React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/en";

import { Button } from "../../src/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../src/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../src/components/ui/form"
import { Input } from "../../src/components/ui/input"
import { Textarea } from "../../src/components/ui/textarea"
import { Calendar } from "../../src/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../../src/components/ui/popover"
import { cn, users } from "../../src/lib/utils"
import { toast } from "sonner"

const formSchema = z.object({
  employeeName: z.string().min(2, {
    message: "Employee name must be at least 2 characters.",
  }),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  notes: z.string().optional(),
});


export default function AddEmployeePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeName: "",
      notes: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // Format dates to YYYY-MM-DD
      const formattedValues = {
        userName: values.employeeName,
        startDate: values.startDate ? format(values.startDate, "yyyy-MM-dd") : "",
        endDate: values.endDate ? format(values.endDate, "yyyy-MM-dd") : "",
        notes: values.notes ?? "", // Ensure notes is always a string
      };

      // In a real app, you would replace this with your actual API endpoint
      // const response = await fetch("/api/employees", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formattedValues),
      // })
      const queryParams = new URLSearchParams(formattedValues).toString();

    //   if (!response.ok) {
    //     throw new Error("Failed to submit employee data")
    //   }

      toast("Employee data has been submitted successfully.")

      // Redirect to dashboard
      router.push(`/dashboard?${queryParams}`);
    } catch (error) {
      console.error("Error submitting form:", error)
      toast("There was a problem submitting the form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <Card className="w-full max-w-lg animate-fade-in">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Performance Entry Form</CardTitle>
          <CardDescription>Enter employee details to get performance record</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
            <FormField
  control={form?.control}
  name="employeeName"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Employee Username</FormLabel>
      <FormControl>
        <Select  onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Select an employee" />
          </SelectTrigger>
          <SelectContent>
            {users.map((user, idx) => (
              <SelectItem key={idx} value={user?.Assginee}>
                {user?.Assginee}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      <FormDescription>Enter the full name or email of the employee.</FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>

              
<div className="grid grid-cols-1 gap-6 md:grid-cols-2">

<FormField
  control={form.control}
  name="startDate"
  render={({ field }) => (
    <FormItem className="flex flex-col">
      <FormLabel>Start Date</FormLabel>
      <FormControl>
        <DatePicker
          className="w-full"
          value={field.value ? dayjs(field.value) : null}
          onChange={(date) => field.onChange(date ? date.toDate() : null)}
          format="YYYY-MM-DD"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

{/* End Date Field */}
<FormField
  control={form.control}
  name="endDate"
  render={({ field }) => (
    <FormItem className="flex flex-col">
      <FormLabel>End Date</FormLabel>
      <FormControl>
        <DatePicker
          className="w-full"
          value={field.value ? dayjs(field.value) : null}
          onChange={(date) => field.onChange(date ? date.toDate() : null)}
          format="YYYY-MM-DD"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
</div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Additional information about the employee..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full mt-5" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}

