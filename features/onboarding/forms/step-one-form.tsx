'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useOnboardingContext } from '../providers/onboarding-provider'

const StepOneSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
})

type StepOneData = z.infer<typeof StepOneSchema>

export default function StepOneForm() {
  const { setStep, formData, setFormData } = useOnboardingContext()

  const form = useForm<StepOneData>({
    resolver: zodResolver(StepOneSchema),
    defaultValues: formData || {
      firstName: '',
      lastName: '',
    },
  })

  const onSubmit = (data: StepOneData) => {
    setFormData((prev: any) => ({ ...prev, ...data }))
    setStep(2)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-between h-full"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="my-auto">
          <Button className="px-5" type="submit">
            Next
          </Button>
        </div>
      </form>
    </Form>
  )
}
