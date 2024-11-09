// StepTwoForm.tsx

'use client'

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useOnboardingContext } from '../providers/onboarding-provider';


// Define Zod schema for step two
const StepTwoSchema = z.object({
  canvasUrl: z.string().min(1, 'URL is required').superRefine((url) => {

    url.replaceAll("/", "")
    return url
  }),
  canvasKey: z.string().min(1, 'Key is required'),
});

type StepTwoData = z.infer<typeof StepTwoSchema>;

export default function StepTwoForm() {
  const { setStep, formData, setFormData } = useOnboardingContext();

  const form = useForm<StepTwoData>({
    resolver: zodResolver(StepTwoSchema),
    defaultValues: formData,
  });

  const onSubmit = (data: StepTwoData) => {
    const finalData = { ...formData, ...data };
    console.log('Form submitted:', finalData);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let url = e.target.value;
    url = url.trim();
    url = url.replace("https://", "");
    url = url.substring(0, url.indexOf("/"))
    console.log(url);
    form.setValue('canvasUrl', url);
  }

  const handleBack = () => {
    setFormData({ ...formData, ...form.getValues() });
    setStep(1);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between h-full">
        <div className="space-y-4">

          <FormField
            control={form.control}
            name="canvasUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Canvas URL</FormLabel>
                <FormControl>
                  <Input type="text" {...field} onChange={(e) => handleUrlChange(e)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="canvasKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Canvas Key</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between my-auto">
          <Button variant="outline" type="button" onClick={handleBack}>
            Back
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
